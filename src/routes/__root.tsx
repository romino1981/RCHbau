import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RCHbau | Sadrokartón, stropy a akustika" },
      {
        name: "description",
        content:
          "RCHbau realizuje sadrokartón, kazetové a akustické stropy, tmelenie a maľovanie pre firmy aj domácnosti. Firma zo Zlatých Moraviec.",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#14181f" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "Informácie pre AI" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="sk" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
