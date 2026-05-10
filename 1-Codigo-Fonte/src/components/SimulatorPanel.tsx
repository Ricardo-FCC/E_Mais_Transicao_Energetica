"use client"
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
              <Select value={tech} onValueChange={(v) => setTech(v || 'h2v')}>
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
                onValueChange={(v) => setInvestment(v as number[])} 
                max={200} 
                step={5} 
                className="my-4"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Horizonte Temporal</label>
              <Select value={horizon} onValueChange={(v) => setHorizon(v || '2035')}>
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
}