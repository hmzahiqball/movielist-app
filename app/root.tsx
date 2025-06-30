import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops! Something went wrong 😵‍💫'
  let details = 'This page didn’t load as expected. Try again or go back.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
        message = '💀 404 Not Found'
        details = "Bro... this page ghosted us. It's just not here 💅. Double check the URL maybe?"
      } else {
        message = '💥 Oopsies, something broke'
        details = error.statusText || "The server said 'nah'. Try refreshing or go cry idk 🤷‍♂️"
      }
    } else {
      message = '💻 Dev Mode Panic'
      details = 'Something wrong happened. Check the console for more info.'
      stack = error instanceof Error ? error.stack : undefined
    }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center text-center px-6 bg-black text-white">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-4 text-red-500">{message}</h1>
        <p className="text-lg text-gray-300 mb-6">{details}</p>

        {stack && (
          <div className="text-left bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-auto max-h-[300px] w-full">
            <h2 className="font-mono text-sm text-yellow-400 mb-2">Stack trace (for nerds):</h2>
            <pre className="text-sm text-gray-400 whitespace-pre-wrap">
              <code>{stack}</code>
            </pre>
          </div>
        )}

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            🏠 Take me home
          </a>
        </div>
      </div>
    </main>
  )
}