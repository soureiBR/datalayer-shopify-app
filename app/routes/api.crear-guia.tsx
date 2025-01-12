// app/routes/api/crear-guia.tsx

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import crypto from "crypto";

// Definir la interfaz para el catálogo de ciudades
interface City {
  nombre: string;
  codigo: string;
  trayecto?: string;
  provincia?: string;
  codigoProvincia?: string;
  codigor?: number;
}

let cityCatalog: City[] = [];

// Caché para el token de autenticación de Laarcourier
let tokenCache = {
  token: null as string | null,
  expiration: null as number | null,
};

// ----------------------------------------------------------
// 1) Cargar el catálogo de ciudades desde la API
// ----------------------------------------------------------
async function loadCityCatalog() {
  try {
    const response = await fetch("https://api.laarcourier.com:9727/ciudades");
    if (!response.ok) {
      console.error("Error al cargar el catálogo de ciudades:", response.status);
      return;
    }
    cityCatalog = await response.json();
    console.log("Catálogo de ciudades cargado:", cityCatalog);
  } catch (error) {
    console.error("Error al cargar el catálogo de ciudades:", error);
  }
}

// Llama una vez para precargar el catálogo de ciudades
loadCityCatalog();

// ----------------------------------------------------------
// 2) Buscar el código de ciudad por nombre
// ----------------------------------------------------------
async function getCityCode(cityName: string): Promise<string | null> {
  if (cityCatalog.length === 0) {
    console.warn("El catálogo de ciudades está vacío. Intentando recargar...");
    await loadCityCatalog();
  }
  const city = cityCatalog.find(
    (c) => c.nombre.toLowerCase() === cityName.toLowerCase()
  );
  return city ? city.codigo : null;
}

// ----------------------------------------------------------
// 3) Obtener el token dinámico de Laarcourier
// ----------------------------------------------------------
interface AuthResponse {
  token: string;
  nombre: string;
  ruc: string;
  codigoUsuario: number;
  codigoSucursal: number;
}

async function getAuthToken() {
  // Reutiliza token si no ha expirado
  if (
    tokenCache.token &&
    tokenCache.expiration &&
    tokenCache.expiration > Date.now()
  ) {
    return tokenCache.token;
  }

  console.log("Obteniendo nuevo token de autenticación...");
  try {
    const response = await fetch("https://api.laarcourier.com:9727/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.LAARCOURIER_USERNAME,
        password: process.env.LAARCOURIER_PASSWORD,
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      console.error(`Error al autenticar: ${response.status} - ${responseText}`);
      throw new Error(`Error al autenticar: ${response.status}`);
    }

    const data: AuthResponse = JSON.parse(responseText);
    tokenCache.token = data.token;
    // Dado que no hay 'expires_in', establecer expiración en 1 hora
    tokenCache.expiration = Date.now() + 3600 * 1000; // 1 hora
    console.log("Token obtenido con éxito:", tokenCache.token);
    return tokenCache.token;
  } catch (error) {
    console.error("Error al obtener el token de autenticación:", error);
    throw new Error("No se pudo autenticar con la API de Laarcourier");
  }
}

// ----------------------------------------------------------
// 4) Verificar la firma (HMAC) de Shopify
// ----------------------------------------------------------
function verifyShopifyWebhook(
  secret: string,
  rawBody: string,
  hmacHeader: string | null
): boolean {
  if (!hmacHeader) {
    console.error("HMAC no encontrado en el header.");
    return false;
  }

  const calculatedHmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  console.log("HMAC recibido:", hmacHeader);
  console.log("HMAC calculado:", calculatedHmac);
  return calculatedHmac === hmacHeader;
}

// ----------------------------------------------------------
// 5) Transformar los datos de Shopify al formato de Laarcourier
// ----------------------------------------------------------
async function transformShopifyToLaarcourier(shopifyData: any) {
  const shipping = shopifyData.shipping_address;
  const customer = shopifyData.customer;

  if (!shipping || !customer) {
    console.error(
      "Faltan datos obligatorios (shipping_address o customer) en el webhook."
    );
    throw new Error("Datos incompletos en el webhook.");
  }

  const ciudadOCode = await getCityCode("Quito");
  const ciudadDCode = await getCityCode(shipping.city);

  if (!ciudadOCode) {
    console.error(`Ciudad origen inválida: Quito`);
    throw new Error("La ciudad origen no es válida.");
  }

  if (!ciudadDCode) {
    console.error(`Ciudad destino inválida: ${shipping.city}`);
    throw new Error("La ciudad destino no es válida.");
  }

  // Calculamos el peso total
  const totalWeight = shopifyData.line_items.reduce(
    (acc: number, item: any) => acc + (item.grams || 0) * (item.quantity || 1),
    0
  );
  const totalPieces = shopifyData.line_items.length;

  return {
    origen: {
      identificacion: "1791705726001",
      ciudadO: parseInt(ciudadOCode, 10), // Convertir a número
      nombreO: "Tellenzi Ecuador",
      direccion: "Av. República de El Salvador, 170135, Quito, Ecuador",
      referencia: "",
      telefono: "+573212778209",
      celular: "+573212778209",
    },
    destino: {
      identificacionD: customer.id || "Sin ID",
      ciudadD: parseInt(ciudadDCode, 10), // Convertir a número
      nombreD: `${shipping.first_name || ""} ${shipping.last_name || ""}`.trim(),
      direccion: shipping.address1 || "Sin dirección",
      referencia: shipping.address2 || "",
      telefono: shipping.phone || "Sin teléfono",
      celular: shipping.phone || "Sin celular",
    },
    tipoServicio: "2012020020091",
    noPiezas: totalPieces,
    peso: totalWeight / 1000, // Convertir de gramos a kilogramos
    contiene: shopifyData.line_items.map((item: any) => item.name).join(", "),
    valorDeclarado: parseFloat(shopifyData.total_price) || 0,
    tamanio: "Mediano",
    cod: false,
    costoflete: parseFloat(shopifyData.shipping_lines[0]?.price || "0"),
    costoproducto: parseFloat(shopifyData.total_price),
    tipocobro: 1,
    comentario: shopifyData.note || "Orden de Shopify",
    fechaPedido: shopifyData.created_at || new Date().toISOString(),
    extras: {},
  };
}

