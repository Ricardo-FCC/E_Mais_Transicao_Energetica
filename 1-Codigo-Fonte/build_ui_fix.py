import os

files = {
    "src/app/layout.tsx": """import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PID · Nexus",
  description: "Solução Completa para Descarbonização Brasileira",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}""",

    "src/app/page.tsx": """"use client"
import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { IpnMap } from "@/components/IpnMap"
import { CopilotChat } from "@/components/CopilotChat"
import { SimulatorPanel } from "@/components/SimulatorPanel"

export default function Home() {
  const [activeTab, setActiveTab] = useState("map")

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-border/40 flex items-center px-6 bg-background/95 backdrop-blur z-10">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {activeTab === "map" ? "Inteligência Territorial (IPN)" : "Simulador Prospectivo (Nexus Sim)"}
          </h1>
        </header>
        
        <div className="flex-1 relative overflow-hidden">
          {activeTab === "map" ? <IpnMap /> : <SimulatorPanel />}
        </div>
      </main>

      <aside className="w-[400px] border-l border-border/40 bg-card/50 flex flex-col z-20">
        <CopilotChat />
      </aside>
    </div>
  )
}""",

    "src/components/CopilotChat.tsx": """"use client"
import { useState } from "react"
import { Send, Bot, Sparkles, Zap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = { role: "user" | "bot"; text: string | any }

export function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Olá! Sou o Nexus Copiloto. Posso ajudar você a encontrar os melhores locais para investimento verde ou analisar riscos climáticos. O que deseja saber?" }
  ])

  const preProgrammedPrompts = [
    {
      label: "Onde investir em H2 Verde?",
      reply: (
        <div className="space-y-2">
          <p>Baseado no IPN atualizado, aqui estão os 3 melhores pólos para Hidrogênio Verde no Nordeste:</p>
          <ol className="list-decimal pl-4 space-y-1 mt-2">
            <li><strong className="text-emerald-400">Pecém (CE)</strong> - IPN 94. Logística portuária ideal e ZPE.</li>
            <li><strong className="text-cyan-400">Parnaíba (PI)</strong> - IPN 88. Maior potencial eólico offshore projetado.</li>
            <li><strong className="text-amber-400">Suape (PE)</strong> - IPN 82. Alta demanda interna para amônia verde.</li>
          </ol>
          <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-xs text-emerald-200">
            <MapPin className="inline w-3 h-3 mr-1" /> Explore Pecém no mapa para mais detalhes.
          </div>
        </div>
      )
    },
    {
      label: "Riscos climáticos no Sul?",
      reply: "Nossas simulações indicam que a região Sul apresenta um aumento de 40% no risco de eventos extremos de precipitação até 2035. Sugerimos focar investimentos em infraestrutura resiliente."
    }
  ]

  const handlePromptClick = (prompt: any) => {
    setMessages(prev => [...prev, { role: "user", text: prompt.label }])
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: prompt.reply }])
    }, 800)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="h-16 border-b border-border/40 flex items-center px-4 gap-3 bg-muted/20">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <Bot className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">Nexus Copiloto</h2>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Online e pronto</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted/50 border border-border/50 rounded-tl-sm text-foreground"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/10 border-t border-border/40">
        <div className="flex flex-wrap gap-2 mb-3">
          {preProgrammedPrompts.map((p, i) => (
            <button key={i} onClick={() => handlePromptClick(p)} className="text-xs bg-card border border-border/50 hover:bg-muted px-2 py-1.5 rounded-md transition-colors flex items-center gap-1 text-left">
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" /> {p.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Input placeholder="Pergunte ao Nexus..." className="pr-10 bg-card" disabled />
          <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-7 w-7 text-muted-foreground" disabled>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}"""
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files rewritten successfully without interpolation issues")
