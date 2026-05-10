"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { demoProfileById, type DemoProfileId, type DemoRegion } from "@/lib/demo-data"

interface SimulatorPanelProps {
  profileId: DemoProfileId
  selectedRegion: DemoRegion | null
}

const SIMULATION_START_YEAR = 2026
const DEFAULT_INVESTMENT = 80
const DEFAULT_HORIZON_YEARS = 12

function normalizeSliderValue(value: number | readonly number[] | undefined, fallback: number) {
  if (Array.isArray(value)) {
    const nextValue = value[0]
    return [typeof nextValue === "number" ? nextValue : fallback]
  }

  return [typeof value === "number" ? value : fallback]
}

export function SimulatorPanel({ profileId, selectedRegion }: SimulatorPanelProps) {
  const [investment, setInvestment] = useState([DEFAULT_INVESTMENT])
  const [horizonYears, setHorizonYears] = useState([DEFAULT_HORIZON_YEARS])
  const [tech, setTech] = useState("h2v")

  const selectedProfile = demoProfileById[profileId]
  const investmentValue = investment[0] ?? DEFAULT_INVESTMENT
  const horizonValue = horizonYears[0] ?? DEFAULT_HORIZON_YEARS
  const simulationEndYear = SIMULATION_START_YEAR + horizonValue

  const generateData = () => {
    const techFactor = tech === "h2v" ? 2.3 : tech === "bio" ? 1.7 : 1.9
    const regionFactor = selectedRegion?.id === "ceara-pecem" ? 1.08 : selectedRegion?.id === "piaui-parnaiba" ? 1.03 : 1
    const profileFactor = profileId === "investor" ? 1.04 : profileId === "public-manager" ? 0.98 : 1
    const baseOutput = investmentValue * techFactor * regionFactor * profileFactor

    return Array.from({ length: horizonValue + 1 }, (_, index) => {
      const year = SIMULATION_START_YEAR + index
      const progress = horizonValue === 0 ? 0 : index / horizonValue
      const output = Number((baseOutput * Math.pow(progress, 1.15)).toFixed(1))
      const avoided = Number((output * 0.42 * horizonValue).toFixed(1))
      const emissions = Number(Math.max(95 - output * 0.35, 18).toFixed(1))

      return {
        year: String(year),
        output,
        avoided,
        emissions,
      }
    })
  }

  const data = generateData()
  const finalPoint = data[data.length - 1]
  const averageCost = Math.max(
    28,
    Number((69 - investmentValue * 0.09 - horizonValue * 0.8 + (tech === "h2v" ? 6 : tech === "bio" ? -4 : 0)).toFixed(1)),
  )
  const annualOutput = finalPoint.output.toFixed(1)
  const totalAvoided = finalPoint.avoided.toFixed(1)

  return (
    <div className="h-full overflow-y-auto bg-background p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        
        <Card className="border-border/50 bg-card/40 backdrop-blur xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Parâmetros de Cenário</CardTitle>
            <CardDescription>{selectedProfile.label} · {selectedRegion?.shortName ?? "Brasil demo"}</CardDescription>
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
                <span className="text-sm text-emerald-400 font-bold">R$ {investmentValue} bi</span>
              </div>
              <Slider 
                value={investment} 
                onValueChange={(value) => setInvestment(normalizeSliderValue(value, DEFAULT_INVESTMENT))} 
                max={200} 
                step={5} 
                className="my-4"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Horizonte Temporal</label>
                <span className="text-sm font-bold text-cyan-400">{horizonValue} anos · até {simulationEndYear}</span>
              </div>
              <Slider
                value={horizonYears}
                onValueChange={(value) => setHorizonYears(normalizeSliderValue(value, DEFAULT_HORIZON_YEARS))}
                min={4}
                max={18}
                step={1}
                className="my-4"
              />
              <p className="text-xs text-muted-foreground">Os dois sliders alteram o gráfico em tempo real para facilitar a narrativa da banca.</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Output Anual</p>
                <div className="text-4xl font-bold text-emerald-400">{annualOutput} <span className="text-lg text-emerald-500/70">kt</span></div>
              </CardContent>
            </Card>
            <Card className="border-cyan-500/30 bg-cyan-500/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">CO₂ Evitado</p>
                <div className="text-4xl font-bold text-cyan-400">{totalAvoided} <span className="text-lg text-cyan-500/70">Mt</span></div>
              </CardContent>
            </Card>
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Custo Médio</p>
                <div className="text-4xl font-bold text-orange-500">R$ {averageCost} <span className="text-lg text-orange-500/70">/ tCO₂</span></div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/40 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Output do Cenário</CardTitle>
              <CardDescription>
                Investimento, prazo e território selecionado recalculam a trajetória anual.
              </CardDescription>
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
                    <Area type="monotone" dataKey="output" name="Output anual" stroke="#10b981" fillOpacity={1} fill="url(#colorAvoided)" />
                    <Line type="monotone" dataKey="emissions" name="Emissões residuais" stroke="#06b6d4" strokeWidth={3} />
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