// app/routes/_index.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";

import { login } from "../../shopify.server"; // Ajusta la ruta a tu propio archivo.
import styles from "./styles.module.css"; // Elimina si no lo necesitas.

// Datos de ejemplo para las características
const featuresData = [
  {
    id: 1,
    title: "Feature One",
    paragraph: "Una descripción breve de la característica principal.",
  },
  {
    id: 2,
    title: "Feature Two",
    paragraph: "Otra descripción destacando el beneficio al usuario.",
  },
  {
    id: 3,
    title: "Feature Three",
    paragraph: "Más detalles sobre lo que hace esta tercera característica.",
  },
];

// Loader para redirigir si existe query param 'shop', y controlar si se muestra formulario.
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
    <div className={`${styles.index} relative z-10 overflow-hidden`}>
      {/*
        ===========================
        HERO SECTION
        ===========================
      */}
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Free and Open-Source Next.js Template for Startup & SaaS
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Startup is free Next.js template for startups and SaaS business
                  websites. Comes with all the essential pages, components, and
                  sections you need to launch a complete business website, built with
                  Next 13.x and Tailwind CSS.
                </p>

                {/* Form Condicional (si showForm es true) */}
                {showForm && (
                  <div className="mb-8 max-w-md mx-auto">
                    <Form
                      method="post"
                      action="/auth/login"
                      className="mt-4 rounded-md border border-gray-200 p-4"
                    >
                      <label className="mb-4 block text-left">
                        <span className="text-gray-800 font-medium">
                          Dominio de la tienda
                        </span>
                        <input
                          type="text"
                          name="shop"
                          placeholder="ej: mi-tienda.myshopify.com"
                          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </label>
                      <button
                        type="submit"
                        className="w-full rounded bg-indigo-600 py-2 px-4 font-semibold text-white hover:bg-indigo-700"
                      >
                        Iniciar Sesión
                      </button>
                    </Form>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  {/* Para enlaces externos, <Link> con target="_blank". O podrías usar <a>. */}
                  <Link
                    to="https://nextjstemplates.com/templates/startup"
                    prefetch="intent"
                    className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Now
                  </Link>
                  <Link
                    to="https://github.com/NextJSTemplates/startup-nextjs"
                    prefetch="intent"
                    className="rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agrega aquí los SVG decorativos del Hero si lo deseas */}
        <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          {/* Tus SVG de círculos, shapes, etc. */}
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          {/* Tus SVG de círculos, shapes, etc. */}
        </div>
      </section>

      {/*
        ===========================
        FEATURES SECTION
        ===========================
      */}
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container mx-auto px-4">
          {/* Título y párrafo de la sección */}
          <SectionTitle
            title="Main Features"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />

          {/* Grid con las características */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/*
        ===========================
        FOOTER
        ===========================
      */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-2 text-sm md:mb-0">
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

/* ----------------------------------------------------------------------------
   A CONTINUACIÓN, DEFINIMOS FUNCIONES INTERNAS PARA 'SectionTitle' y 'SingleFeature'
   PARA EVITAR IMPORTS EXTERNOS
----------------------------------------------------------------------------- */

/**
 * Título y descripción de la sección
 */
function SectionTitle({
  title,
  paragraph,
  center,
}: {
  title: string;
  paragraph: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
        {title}
      </h2>
      <p className="text-base text-body-color dark:text-white/80">
        {paragraph}
      </p>
    </div>
  );
}

/**
 * Muestra un 'feature' individual
 */
function SingleFeature({
  feature,
}: {
  feature: { id: number; title: string; paragraph: string };
}) {
  return (
    <div className="group rounded-lg bg-white p-6 shadow transition hover:shadow-md">
      <h4 className="mb-3 text-xl font-semibold text-gray-800">
        {feature.title}
      </h4>
      <p className="text-gray-600">{feature.paragraph}</p>
    </div>
  );
}
