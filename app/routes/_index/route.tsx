// app/routes/_index.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";

// Si tu "login" está en otra ubicación, ajusta la ruta
import { login } from "../../shopify.server";

// Loader: si query param "shop" existe, redirige; si no, define showForm
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return { showForm: Boolean(login) };
};

export default function IndexPage() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col">
      {/*
        ===========================
        HERO / HEADER SECTION
      ===========================
      */}
      <header className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Shopify App Template - Remix
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-600">
            Esta plantilla facilita la creación de apps de Shopify usando Remix,
            Tailwind y un despliegue óptimo en Vercel. Simplifica y acelera
            radicalmente el desarrollo de tu aplicación, especialmente cuando la
            documentación oficial no cubre los casos de Vercel.
          </p>
        </div>
      </header>

      {/*
        ===========================
        LOGIN FORM (CONDITIONAL)
      ===========================
      */}
      {showForm && (
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-md rounded-md border border-gray-200 p-4">
            <Form method="post" action="/auth/login">
              <label className="mb-4 block text-left">
                <span className="mb-1 block font-medium text-gray-700">
                  Dominio de la tienda
                </span>
                <input
                  type="text"
                  name="shop"
                  placeholder="ej: mi-tienda.myshopify.com"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded bg-blue-600 py-2 px-4 font-semibold text-white hover:bg-blue-700"
              >
                Iniciar Sesión
              </button>
            </Form>
          </div>
        </div>
      )}

      {/*
        ===========================
        MAIN CONTENT: INSTRUCTIONS
      ===========================
      */}
      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Installation Instructions
          </h2>
          <p className="mb-4 text-gray-700">
            Sigue estos pasos para configurar y desplegar tu app de Shopify:
          </p>

          <ol className="mb-10 list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Fork the Repository:</strong> Haz un fork de este
              repositorio en tu cuenta de GitHub.
            </li>
            <li>
              <strong>Update Configuration Files:</strong> Modifica
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                shopify.app.toml
              </code>
              y
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                package.json
              </code>
              con tu información (name, handle, URLs, client_id).
            </li>
            <li>
              <strong>Create a .env File:</strong> Incluye tus claves
              (SHOPIFY_API_KEY, SECRET, SCOPES, DATABASE_URL, etc.).
            </li>
            <li>
              <strong>Install Dependencies:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npm install
              </code>
            </li>
            <li>
              <strong>Generate and Migrate Prisma:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npx prisma generate
              </code>{" "}
              y{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npx prisma migrate deploy
              </code>
            </li>
            <li>
              <strong>Deploy to Vercel:</strong> Crea un nuevo proyecto, configura
              las variables de entorno y haz el primer deploy.
            </li>
            <li>
              <strong>Commit Your Changes:</strong> Mantén tu repositorio
              actualizado usando
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git add .
              </code>
              ,
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git commit -m ...
              </code>
              y
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git push origin main
              </code>
              .
            </li>
            <li>
              <strong>Deploy to Shopify:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                shopify app deploy
              </code>
              . Tu app estará lista para instalarse y usarse.
            </li>
          </ol>

          {/* Features */}
          <h3 className="mb-4 text-xl font-bold text-gray-800">Features</h3>
          <ul className="mb-8 list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Optimized for Vercel:</strong> despliegue sin fricción con
              configuraciones personalizadas para Vercel.
            </li>
            <li>
              <strong>Built-in Tailwind CSS:</strong> estilo rápido y eficiente de tu
              app usando Tailwind.
            </li>
            <li>
              <strong>Shopify Integration:</strong> incluye Polaris, AppBridge y
              Webhooks para mayor funcionalidad.
            </li>
          </ul>

          {/* Need Help? */}
          <h3 className="mb-2 text-xl font-bold text-gray-800">Need Help?</h3>
          <p className="mb-4 text-gray-700">
            Si necesitas ayuda o personalización, no dudes en contactar:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:your_email@example.com"
                className="text-blue-600 hover:underline"
              >
                your_email@example.com
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/yourgithub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/yourgithub
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://linkedin.com/in/yourlinkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/yourlinkedin
              </a>
            </li>
          </ul>
          <p className="mt-8 text-gray-600">
            Este template se desarrolló para reducir tiempos y complejidad al
            desplegar apps de Shopify en Vercel, una tarea que anteriormente
            implicaba mucha documentación dispersa y procesos largos.
          </p>
        </div>
      </main>

      {/*
        ===========================
        FOOTER
      ===========================
      */}
      <footer className="bg-gray-900 py-6 text-gray-300">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-2 text-sm md:mb-0">
            © {new Date().getFullYear()} -{" "}
            <span className="font-semibold">Aaron Kaizen</span>. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:your_email@example.com"
              className="text-sm text-gray-300 hover:text-white"
            >
              Email
            </a>
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
