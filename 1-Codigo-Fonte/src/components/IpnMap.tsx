"use client"
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Badge } from "@/components/ui/badge"
import { 
  Map as MapIcon, 
  Layers, 
  List, 
  Ruler, 
  Edit3, 
  Save, 
  Info,
  ChevronRight,
  Maximize2,
  X,
  Mountain
} from "lucide-react"

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

const energyPoints = [
  // BRASIL - Renováveis
  { id: 1, pos: [-3.7172, -38.5433], type: 'Eólica', name: 'Complexo Eólico Pecém (BR)', color: '#F89069', category: 'Renovável' },
  { id: 2, pos: [-5.0892, -42.8016], type: 'Solar', name: 'Parque Solar Teresina (BR)', color: '#F5F749', category: 'Renovável' },
  { id: 4, pos: [-19.592, -46.942], type: 'Terras Raras', name: 'Reserva Araxá (BR)', color: '#4D4E03', category: 'Renovável' },
  { id: 5, pos: [-2.438, -54.722], type: 'Hidrogênio', name: 'H2V Tapajós (BR)', color: '#BECCCC', category: 'Renovável' },
  { id: 6, pos: [-21.177, -47.810], type: 'Biomassa', name: 'Usina Ribeirão (BR)', color: '#B5446E', category: 'Renovável' },
  { id: 11, pos: [-25.42, -54.58], type: 'Hidráulica', name: 'Itaipu Binacional (BR/PY)', color: '#4D4E03', category: 'Renovável' },
  { id: 12, pos: [-3.12, -51.77], type: 'Hidráulica', name: 'Belo Monte (BR)', color: '#4D4E03', category: 'Renovável' },
  { id: 3, pos: [-23.007, -44.457], type: 'Nuclear', name: 'Angra 1 & 2 (BR)', color: '#B5446E', category: 'Renovável' },
  
  // BRASIL - Não Renováveis
  { id: 13, pos: [-22.50, -41.00], type: 'Petróleo', name: 'Bacia de Campos (BR)', color: '#550C18', category: 'Não Renovável' },
  { id: 14, pos: [-24.00, -45.00], type: 'Gás Natural', name: 'Bacia de Santos (BR)', color: '#F89069', category: 'Não Renovável' },
  { id: 15, pos: [-31.56, -53.67], type: 'Carvão', name: 'Mina de Candiota (BR)', color: '#03254D', category: 'Não Renovável' },

  // LATAM - Renováveis
  { id: 16, pos: [-24.50, -69.25], type: 'Solar', name: 'Deserto do Atacama (CL)', color: '#F5F749', category: 'Renovável' },
  { id: 17, pos: [-45.00, -68.00], type: 'Eólica', name: 'Patagônia Eólica (AR)', color: '#F89069', category: 'Renovável' },
  { id: 18, pos: [-20.13, -67.48], type: 'Terras Raras', name: 'Lítio Salar de Uyuni (BO)', color: '#4D4E03', category: 'Renovável' },
  { id: 19, pos: [7.76, -62.99], type: 'Hidráulica', name: 'Represa de Guri (VE)', color: '#4D4E03', category: 'Renovável' },
  { id: 20, pos: [-33.96, -59.20], type: 'Nuclear', name: 'Atucha I & II (AR)', color: '#B5446E', category: 'Renovável' },
  { id: 21, pos: [4.60, -74.08], type: 'Biomassa', name: 'Biomassa Bogotá (CO)', color: '#B5446E', category: 'Renovável' },
  { id: 22, pos: [-5.00, -80.00], type: 'Eólica', name: 'Talara Eólica (PE)', color: '#F89069', category: 'Renovável' },
  
  // LATAM - Não Renováveis
  { id: 23, pos: [-38.30, -68.50], type: 'Gás Natural', name: 'Vaca Muerta (AR)', color: '#F89069', category: 'Não Renovável' },
  { id: 24, pos: [8.50, -63.50], type: 'Petróleo', name: 'Faixa do Orinoco (VE)', color: '#550C18', category: 'Não Renovável' },
  { id: 25, pos: [0.00, -76.50], type: 'Petróleo', name: 'Bacia Oriente (EC)', color: '#550C18', category: 'Não Renovável' }
]

