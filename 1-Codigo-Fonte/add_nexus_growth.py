import os

marketplace = """"use client"
import { Leaf, TrendingUp, ArrowUpRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  { id: 1, name: "Polo Eólico Pecém I", type: "Eólico", credits: "50.000 tCO2e", price: "$12.50/t", ipn: 94, status: "Disponível" },
  { id: 2, name: "Solar Sertão Piauí", type: "Solar", credits: "25.000 tCO2e", price: "$10.80/t", ipn: 88, status: "Reservado" },
  { id: 3, name: "Biometano Araripe", type: "Biometano", credits: "12.000 tCO2e", price: "$15.00/t", ipn: 82, status: "Disponível" },
  { id: 4, name: "H2V Hub Suape", type: "H2 Verde", credits: "100.000 tCO2e", price: "$18.50/t", ipn: 96, status: "Pré-venda" },
]

export function MarketplacePanel() {
  return (
    <div className="p-6 h-full overflow-y-auto space-y-6 bg-background font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Nexus <span className="text-emerald-400">Market</span></h2>
          <p className="text-muted-foreground">Compre créditos de carbono e ativos ambientais de alta integridade.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Volume Total 24h</p>
          <p className="text-2xl font-mono text-cyan-400 font-bold">$4.2M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="bg-card/50 border-white/5 hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Leaf className="w-24 h-24 text-emerald-500" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5">{p.type}</Badge>
                <span className="text-[10px] font-mono text-muted-foreground">ID: #00{p.id}</span>
              </div>
              <CardTitle className="text-xl mt-2">{p.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">IPN Regional: <span className="text-cyan-400 font-bold">{p.ipn}</span></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Volume</p>
                  <p className="text-sm font-bold text-white">{p.credits}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Preço</p>
                  <p className="text-sm font-bold text-emerald-400">{p.price}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-xs h-9">Ver Audit</Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9">Comprar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="p-4 bg-cyan-950/10 border border-cyan-500/20 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg"><TrendingUp className="w-5 h-5 text-cyan-400" /></div>
          <div>
            <p className="text-sm font-bold text-white">Nexus Score Index</p>
            <p className="text-xs text-cyan-400">+12.4% nos últimos 30 dias</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-cyan-400">Ver Gráfico <ArrowUpRight className="ml-1 w-4 h-4" /></Button>
      </div>
    </div>
  )
}
"""

matching = """"use client"
import { MapPin, Building2, Handshake, Zap, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const matches = [
  { id: 1, owner: "Fazenda Sta. Maria", dev: "Voltalia Brasil", area: "400 ha", potential: "85 MW", fit: "98%", region: "Piauí" },
  { id: 2, owner: "Grupo AgroNordeste", dev: "EDP Renováveis", area: "1.200 ha", potential: "250 MW", fit: "92%", region: "Ceará" },
  { id: 3, owner: "Prefeitura de Aracati", dev: "Engie Brasil", area: "PPPs Urbanas", potential: "Offshore 1.2GW", fit: "89%", region: "Ceará" },
  { id: 4, owner: "Condomínio Industrial S.A", dev: "Casa dos Ventos", area: "ZPE Pecém", potential: "H2V Storage", fit: "95%", region: "Ceará" },
]

export function MatchingPanel() {
  return (
    <div className="p-6 h-full overflow-y-auto space-y-6 bg-background font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Nexus <span className="text-cyan-400">Match</span></h2>
        <p className="text-muted-foreground">Inteligência artificial conectando ativos territoriais a desenvolvedores globais.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-2 py-0.5 text-[10px] font-bold">LIVE FEED</Badge>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Novas Conexões Sugeridas</span>
        </div>
        
        {matches.map((m) => (
          <Card key={m.id} className="bg-[#111]/50 border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-4">
                  <div className="text-center flex flex-col items-center justify-center min-w-[60px]">
                    <div className="text-2xl font-bold text-emerald-400">{m.fit}</div>
                    <div className="text-[8px] uppercase font-bold text-muted-foreground">Match Fit</div>
                  </div>
                  
                  <div className="h-10 w-px bg-white/10" />
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{m.owner}</span>
                      <Handshake className="w-3 h-3 text-cyan-400" />
                      <span className="text-sm font-bold text-cyan-400">{m.dev}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {m.region}</span>
                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {m.area}</span>
                      <span className="flex items-center gap-1 text-emerald-400"><Zap className="w-3 h-3 fill-current" /> {m.potential}</span>
                    </div>
                  </div>
                </div>
                
                <div className="group-hover:bg-cyan-500 group-hover:text-black transition-all rounded-full h-8 w-8 flex items-center justify-center border border-white/5 cursor-pointer">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="p-4 rounded-xl bg-card border border-white/5 text-center">
          <p className="text-2xl font-bold text-white">1.4k</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Proprietários</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-white/5 text-center">
          <p className="text-2xl font-bold text-white">82</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Desenvolvedores</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-white/5 text-center">
          <p className="text-2xl font-bold text-emerald-400">12GW</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Em Negociação</p>
        </div>
      </div>
    </div>
  )
}
"""

with open("src/components/MarketplacePanel.tsx", "w", encoding="utf-8") as f:
    f.write(marketplace)

with open("src/components/MatchingPanel.tsx", "w", encoding="utf-8") as f:
    f.write(matching)

with open("src/components/Sidebar.tsx", "r", encoding="utf-8") as f:
    sb = f.read()
sb = sb.replace('Settings } from "lucide-react"', 'Settings, ShoppingCart, Handshake } from "lucide-react"')
sb = sb.replace('const tabs = [', 'const tabs = [\\n  { id: "market", icon: ShoppingCart, label: "Nexus Market" },\\n  { id: "match", icon: Handshake, label: "Nexus Match" },')
with open("src/components/Sidebar.tsx", "w", encoding="utf-8") as f:
    f.write(sb)

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    pg = f.read()
pg = pg.replace('import { SimulatorPanel } from "@/components/SimulatorPanel"', 'import { SimulatorPanel } from "@/components/SimulatorPanel"\\nimport { MarketplacePanel } from "@/components/MarketplacePanel"\\nimport { MatchingPanel } from "@/components/MatchingPanel"')
pg = pg.replace('{activeTab === "map" ? "Inteligência Territorial (IPN)" : "Simulador Prospectivo (Nexus Sim)"}', '{activeTab === "map" ? "Inteligência Territorial (IPN)" : activeTab === "sim" ? "Simulador Prospectivo (Nexus Sim)" : activeTab === "market" ? "Nexus Market (Créditos & Ativos)" : "Nexus Match (Conexões Estratégicas)"}')
pg = pg.replace('{activeTab === "map" ? <IpnMap /> : <SimulatorPanel />}', '{activeTab === "map" ? <IpnMap /> : activeTab === "sim" ? <SimulatorPanel /> : activeTab === "market" ? <MarketplacePanel /> : <MatchingPanel />}')
with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(pg)

print("Nexus Market and Match modules added successfully.")
