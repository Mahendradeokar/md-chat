import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "~/components/ui/toaster";
import { ConvexClientProvider } from "~/providers";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AUM",
  description: "AI Assistant",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
        <body>
          <ThemeProvider
            defaultTheme="dark"
            enableSystem={false}
            attribute="class"
            storageKey="app-theme"
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