const basemaps = {
  light: {
    name: 'Relevo Sombreado Mundial',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO',
    img: 'bg-slate-100'
  },
  satellite: {
    name: 'Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    img: 'bg-green-800'
  },
  street: {
    name: 'Streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    img: 'bg-orange-100'
  },
  topo: {
    name: 'Topographic',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    img: 'bg-emerald-100'
  }
}

export function IpnMap() {
  const [L, setL] = useState<any>(null)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [currentBasemap, setCurrentBasemap] = useState<keyof typeof basemaps>('light')
  const [showElevation, setShowElevation] = useState(false)

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet)
    })
  }, [])

  if (typeof window === 'undefined') return null

  const tools = [
    { id: 'base', icon: MapIcon, label: 'Mapas Base' },
    { id: 'layers', icon: Layers, label: 'Camadas', badge: 9 },
    { id: 'legend', icon: List, label: 'Legenda' },
    { id: 'measure', icon: Ruler, label: 'Medir' },
    { id: 'sketch', icon: Edit3, label: 'Esboço' },
    { id: 'save', icon: Save, label: 'Salvar' },
  ]

  return (
    <div className="relative w-full h-full bg-slate-50 font-sans flex flex-col">
      <div className={`relative w-full transition-all duration-300 ${showElevation ? 'h-[70%]' : 'h-full'}`}>
        <MapContainer center={[-10.0, -60.0]} zoom={3.5} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            key={currentBasemap}
            url={basemaps[currentBasemap].url}
            attribution={basemaps[currentBasemap].attribution}
          />
          {energyPoints.map(p => (
            <Marker key={p.id} position={p.pos as any} icon={L ? L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: white; border: 2px solid ${p.color}; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                      <div style="width: 8px; height: 8px; background-color: ${p.color}; border-radius: 50%;"></div>
                    </div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            }) : undefined}>
              <Popup>
                <div className="p-1">
                  <Badge variant={p.category === 'Renovável' ? 'default' : 'destructive'} className="mb-1 text-[10px] h-4">
                    {p.type}
                  </Badge>
                  <p className="text-sm font-bold text-[#03254D]">{p.name}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ArcGIS Style Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 overflow-visible">
          {tools.map((tool, idx) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
              className={`relative flex flex-col items-center justify-center w-[85px] h-[85px] transition-all hover:bg-slate-50 border-r border-slate-100 last:border-0 ${activeTool === tool.id ? 'bg-slate-50 text-orange-600' : 'text-slate-600'}`}
            >
              {tool.badge && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {tool.badge}
                </div>
              )}
              <tool.icon className={`w-6 h-6 mb-2 ${activeTool === tool.id ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className={`text-[10px] uppercase font-medium ${activeTool === tool.id ? 'text-orange-600 font-bold' : ''}`}>{tool.label}</span>
              {activeTool === tool.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-600" />}
            </button>
          ))}
        </div>

        {/* Floating Panel (Right) */}
        {activeTool && (
          <div className="absolute top-6 right-6 z-[1000] w-[340px] bg-white shadow-2xl border border-slate-200 flex flex-col animate-in slide-in-from-right-4 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-medium text-[#03254D]">
                {tools.find(t => t.id === activeTool)?.label}
              </h3>
              <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-slate-100 transition-colors border border-slate-200">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto bg-slate-50/50">
              {activeTool === 'legend' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 mb-4">Matriz Energética LATAM</p>
                  <div className="space-y-3">
                    {['Eólica', 'Solar', 'Hidráulica', 'Biomassa', 'Nuclear', 'H2 Verde', 'Terras Raras (Lítio)'].map(t => (
                      <div key={t} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                        <span className="text-sm text-slate-700">{t}</span>
                      </div>
                    ))}
                    {['Petróleo', 'Gás Natural', 'Carvão'].map(t => (
                      <div key={t} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
                        <span className="text-sm text-slate-700">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTool === 'layers' && (
                <div className="space-y-2">
                  {[
                    { n: 'Esboço', v: true, icon: true },
                    { n: 'Indicadores da Transição Energética', v: false, icon: true },
                    { n: 'Projetos BIP', v: false, icon: true },
                    { n: 'Limites Estaduais e Nacionais', v: true, icon: false },
                  ].map(l => (
                    <div key={l.n} className="bg-white border border-slate-200 rounded p-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">::</span>
                          {l.icon && <ChevronRight className="w-4 h-4 text-slate-400" />}
                          <span className="text-sm text-slate-700">{l.n}</span>
                        </div>
                        <input type="checkbox" defaultChecked={l.v} className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 focus:ring-blue-600" />
                      </label>
                      {l.v && (
                         <div className="flex gap-4 pl-10 mt-3 text-slate-400">
                           <Maximize2 className="w-4 h-4 hover:text-slate-700 cursor-pointer" />
                           <Layers className="w-4 h-4 hover:text-slate-700 cursor-pointer" />
                           <Info className="w-4 h-4 hover:text-slate-700 cursor-pointer" />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeTool === 'base' && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500 mb-4">Selecione um mapa base para refinar a cor do seu mapa.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(basemaps).map(([key, map]) => (
                      <button 
                        key={key} 
                        onClick={() => setCurrentBasemap(key as keyof typeof basemaps)}
                        className={`flex flex-col items-center bg-white border ${currentBasemap === key ? 'border-orange-500 shadow-md ring-1 ring-orange-500' : 'border-slate-200 hover:border-slate-300'} transition-all`}
                      >
                        <div className={`w-full h-24 ${map.img} flex items-center justify-center opacity-80`}>
                           {key === 'satellite' ? <img src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/4/8/5" className="w-full h-full object-cover" /> : null}
                           {key === 'street' ? <img src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/4/8/5" className="w-full h-full object-cover" /> : null}
                           {key === 'topo' ? <img src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/4/8/5" className="w-full h-full object-cover" /> : null}
                           {key === 'light' ? <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center"><MapIcon className="w-8 h-8 text-slate-300"/></div> : null}
                        </div>
                        <div className={`w-full p-2 text-xs text-left border-t border-slate-100 ${currentBasemap === key ? 'bg-orange-50 text-blue-700 font-medium' : 'text-slate-600'}`}>
                          {map.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeTool === 'measure' && (
                <div className="flex flex-col gap-4">
                  <button onClick={() => setShowElevation(!showElevation)} className="w-full py-2 bg-orange-600 text-white rounded font-medium text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                    <Mountain className="w-4 h-4" /> Toggle Perfil de Elevação
                  </button>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Ruler className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500">Selecione pontos no mapa para medir distâncias e áreas.</p>
                  </div>
                </div>
              )}
              {(activeTool === 'sketch' || activeTool === 'save') && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Info className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-sm text-slate-500">Ferramenta conectada à API do ArcGIS Experience.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Elevation Profile Panel (Bottom) */}
      {showElevation && (
        <div className="h-[30%] bg-white border-t border-slate-200 z-[1000] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
            <h3 className="text-lg font-bold text-[#03254D]">Perfil de elevação</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><Edit3 className="w-4 h-4" /></button>
              <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><Save className="w-4 h-4" /></button>
              <button onClick={() => setShowElevation(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 p-6 relative flex items-end">
            <div className="w-full h-full border-b border-l border-slate-200 relative">
               <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                 <path d="M0,40 L100,40 L200,42 L300,38 L400,40 L500,45 L550,45 L600,40 L650,42 L700,90 L750,95 L800,92 L850,98 L900,80 L950,90 L1000,60" fill="none" stroke="#f97316" strokeWidth="2" />
                 <path d="M0,40 L100,40 L200,42 L300,38 L400,40 L500,45 L550,45 L600,40 L650,42 L700,90 L750,95 L800,92 L850,98 L900,80 L950,90 L1000,60 L1000,100 L0,100 Z" fill="#ffedd5" opacity="0.5" />
               </svg>
               <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-[10px] text-slate-400 -ml-8">
                 <span>0 m</span>
                 <span>-2.000 m</span>
                 <span>-4.000 m</span>
                 <span>-6.000 m</span>
               </div>
               <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-[10px] text-slate-400 px-2">
                 <span>500 km</span>
                 <span>1.500 km</span>
                 <span>2.500 km</span>
                 <span>4.000 km</span>
                 <span>5.500 km</span>
                 <span>7.000 km</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

