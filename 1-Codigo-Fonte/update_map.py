import os

code_map = """\
"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"
import { Droplet, Waves } from "lucide-react"
import "leaflet/dist/leaflet.css"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

let L: any = null;
if (typeof window !== "undefined") {
  L = require("leaflet")
}

const windData = [
  { month: "Jan", "100m": 6.8, "150m": 7.2, "200m": 7.5 },
  { month: "Feb", "100m": 4.6, "150m": 4.9, "200m": 5.1 },
  { month: "Mar", "100m": 3.8, "150m": 4.1, "200m": 4.2 },
  { month: "Apr", "100m": 4.4, "150m": 4.8, "200m": 5.0 },
  { month: "May", "100m": 7.6, "150m": 8.1, "200m": 8.4 },
  { month: "Jun", "100m": 8.3, "150m": 8.8, "200m": 9.1 },
  { month: "Jul", "100m": 9.4, "150m": 10.1, "200m": 10.5 },
  { month: "Aug", "100m": 10.3, "150m": 11.0, "200m": 11.5 },
  { month: "Sep", "100m": 10.6, "150m": 11.3, "200m": 11.8 },
  { month: "Oct", "100m": 10.0, "150m": 10.7, "200m": 11.0 },
  { month: "Nov", "100m": 10.1, "150m": 10.8, "200m": 11.1 },
  { month: "Dec", "100m": 8.4, "150m": 8.9, "200m": 9.2 },
]

const dropIconHtml = `<div style="background:#0ea5e9; border:2px solid white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg></div>`
const waveIconHtml = `<div style="background:#0284c7; border:2px solid white; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></div>`
const greenIconHtml = (num: string) => `<div style="background:#059669; border:2px solid white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.3);">${num}</div>`

const dropLocations = [
  [-6.5, -39.0], [-7.2, -39.5], [-8.5, -37.5], [-8.5, -36.5],
  [-7.5, -35.5], [-8.0, -35.0], [-6.0, -36.0], [-9.5, -38.5]
]
const waveLocation = [-3.0, -39.0]
const greenLocations = [
  { coords: [-3.3, -39.8], label: "5" },
  { coords: [-3.4, -39.2], label: "1" },
  { coords: [-4.6, -38.0], label: "8" },
  { coords: [-4.7, -37.5], label: "10" }
]

export function IpnMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || !L) return <div className="w-full h-full bg-muted flex items-center justify-center">Carregando Mapa...</div>

  const dropIcon = L.divIcon({ html: dropIconHtml, className: "", iconSize: [24, 24], iconAnchor: [12, 12] })
  const waveIcon = L.divIcon({ html: waveIconHtml, className: "", iconSize: [36, 36], iconAnchor: [18, 18] })
  const getGreenIcon = (num: string) => L.divIcon({ html: greenIconHtml(num), className: "", iconSize: [28, 28], iconAnchor: [14, 14] })

  const coastLine = [
    [-2.8, -41.8], [-2.9, -41.0], [-3.1, -40.2], [-3.3, -39.0], [-4.0, -38.0], [-4.8, -37.0], [-5.2, -35.5]
  ]

  return (
    <div className="w-full h-full relative z-0 flex">
      <div className="flex-1 relative bg-[#e2e8f0]">
        <MapContainer center={[-6.0, -38.5] as any} zoom={6} className="w-full h-full" zoomControl={false}>
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
            attribution='&copy; CartoDB' 
          />
          
          <Polyline positions={coastLine as any} pathOptions={{ color: '#22c55e', weight: 8, opacity: 0.6 }} />
          <Polyline positions={[[-9.5, -38.5], [-3.0, -39.0]] as any} pathOptions={{ color: '#10b981', weight: 3, dashArray: '10, 10' }} />

          {dropLocations.map((coords, i) => (
            <Marker key={`drop-${i}`} position={coords as any} icon={dropIcon} />
          ))}

          <Marker position={waveLocation as any} icon={waveIcon} />

          {greenLocations.map((loc, i) => (
            <Marker key={`green-${i}`} position={loc.coords as any} icon={getGreenIcon(loc.label)} />
          ))}
        </MapContainer>
      </div>

      <div className="w-[450px] bg-[#f0fdfa] h-full flex flex-col p-6 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] z-[400] relative text-slate-800 border-l border-emerald-100">
        <div className="flex justify-center mb-6">
          <div className="bg-[#334155] text-white px-6 py-3 rounded-lg font-semibold shadow-md">
            Previsão Base (CMIP6-Ensen)
          </div>
        </div>
        
        <p className="text-sm text-cyan-700/80 mb-8 px-2 text-left leading-relaxed">
          Selecione uma base de dados histórica (ERA5) personalizada enviada no Gerenciador.
        </p>

        <div className="flex items-center justify-between px-2 mb-8">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
            Velocidade do<br/>Vento (m/s)
          </h3>
          <div className="text-[10px] text-teal-800 text-right font-medium">
            <p>• Histórico</p>
            <p>• Previsão</p>
          </div>
        </div>

        <div className="h-[280px] w-full mt-2 relative">
          <div className="absolute -left-5 top-[50%] -translate-y-1/2 -rotate-90 origin-center text-sm font-bold text-slate-800 tracking-wider">
            m/s
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={windData} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 'bold' }} domain={[2, 14]} ticks={[4,6,8,10,12]} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" height={36} iconType="plainline" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingBottom: '20px' }} />
              <Line type="monotone" dataKey="100m" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="150m" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="200m" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
"""

with open('src/components/IpnMap.tsx', 'w', encoding='utf-8') as f:
    f.write(code_map)

# Remove the dark mode override for leaflet from globals.css
with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.leaflet-container { background: #0a0a0a !important; }', '.leaflet-container { background: #e2e8f0 !important; }')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated IpnMap to match the requested image')
