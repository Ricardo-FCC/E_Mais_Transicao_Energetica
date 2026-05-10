"use client"
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
