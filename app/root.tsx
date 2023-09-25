import type { LinksFunction } from "@remix-run/node";

import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import styles from "~/tailwind.css";

export const links: LinksFunction = () => [
  { as: "style", href: styles, rel: "preload" },
  { href: styles, rel: "stylesheet" },
  ...(cssBundleHref ? [{ href: cssBundleHref, rel: "stylesheet" }] : [])
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col gap-4 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 p-4">
        <header className="rounded-md bg-[#f5f5f5] p-4 shadow-md">
          <h1 className="w-auto fill-current text-center text-3xl font-bold">
            ⏲️ Countdowns
          </h1>
        </header>
        <main className="grow bg-transparent">
          <Outlet />
        </main>
        <footer className="rounded-md bg-black shadow-md">
          <ul className="mx-auto flex max-w-7xl items-center justify-between p-4 text-sm font-bold text-white">
            <li>
              <a
                href={`https://twitter.com/cockroachdb/`}
                rel="noreferrer"
                target="_blank"
              >
                @CockroachDB
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aydrian/crdb-remix-drizzle"
                rel="noreferrer"
                target="_blank"
              >
                {/* <Icon className="aspect-square h-7 text-white" name="github" /> */}
                GitHub
              </a>
            </li>
          </ul>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
