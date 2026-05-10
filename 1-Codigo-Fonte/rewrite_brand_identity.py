import os

sidebar = """\\"use client\\"
import { Map as MapIcon, Zap, ShoppingCart, Handshake, Settings, BarChart3 } from \\"lucide-react\\"
import { cn } from \\"@/lib/utils\\"
import { Button } from \\"./ui/button\\"

const tabs = [
  { id: \\"map\\", icon: MapIcon, label: \\"Mapa IPN\\" },
  { id: \\"sim\\", icon: Zap, label: \\"Nexus Sim\\" },
  { id: \\"market\\", icon: ShoppingCart, label: \\"Nexus Market\\" },
  { id: \\"match\\", icon: Handshake, label: \\"Nexus Match\\" },
  { id: \\"settings\\", icon: Settings, label: \\"Configurações\\" },
]

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <div className=\\"w-[260px] border-r border-white/5 bg-[#01213F] flex flex-col p-4 z-20 font-sans\\">
      {/* PID Logo Area */}
      <div className=\\"mb-10 px-2\\">
        <div className=\\"bg-black/20 rounded-full p-1 pr-4 flex items-center gap-3 border border-white/10 shadow-lg group cursor-pointer overflow-hidden relative\\">
          <div className=\\"absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity\\" />
          <div className=\\"w-10 h-10 rounded-full bg-gradient-to-br from-[#E84E1B] to-[#b1340d] flex items-center justify-center shrink-0 shadow-inner\\">
            <div className=\\"text-white font-black text-xs tracking-tighter\\">PID</div>
          </div>
          <div className=\\"flex flex-col\\">
            <span className=\\"text-[14px] font-black text-white leading-none tracking-tighter uppercase italic\\">Nexus</span>
            <span className=\\"text-[8px] text-orange-500 font-bold uppercase tracking-widest leading-none mt-1\\">E+ Energia</span>
          </div>
        </div>
      </div>
      
      <nav className=\\"flex flex-col gap-2 flex-1 font-montserrat\\">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant=\\"ghost\\"
            className={cn(
              \\"justify-start gap-3 h-12 px-4 rounded-xl transition-all font-semibold\\",
              activeTab === tab.id 
                ? \\"bg-white/10 text-white shadow-lg shadow-black/20\\" 
                : \\"text-slate-400 hover:text-white hover:bg-white/5\\"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className={cn(\\"w-5 h-5\\", activeTab === tab.id ? \\"text-orange-500\\" : \\"text-slate-500\\")} />
            {tab.label}
          </Button>
        ))}
      </nav>

      <div className=\\"mt-auto pt-4 border-t border-white/5\\">
        <div className=\\"flex items-center gap-3 px-4 py-2 bg-black/20 rounded-xl border border-white/5\\">
          <div className=\\"w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white\\">LX</div>
          <div className=\\"flex flex-col\\">
            <span className=\\"text-xs font-bold text-white\\">User Demo</span>
            <span className=\\"text-[10px] text-slate-500\\">Acesso Nível 1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
\\"\\"\\"

page = """\\"use client\\"
import { useState } from \\"react\\"
import { Sidebar } from \\"@/components/Sidebar\\"
import { IpnMap } from \\"@/components/IpnMap\\"
import { CopilotChat } from \\"@/components/CopilotChat\\"
import { SimulatorPanel } from \\"@/components/SimulatorPanel\\"
import { MarketplacePanel } from \\"@/components/MarketplacePanel\\"
import { MatchingPanel } from \\"@/components/MatchingPanel\\"

export default function Home() {
  const [activeTab, setActiveTab] = useState(\\"map\\")

  return (
    <div className=\\"flex h-screen bg-[#0a0a0a] text-foreground font-sans\\">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className=\\"flex-1 flex flex-col relative\\">
        <header className=\\"h-16 border-b border-white/5 flex items-center px-6 bg-[#01213F]/95 backdrop-blur z-10\\">
          <h1 className=\\"text-xl font-bold bg-gradient-to-r from-[#E84E1B] to-orange-400 bg-clip-text text-transparent tracking-tighter uppercase italic\\">
            {activeTab === \\"map\\" ? \\"Inteligência Territorial (IPN)\\" : activeTab === \\"sim\\" ? \\"Simulador Prospectivo (Nexus Sim)\\" : activeTab === \\"market\\" ? \\"PID · Nexus Market (Créditos & Ativos)\\" : \\"Nexus Match (Conexões Estratégicas)\\"}
          </h1>
        </header>
        
        <div className=\\"flex-1 relative overflow-hidden\\">
          {activeTab === \\"map\\" ? <IpnMap /> : activeTab === \\"sim\\" ? <SimulatorPanel /> : activeTab === \\"market\\" ? <MarketplacePanel /> : <MatchingPanel />}
        </div>
      </main>

      <aside className=\\"w-[400px] border-l border-white/5 bg-[#01213F]/30 flex flex-col z-20 backdrop-blur-md\\">
        <CopilotChat />
      </aside>
    </div>
  )
}
\\"\\"\\"

with open(\\"src/components/Sidebar.tsx\\", \\"w\\", encoding=\\"utf-8\\") as f:
    f.write(sidebar)

with open(\\"src/app/page.tsx\\", \\"w\\", encoding=\\"utf-8\\") as f:
    f.write(page)

print(\\"Sidebar and Page rewritten with PID Brand Identity.\\")
