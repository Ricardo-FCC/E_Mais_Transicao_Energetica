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
      <body className={${geistSans.variable}  antialiased h-screen overflow-hidden}>
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

    "src/components/Sidebar.tsx": """import { Map, Activity, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <div className="w-20 border-r border-border/40 bg-card flex flex-col items-center py-4 gap-8 z-20">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <Map className="text-white w-6 h-6" />
      </div>
      
      <nav className="flex flex-col gap-4 flex-1 mt-4">
        <Button variant={activeTab === "map" ? "secondary" : "ghost"} size="icon" onClick={() => setActiveTab("map")} className="rounded-xl w-12 h-12">
          <Map className="w-5 h-5" />
        </Button>
        <Button variant={activeTab === "simulator" ? "secondary" : "ghost"} size="icon" onClick={() => setActiveTab("simulator")} className="rounded-xl w-12 h-12">
          <Activity className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl w-12 h-12 text-muted-foreground">
          <BarChart3 className="w-5 h-5" />
        </Button>
      </nav>

      <div className="mt-auto">
        <Button variant="ghost" size="icon" className="rounded-xl w-12 h-12 text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}""",

    "src/components/IpnMap.tsx": """"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

const MOCK_DATA = [
  { id: 1, name: "Parnaíba (PI)", coords: [-2.9045, -41.7766], ipn: 88, desc: "Alto potencial solar/eólico. Risco climático moderado." },
  { id: 2, name: "Pecém (CE)", coords: [-3.5516, -38.8091], ipn: 94, desc: "Hub de H2 Verde. Excelente logística portuária." },
  { id: 3, name: "Suape (PE)", coords: [-8.3964, -34.9625], ipn: 82, desc: "Polo industrial denso. Alta demanda energética." },
  { id: 4, name: "Camaçari (BA)", coords: [-12.6975, -38.3242], ipn: 79, desc: "Forte base química. Necessidade de descarbonização urgente." },
  { id: 5, name: "Goiânia (GO)", coords: [-16.6869, -49.2648], ipn: 74, desc: "Potencial de biometano agroindustrial." }
]

function getColor(ipn: number) {
  if (ipn > 90) return "#10b981"
  if (ipn > 80) return "#06b6d4"
  if (ipn > 70) return "#f59e0b"
  return "#ef4444"
}

export function IpnMap() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="w-full h-full bg-muted flex items-center justify-center">Carregando Mapa...</div>

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer center={[-10.0, -45.0] as any} zoom={5} className="w-full h-full bg-[#0a0a0a]" zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CartoDB' />
        {MOCK_DATA.map((loc) => (
          <CircleMarker key={loc.id} center={loc.coords as [number, number]} radius={loc.ipn / 4} pathOptions={{ color: getColor(loc.ipn), fillColor: getColor(loc.ipn), fillOpacity: 0.6, weight: 2 }}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px] text-foreground">
                <h3 className="font-bold text-lg mb-1 text-white">{loc.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold" style={{ color: getColor(loc.ipn) }}>{loc.ipn}</span>
                  <span className="text-sm text-gray-400">Score IPN</span>
                </div>
                <p className="text-sm text-gray-300">{loc.desc}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      <div className="absolute bottom-6 left-6 z-[400] bg-background/90 p-4 rounded-xl border border-border/50 backdrop-blur-md shadow-xl">
        <h4 className="text-sm font-semibold mb-3">IPN - Prontidão (0-100)</h4>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /> 90+ (Excelente)</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-500" /> 80-89 (Alto)</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /> 70-79 (Médio)</div>
        </div>
      </div>
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
          <div key={i} className={lex }>
            <div className={max-w-[85%] rounded-2xl p-3 text-sm }>
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
}""",

    "src/components/SimulatorPanel.tsx": """"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export function SimulatorPanel() {
  const [investment, setInvestment] = useState([50])
  const [horizon, setHorizon] = useState("2035")
  const [tech, setTech] = useState("h2v")

  const generateData = () => {
    const base = investment[0] * (tech === "h2v" ? 2 : 1.5)
    return [
      { year: "2025", emissions: 100, avoided: 0 },
      { year: "2028", emissions: 100 - base * 0.2, avoided: base * 0.2 },
      { year: "2030", emissions: 100 - base * 0.4, avoided: base * 0.4 },
      { year: "2035", emissions: 100 - base * 0.8, avoided: base * 0.8 },
      { year: "2040", emissions: 100 - base * 1.2, avoided: base * 1.2 },
    ]
  }

  const data = generateData()
  const totalAvoided = (data[data.length - 1].avoided * 10).toFixed(1)

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-background">
      <div className="grid grid-cols-3 gap-6">
        
        <Card className="col-span-1 border-border/50 bg-card/40 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">Parâmetros de Cenário</CardTitle>
            <CardDescription>Ajuste as variáveis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Tecnologia Foco</label>
              <Select value={tech} onValueChange={setTech}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h2v">Hidrogênio Verde (H2V)</SelectItem>
                  <SelectItem value="bio">Biometano</SelectItem>
                  <SelectItem value="solar">Solar Centralizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Investimento</label>
                <span className="text-sm text-emerald-400 font-bold">R$ {investment[0]} Bi</span>
              </div>
              <Slider 
                value={investment} 
                onValueChange={setInvestment} 
                max={200} 
                step={5} 
                className="my-4"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Horizonte Temporal</label>
              <Select value={horizon} onValueChange={setHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2030">Até 2030</SelectItem>
                  <SelectItem value="2035">Até 2035</SelectItem>
                  <SelectItem value="2040">Até 2040</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">CO₂ Evitado</p>
                <div className="text-4xl font-bold text-emerald-400">{totalAvoided} <span className="text-lg text-emerald-500/70">Mt</span></div>
              </CardContent>
            </Card>
            <Card className="border-cyan-500/30 bg-cyan-500/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Custo Médio</p>
                <div className="text-4xl font-bold text-cyan-400">R$ 42 <span className="text-lg text-cyan-500/70">/ tCO₂</span></div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/40 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Curva de Emissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorAvoided" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="year" stroke="#888" />
                    <YAxis stroke="#888" />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#171717', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#e5e5e5' }}
                    />
                    <Area type="monotone" dataKey="avoided" name="Emissão Evitada" stroke="#10b981" fillOpacity={1} fill="url(#colorAvoided)" />
                    <Line type="monotone" dataKey="emissions" name="Emissões Residuais" stroke="#06b6d4" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
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

with open("src/app/globals.css", "a", encoding="utf-8") as f:
    f.write("\n\n/* Leaflet Dark Mode Adjustments */\n")
    f.write(".custom-popup .leaflet-popup-content-wrapper { background: #171717; color: white; border: 1px solid #333; }\n")
    f.write(".custom-popup .leaflet-popup-tip { background: #171717; }\n")
    f.write(".leaflet-container { background: #0a0a0a !important; }\n")

print("Files written successfully")
