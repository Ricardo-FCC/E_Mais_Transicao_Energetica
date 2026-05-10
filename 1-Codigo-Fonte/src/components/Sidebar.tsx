import { Map, ShoppingCart, Handshake, Settings, LayoutDashboard, Database, Bot } from "lucide-react"
import { Leaf } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: "map", label: "Mapa IPN", icon: Map },
    { id: "database", label: "Base de Dados", icon: Database },
    { id: "copilot", label: "Copiloto IA", icon: Bot },
    { id: "sim", label: "Nexus Sim", icon: LayoutDashboard },
    { id: "market", label: "Nexus Market", icon: ShoppingCart },
    { id: "match", label: "Nexus Match", icon: Handshake },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  return (
    <aside className="w-[280px] bg-[#ffffff] border-r border-slate-100 flex flex-col h-full font-sans shadow-sm shrink-0">
      <div className="h-20 flex items-center px-8 border-b border-slate-100">
        <div className="flex items-center gap-3"><div className="bg-[#FA441A] p-2 rounded-lg"><Leaf className="w-5 h-5 text-white" /></div><span className="text-xl font-black text-[#03254D] tracking-tighter">PID <span className="text-[#FA441A] font-light">&middot;</span> Nexus</span></div>
      </div>
      <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
                isActive 
                  ? "bg-slate-50 text-[#FA441A] shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#03254D]"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#FA441A]" : "text-slate-400"}`} />
              <span className="text-[13px] uppercase tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </nav>
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-[#03254D] text-white flex items-center justify-center font-bold text-sm shadow-md">
              JD
           </div>
           <div className="text-left">
              <p className="text-[13px] font-bold text-[#03254D]">John Doe</p>
              <p className="text-[11px] text-slate-500">Desenvolvedor E+</p>
           </div>
        </div>
      </div>
    </aside>
  )
}




