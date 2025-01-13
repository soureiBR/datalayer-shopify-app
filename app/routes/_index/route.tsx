// app/routes/_index.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";

// Reemplaza con tu import real si "login" está en otro lado
import { login } from "../../shopify.server";

// 1. Loader que redirige si existe "?shop" y determina si se muestra el form
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return { showForm: Boolean(login) };
};

// 2. Data de ejemplo para las características
const featuresData = [
  {
    id: 1,
    title: "Feature One",
    paragraph: "Explica brevemente una de las características más importantes.",
  },
  {
    id: 2,
    title: "Feature Two",
    paragraph: "Otra característica útil para tus usuarios.",
  },
  {
    id: 3,
    title: "Feature Three",
    paragraph: "Más detalles sobre lo que hace esta tercera característica.",
  },
];

export default function IndexPage() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-800">
      {/* ========================
          HERO SECTION
      =========================*/}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              Free & Open-Source Template
            </h1>
            <p className="mb-8 text-base sm:text-lg md:text-xl">
              Perfect for Startups and SaaS. This template comes with all the
              essential pages, components, and sections you need to build a
              complete business website, powered by Remix and Tailwind CSS.
            </p>

            {/* Form Condicional (sólo aparece si showForm === true) */}
            {showForm && (
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
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="https://nextjstemplates.com/templates/startup"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
              >
                Download Now
              </Link>
              <Link
                to="https://github.com/NextJSTemplates/startup-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-black/20 px-8 py-3 font-medium text-black hover:bg-black/30"
              >
                Star on GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Agrega aquí tus SVGs decorativos si lo deseas */}
        {/* <div className="absolute top-0 right-0 z-[-1] opacity-30"> ...SVG... </div> */}
        {/* <div className="absolute bottom-0 left-0 z-[-1] opacity-30"> ...SVG... </div> */}
      </section>

      {/* ========================
          FEATURES SECTION
      =========================*/}
      <section className="bg-gray-50 py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FeaturesTitle
            title="Main Features"
            paragraph="Check out some of the main benefits and features that will help you build your SaaS or startup website."
          />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <FeatureItem key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          FOOTER
      =========================*/}
      <footer className="bg-gray-900 py-6 text-gray-300">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-2 text-sm md:mb-0">
            © {new Date().getFullYear()} -{" "}
            <span className="font-semibold">Aaron Kaizen</span>. Todos los
            derechos reservados.
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

/* ==========================
   Sub-Componentes Internos
   ========================== */

/**
 * Título y descripción de la sección Features
 */
function FeaturesTitle({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-xl text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600">{paragraph}</p>
    </div>
  );
}

/**
 * Cada característica individual
 */
function FeatureItem({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow hover:shadow-md">
      <h4 className="mb-2 text-xl font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{paragraph}</p>
    </div>
  );
}
