import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const spaceGrotesk = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PID · Nexus",
  description: "Solução Completa para Descarbonização Brasileira",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="light">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${montserrat.variable} font-sans antialiased h-screen overflow-hidden bg-white text-[#01213F]`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
