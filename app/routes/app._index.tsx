// app/routes/app._index.tsx

import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  Box,
  List,
  Link,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

// Función loader vacía (puedes agregar lógica si la necesitas en el futuro)
export const loader = async () => {
  return null;
};

// Función action vacía (puedes agregar lógica si la necesitas en el futuro)
export const action = async () => {
  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Tellenzi Vs Laar Courier" />
      <Layout>
        <Layout.Section>
          <Card>
            <Card>
              <BlockStack gap="200">
                {/* Mensaje de Bienvenida Personalizado */}
                <Text as="h2" variant="headingLg">
                  ¡Bienvenido a tu aplicación personalizada!
                </Text>
                <Text variant="bodyMd" as="p">
                  Esta aplicación ha sido desarrollada por BoteroMedia con el objetivo
                  de brindarte una solución funcional, intuitiva y eficiente.
                </Text>

                {/* Sección: Sobre esta aplicación */}
                <Box padding="200">
                  <Text as="h3" variant="headingMd">
                    🛠️ Sobre esta aplicación
                  </Text>
                  <List type="bullet">
                    <List.Item>
                      <strong>Función:</strong> Esta aplicación es útil para crear las guías de
                      envío de tu transportadora Laar Courier.
                    </List.Item>
                    <List.Item>
                      <strong>Uso recomendado:</strong> Por favor, evita realizar modificaciones o
                      eliminarla sin consultarnos previamente. Esto podría afectar la
                      funcionalidad de tu plataforma.
                    </List.Item>
                  </List>
                </Box>

                {/* Sección: ¿Necesitas ayuda? */}
                <Box padding="200">
                  <Text as="h3" variant="headingMd">
                    📞 ¿Necesitas ayuda?
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Estamos aquí para apoyarte. Si tienes preguntas, necesitas soporte técnico o
                    deseas personalizar aún más tu experiencia, no dudes en contactarnos:
                  </Text>
                  <List type="bullet">
                    <List.Item>
                      <strong>📧 Correo electrónico:</strong>{" "}
                      <Link url="mailto:contacto@boteromedia.com" removeUnderline>
                        contacto@boteromedia.com
                      </Link>
                    </List.Item>
                    <List.Item>
                      <strong>🌐 Sitio web:</strong>{" "}
                      <Link
                        url="https://www.boteromedia.com"
                        target="_blank"
                        removeUnderline
                      >
                        www.boteromedia.com
                      </Link>
                    </List.Item>
                    <List.Item>
                      <strong>📱 Teléfono/WhatsApp:</strong> (+57) 301-115-2451
                    </List.Item>
                  </List>
                </Box>

                {/* Sección de Agradecimiento */}
                <Box padding="200">
                  <Text as="h3" variant="headingMd">
                    🚀 Gracias por confiar en BoteroMedia!
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Nuestro equipo está comprometido en brindarte soluciones que impulsen tu negocio al
                    siguiente nivel.
                  </Text>
                </Box>
              </BlockStack>
            </Card>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
