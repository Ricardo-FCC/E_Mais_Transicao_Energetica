"use client"
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
          <h2 className="text-3xl font-bold tracking-tight mb-2">Nexus <span className="text-[#E84E1B]">Market</span></h2>
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
                <Badge variant="outline" className="border-emerald-500/30 text-[#E84E1B] bg-emerald-500/5">{p.type}</Badge>
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
                  <p className="text-sm font-bold text-[#E84E1B]">{p.price}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-xs h-9">Ver Audit</Button>
              <Button className="flex-1 bg-[#E84E1B] hover:bg-[#b1340d] text-white font-bold text-xs h-9">Comprar</Button>
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
