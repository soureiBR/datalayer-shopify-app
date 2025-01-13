// app/routes/_index.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import styles from "./styles.module.css"; // Asegúrate de tener este archivo o ajusta según tu setup

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Si existe el parámetro "shop", redirige a /app con esos mismos query params
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  // Retorna un flag showForm en función de si existe "login" o no
  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className={`${styles.index} min-h-screen bg-gray-50 flex flex-col`}>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo: ajusta la ruta de tu imagen o reemplaza por texto */}
          <div className="flex items-center space-x-2">
            <img
              src="/path-to-your-logo.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-700">TuAppName</span>
          </div>
          {/* Redes sociales (Opcional) */}
          <nav className="flex items-center space-x-4">
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              LinkedIn
            </a>
            <a
              href="mailto:your_email@example.com"
              className="text-gray-600 hover:text-gray-900"
            >
              Email
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              ¡Bienvenidos, Desarrolladores!
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 mb-6">
              Soy <strong className="font-semibold">Aaron Kaizen</strong>, un
              desarrollador de software apasionado por crear soluciones intuitivas y
              eficientes.  
              <br />
              Este Template de Shopify App con Remix está optimizado para Vercel y
              utiliza Tailwind CSS.
            </p>

            {/* Formulario de inicio de sesión, condicionado a showForm */}
            {showForm && (
              <Form method="post" action="/auth/login" className="max-w-md mx-auto">
                <label className="block mb-4 text-left">
                  <span className="text-gray-700 font-medium">Dominio de la tienda</span>
                  <input
                    type="text"
                    name="shop"
                    placeholder="ej: mi-tienda.myshopify.com"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            <div className="mt-8">
              <a
                href="https://github.com/yourgithub/tu-repo" // Reemplaza con tu repo
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
              >
                Ver en GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Sección de características */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Características Principales
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Optimizada para Vercel:</strong> despliegue fluido con
                configuración a medida.
              </li>
              <li>
                <strong>Tailwind CSS integrado:</strong> estiliza tu app de forma
                rápida y eficiente.
              </li>
              <li>
                <strong>Shopify Integration:</strong> incluye Polaris, AppBridge y
                Webhooks para funcionalidades avanzadas.
              </li>
            </ul>
          </div>
        </section>

        {/* Sección de Instrucciones */}
        <section className="bg-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Instrucciones de Instalación
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Sigue estos pasos para configurar y desplegar tu app de Shopify:
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>1. Fork del Repositorio:</strong> Haz un fork del repo a tu
                  cuenta de GitHub.
                </li>
                <li>
                  <strong>2. Actualiza Configuración:</strong> Modifica
                  <code className="bg-gray-200 text-sm px-1 rounded mx-1">
                    shopify.app.toml
                  </code>{" "}
                  y
                  <code className="bg-gray-200 text-sm px-1 rounded mx-1">
                    package.json
                  </code>
                  con tu información (name, handle, URLs, client_id).
                </li>
                <li>
                  <strong>3. Crea un archivo .env:</strong> Incluye tus claves
                  (SHOPIFY_API_KEY, SECRET, SCOPES, DATABASE_URL, etc.).
                </li>
                <li>
                  <strong>4. Instala Dependencias:</strong>{" "}
                  <code className="bg-gray-200 text-sm px-1 rounded">npm install</code>
                </li>
                <li>
                  <strong>5. Genera y Migra Prisma:</strong>{" "}
                  <code className="bg-gray-200 text-sm px-1 rounded">
                    npx prisma generate
                  </code>{" "}
                  y{" "}
                  <code className="bg-gray-200 text-sm px-1 rounded">
                    npx prisma migrate deploy
                  </code>
                </li>
                <li>
                  <strong>6. Despliega en Vercel:</strong> Crea un nuevo proyecto,
                  configura las variables de entorno y haz el primer deploy.
                </li>
                <li>
                  <strong>7. Commit &amp; Push:</strong> Mantén tus cambios en Git
                  usando <code className="bg-gray-200 text-sm px-1 rounded">git</code>.
                </li>
                <li>
                  <strong>8. Deploy a Shopify:</strong>{" "}
                  <code className="bg-gray-200 text-sm px-1 rounded">
                    shopify app deploy
                  </code>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      {/* Footer/Contacto */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} -{" "}
            <span className="font-semibold">Aaron Kaizen</span>. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:your_email@example.com"
              className="text-gray-300 hover:text-white text-sm"
            >
              Email
            </a>
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
