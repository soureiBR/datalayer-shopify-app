// app/routes/_index.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import styles from "./styles.module.css"; // Mantén las importaciones necesarias

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className={styles.index}>
      {/* Sección de Hero */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Simplifica tus Envíos con Laar Courier</h2>
          <p className="text-xl mb-8">
            Crea guías de envío de manera rápida y eficiente, integradas directamente en tu plataforma.
          </p>
          {showForm && (
            <Form method="post" action="/auth/login" className="max-w-md mx-auto">
              <label className="block mb-4">
                <span className="text-gray-200">Dominio de la tienda</span>
                <input
                  type="text"
                  name="shop"
                  placeholder="ej: mi-tienda.myshopify.com"
                  className="mt-1 block w-full px-3 py-2 bg-blue-500 border border-transparent rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Iniciar Sesión
              </button>
            </Form>
          )}
        </div>
      </section>

      {/* Lista de Características */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">¿Por Qué Elegir Laar Courier?</h3>
          <ul className="max-w-2xl mx-auto space-y-4">
            <li className="flex items-center">
              <span className="text-indigo-600 text-2xl mr-4">✔️</span>
              <span className="text-lg">Integración Directa con Shopify para una gestión fluida.</span>
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 text-2xl mr-4">✔️</span>
              <span className="text-lg">Automatización de guías de envío para ahorrar tiempo.</span>
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 text-2xl mr-4">✔️</span>
              <span className="text-lg">Seguimiento en tiempo real para tus clientes.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
