import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { BackdropCanvas } from "@/components/BackdropCanvas";
import { I18nProvider, LanguageBar } from "@/i18n/lang";
import appCss from "../styles.css?url";

const APP_NAME = "Etkin Arşiv · Unutulmayan Görevler";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Yarım kalan Ay ve Mars görevleri: iptaller, yeniden doğan planlar ve 3D harita.",
      },
      { name: "theme-color", content: "#070b16" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <BackdropCanvas />
        <I18nProvider>
          <LanguageBar />
          <PreviewHostBridge />
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  ),
});