// ----------------------------------------------------------
// 6) Validar el cuerpo de la guía antes de enviarlo
// ----------------------------------------------------------
function validateGuiaBody(guiaBody: any) {
  const errors: string[] = [];

  if (!guiaBody.origen.ciudadO)
    errors.push("El campo 'ciudadO' es obligatorio.");
  if (!guiaBody.destino.ciudadD)
    errors.push("El campo 'ciudadD' es obligatorio.");
  if (!guiaBody.tipoServicio)
    errors.push("El campo 'tipoServicio' es obligatorio.");

  return errors;
}

// ----------------------------------------------------------
// 7) Definir la action para Remix (POST handler)
// ----------------------------------------------------------
export const action: ActionFunction = async ({ request }) => {
  try {
    // Shopify envía el body en texto plano (raw), así que lo leemos con .text()
    const rawBody = await request.text();

    // Encabezado con la firma Shopify
    const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SHOPIFY_WEBHOOK_SECRET no está configurado.");
      return json({ error: "Secret no disponible" }, { status: 401 });
    }

    console.log("HMAC recibido:", hmacHeader);
    console.log("Cuerpo del Webhook (rawBody):", rawBody);

    // Verificamos el HMAC
    const isValid = verifyShopifyWebhook(secret, rawBody, hmacHeader);
    if (!isValid) {
      console.error("Webhook no autorizado. HMAC inválido.");
      console.log(
        "HMAC esperado:",
        crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("base64")
      );
      return json({ error: "Webhook no autorizado" }, { status: 401 });
    }

    // Parseamos los datos de Shopify
    const shopifyData = JSON.parse(rawBody);
    console.log("Webhook recibido con datos:", JSON.stringify(shopifyData, null, 2));

    // ----------------------------------------------------------
    // Verificación: Comprobar si ya existe la guía de envío
    // ----------------------------------------------------------
    const guiaExistente = shopifyData.note_attributes?.find(
      (attr: any) => attr.name === "Guía de Envío"
    );

    if (guiaExistente) {
      console.log(`Pedido ya tiene una guía de envío: ${guiaExistente.value}`);
      return json({ message: "Pedido ya tiene una guía de envío" }, { status: 200 });
    }

    // Transformamos los datos de Shopify a la estructura requerida por Laarcourier
    const guiaBody = await transformShopifyToLaarcourier(shopifyData);
    console.log("Cuerpo de la guía transformado:", JSON.stringify(guiaBody, null, 2));

    // Validamos los campos esenciales antes de enviar
    const validationErrors = validateGuiaBody(guiaBody);
    if (validationErrors.length > 0) {
      console.error("Errores de validación:", validationErrors);
      return json(
        { error: "Errores de validación", details: validationErrors },
        { status: 400 }
      );
    }

    // Obtenemos el token de Laarcourier
    const token = await getAuthToken();
    console.log("Enviando solicitud a Laarcourier con token:", token);

    // Creamos la guía en Laarcourier
    const response = await fetch("https://api.laarcourier.com:9727/guias/contado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guiaBody),
    });

    // Procesamos la respuesta
    const responseText = await response.text();
    console.log("Respuesta de Laarcourier (raw):", responseText);

    if (!response.ok) {
      console.error(`Error HTTP de Laarcourier: ${response.status}`, responseText);
      return json(
        { error: "Error al crear la guía en Laarcourier", details: responseText },
        { status: response.status }
      );
    }

    const responseData = JSON.parse(responseText);
    console.log("Guía creada exitosamente:", responseData);

    // -----------------------------------------
    // Guardar el enlace de la guía en la orden de Shopify usando X-Shopify-Access-Token
    // -----------------------------------------
    try {
      const shopifyApiVersion = "2025-04"; // Asegúrate de que esta versión es correcta
      const updateOrderUrl = `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/${shopifyApiVersion}/orders/${shopifyData.id}.json`;
      const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

      const updateOrderResponse = await fetch(updateOrderUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAccessToken as string,
        },
        body: JSON.stringify({
          order: {
            id: shopifyData.id,
            note_attributes: [
              {
                name: "Guía de Envío",
                value: responseData.url,
              },
            ],
          },
        }),
      });

      if (!updateOrderResponse.ok) {
        console.error(
          `No se pudo actualizar el pedido en Shopify. Status: ${updateOrderResponse.status}`
        );
      } else {
        console.log("Pedido actualizado en Shopify con la URL de la guía.");
      }
    } catch (err) {
      console.error("Error al actualizar el pedido en Shopify:", err);
    }

    // Respuesta final al webhook
    return json(
      { guia: responseData.guia, urlEtiqueta: responseData.url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error interno en el procesamiento del webhook:", error);
    return json({ error: "Error interno del servidor" }, { status: 500 });
  }
};

// Handler para GET (opcional, útil para pruebas)
export const loader: LoaderFunction = async () => {
  return json({ ok: true, message: "GET /api/crear-guia funcionando" });
};
