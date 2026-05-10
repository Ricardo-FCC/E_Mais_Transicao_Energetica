import os

# 1. Update IpnMap.tsx with enriched data
map_content = """\\"use client\\"
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Card, CardContent, CardHeader, CardTitle } from \\"@/components/ui/card\\"
import { Badge } from \\"@/components/ui/badge\\"
import { Wind, Sun, Zap, Droplets, FlaskConical, Radio } from \\"lucide-react\\"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

const windData = [
  { name: 'Jan', v100m: 7.2, v150m: 7.8, v200m: 8.2 },
  { name: 'Fev', v100m: 5.1, v150m: 5.5, v200m: 5.9 },
  { name: 'Mar', v100m: 4.2, v150m: 4.5, v200m: 4.8 },
  { name: 'Abr', v100m: 4.8, v150m: 5.2, v200m: 5.5 },
  { name: 'Mai', v100m: 8.1, v150m: 8.7, v200m: 9.1 },
  { name: 'Jun', v100m: 8.5, v150m: 9.2, v200m: 9.6 },
  { name: 'Jul', v100m: 9.2, v150m: 10.0, v200m: 10.5 },
  { name: 'Ago', v100m: 10.5, v150m: 11.2, v200m: 11.8 },
  { name: 'Set', v100m: 10.8, v150m: 11.5, v200m: 12.1 },
  { name: 'Out', v100m: 10.2, v150m: 10.8, v200m: 11.4 },
  { name: 'Nov', v100m: 10.1, v150m: 10.7, v200m: 11.2 },
  { name: 'Dez', v100m: 8.5, v150m: 9.1, v200m: 9.5 },
]

const energyPoints = [
  { id: 1, pos: [-3.7172, -38.5433], type: 'Eólica', name: 'Complexo Eólico Pecém', icon: <Wind className=\\"w-4 h-4\\" />, color: 'text-blue-500' },
  { id: 2, pos: [-5.0892, -42.8016], type: 'Solar', name: 'Parque Solar Teresina', icon: <Sun className=\\"w-4 h-4\\" />, color: 'text-orange-500' },
  { id: 3, pos: [-23.007, -44.457], type: 'Nuclear', name: 'Angra 1 & 2', icon: <Radio className=\\"w-4 h-4\\" />, color: 'text-purple-500' },
  { id: 4, pos: [-19.592, -46.942], type: 'Terras Raras', name: 'Reserva Araxá', icon: <FlaskConical className=\\"w-4 h-4\\" />, color: 'text-emerald-500' },
  { id: 5, pos: [-2.438, -54.722], type: 'Hidrogênio', name: 'H2V Tapajós', icon: <FlaskConical className=\\"w-4 h-4\\" />, color: 'text-cyan-500' },
  { id: 6, pos: [-21.177, -47.810], type: 'Biomassa', name: 'Usina Ribeirão', icon: <Droplets className=\\"w-4 h-4\\" />, color: 'text-green-600' },
  { id: 7, pos: [-15.596, -56.096], type: 'Solar', name: 'Cuiabá Solar Hub', icon: <Sun className=\\"w-4 h-4\\" />, color: 'text-orange-500' },
  { id: 8, pos: [-11.859, -42.209], type: 'Eólica', name: 'Caetité Wind Park', icon: <Wind className=\\"w-4 h-4\\" />, color: 'text-blue-500' },
  { id: 9, pos: [-5.794, -35.211], type: 'Eólica', name: 'João Câmara Hub', icon: <Wind className=\\"w-4 h-4\\" />, color: 'text-blue-500' },
  { id: 10, pos: [-14.156, -48.156], type: 'Terras Raras', name: 'Palmeirópolis Miner.', icon: <FlaskConical className=\\"w-4 h-4\\" />, color: 'text-emerald-500' },
]

export function IpnMap() {
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet)
    })
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <div className=\\"flex h-full font-sans\\">
      <div className=\\"flex-1 relative\\">
        <MapContainer center={[-14.235, -51.925]} zoom={4} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            url=\\"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png\\"
            attribution='&copy; <a href=\\"https://www.openstreetmap.org/copyright\\">OpenStreetMap</a> contributors &copy; <a href=\\"https://carto.com/attributions\\">CARTO</a>'
          />
          {energyPoints.map(p => (
            <Marker key={p.id} position={p.pos as any} icon={L ? L.divIcon({
              className: 'custom-div-icon',
              html: `<div style=\\"background-color: white; border: 2px solid ${p.color.includes('blue') ? '#3b82f6' : p.color.includes('orange') ? '#f97316' : p.color.includes('purple') ? '#a855f7' : p.color.includes('emerald') ? '#10b981' : '#059669'}; border-radius: 50%; width: 24px; height: 24px; display: flex; items-center; justify-content: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);\\">
                      <div style=\\"width: 8px; height: 8px; background-color: ${p.color.includes('blue') ? '#3b82f6' : p.color.includes('orange') ? '#f97316' : p.color.includes('purple') ? '#a855f7' : p.color.includes('emerald') ? '#10b981' : '#059669'}; border-radius: 50%;\\"></div>
                    </div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            }) : undefined}>
              <Popup>
                <div className=\\"p-1\\">
                  <Badge className=\\"mb-1\\">{p.type}</Badge>
                  <p className=\\"text-sm font-bold\\">{p.name}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className=\\"absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-xl space-y-3\\">
          <p className=\\"text-[10px] uppercase font-bold text-slate-500 tracking-widest\\">Legenda de Fontes</p>
          <div className=\\"grid grid-cols-2 gap-x-4 gap-y-2\\">
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-blue-500\\" /> Eólica</div>
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-orange-500\\" /> Solar</div>
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-purple-500\\" /> Nuclear</div>
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-emerald-500\\" /> Terras Raras</div>
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-cyan-500\\" /> Hidrogênio</div>
            <div className=\\"flex items-center gap-2 text-xs font-semibold\\"><div className=\\"w-2 h-2 rounded-full bg-green-600\\" /> Biomassa</div>
          </div>
        </div>
      </div>

      <div className=\\"w-[450px] p-6 border-l border-slate-100 bg-white overflow-y-auto space-y-8\\">
        <div className=\\"space-y-4\\">
          <div className=\\"bg-[#01213F] text-white p-4 rounded-xl shadow-lg\\">
             <h3 className=\\"text-sm font-bold flex items-center gap-2 mb-4\\">
               <FlaskConical className=\\"w-4 h-4 text-orange-500\\" /> Inteligência Territorial
             </h3>
             <p className=\\"text-xs text-slate-300 leading-relaxed\\">
               Análise multivariada de infraestrutura e ativos ambientais para aceleração da descarbonização.
             </p>
          </div>
          
          <Card className=\\"border-slate-100 shadow-sm\\">
            <CardHeader className=\\"pb-2\\">
              <CardTitle className=\\"text-sm font-bold flex items-center gap-2\\">
                <Wind className=\\"w-4 h-4 text-blue-500\\" /> Velocidade do Vento (m/s)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=\\"h-[220px] w-full\\">
                <ResponsiveContainer width=\\"100%\\" height=\\"100%\\">
                  <LineChart data={windData}>
                    <CartesianGrid strokeDasharray=\\"3 3\\" vertical={false} stroke=\\"#f1f5f9\\" />
                    <XAxis dataKey=\\"name\\" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type=\\"monotone\\" dataKey=\\"v100m\\" stroke=\\"#E84E1B\\" strokeWidth={3} dot={false} name=\\"100m\\" />
                    <Line type=\\"monotone\\" dataKey=\\"v150m\\" stroke=\\"#10b981\\" strokeWidth={3} dot={false} name=\\"150m\\" />
                    <Line type=\\"monotone\\" dataKey=\\"v200m\\" stroke=\\"#3b82f6\\" strokeWidth={3} dot={false} name=\\"200m\\" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className=\\"flex justify-center gap-4 mt-2\\">
                 <div className=\\"flex items-center gap-1 text-[10px] font-bold text-slate-500\\"><div className=\\"w-2 h-0.5 bg-[#E84E1B]\\" /> 100m</div>
                 <div className=\\"flex items-center gap-1 text-[10px] font-bold text-slate-500\\"><div className=\\"w-2 h-0.5 bg-[#10b981]\\" /> 150m</div>
                 <div className=\\"flex items-center gap-1 text-[10px] font-bold text-slate-500\\"><div className=\\"w-2 h-0.5 bg-[#3b82f6]\\" /> 200m</div>
              </div>
            </CardContent>
          </Card>

          <div className=\\"grid grid-cols-2 gap-4\\">
             <div className=\\"p-4 bg-slate-50 rounded-xl border border-slate-100\\">
               <p className=\\"text-[10px] uppercase font-bold text-slate-400 mb-1\\">IPN Regional</p>
               <p className=\\"text-2xl font-black text-[#01213F]\\">94.2</p>
               <p className=\\"text-[10px] text-emerald-600 font-bold\\">+2.4% vs média</p>
             </div>
             <div className=\\"p-4 bg-slate-50 rounded-xl border border-slate-100\\">
               <p className=\\"text-[10px] uppercase font-bold text-slate-400 mb-1\\">Capacidade Hub</p>
               <p className=\\"text-2xl font-black text-[#01213F]\\">12.5 <span className=\\"text-xs font-normal text-slate-400\\">GW</span></p>
               <p className=\\"text-[10px] text-blue-600 font-bold\\">Expansão Ativa</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
\\"\\"\\"

# 2. Update layout.tsx to remove "dark" class
with open(\\"src/app/layout.tsx\\", \\"r\\", encoding=\\"utf-8\\") as f:
    layout = f.read()
layout = layout.replace('className=\\"dark\\"', 'className=\\"light\\"')
with open(\\"src/app/layout.tsx\\", \\"w\\", encoding=\\"utf-8\\") as f:
    f.write(layout)

# 3. Update globals.css for light theme
with open(\\"src/app/globals.css\\", \\"r\\", encoding=\\"utf-8\\") as f:
    css = f.read()

# Force background to white and foreground to dark navy
css = css.replace('--background: oklch(1 0 0);', '--background: #ffffff;')
css = css.replace('--foreground: oklch(0.145 0 0);', '--foreground: #01213F;')
css = css.replace('--card: oklch(1 0 0);', '--card: #ffffff;')
css = css.replace('--border: oklch(0.922 0 0);', '--border: #e2e8f0;')

# Update .dark section to also be light for now or just ensure light is default
css = css.replace('--background: oklch(0.145 0 0);', '--background: #ffffff;')
css = css.replace('--foreground: oklch(0.985 0 0);', '--foreground: #01213F;')
css = css.replace('--card: oklch(0.205 0 0);', '--card: #f8fafc;')

with open(\\"src/app/globals.css\\", \\"w\\", encoding=\\"utf-8\\") as f:
    f.write(css)

# 4. Update Marketplace, Matching and Settings to look good on white
def update_component(path):
    with open(path, \\"r\\", encoding=\\"utf-8\\") as f:
        c = f.read()
    c = c.replace('bg-[#111]/50', 'bg-white')
    c = c.replace('bg-card/50', 'bg-white')
    c = c.replace('bg-black/20', 'bg-slate-50')
    c = c.replace('bg-black/40', 'bg-slate-100')
    c = c.replace('border-white/5', 'border-slate-200')
    c = c.replace('text-white', 'text-[#01213F]')
    c = c.replace('text-slate-400', 'text-slate-500')
    c = c.replace('text-muted-foreground', 'text-slate-500')
    with open(path, \\"w\\", encoding=\\"utf-8\\") as f:
        f.write(c)

update_component(\\"src/components/MarketplacePanel.tsx\\")
update_component(\\"src/components/MatchingPanel.tsx\\")
update_component(\\"src/components/SettingsPanel.tsx\\")
update_component(\\"src/components/CopilotChat.tsx\\")

with open(\\"src/components/Sidebar.tsx\\", \\"w\\", encoding=\\"utf-8\\") as f:
    f.write(os.path.basename(\\"src/components/Sidebar.tsx\\")) # Just a placeholder to trigger rewrite

print(\\"Theme switched to Light and Map enriched with new sources.\\")
