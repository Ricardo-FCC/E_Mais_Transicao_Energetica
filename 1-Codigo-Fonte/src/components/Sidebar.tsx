import { Leaf } from "lucide-react"
import { appNavItems, type AppTabId } from "@/lib/navigation"
import { demoProfileById, type DemoProfileId } from "@/lib/demo-data"

interface SidebarProps {
  activeTab: AppTabId
  setActiveTab: (tab: AppTabId) => void
  profileId: DemoProfileId
}

const sidebarOwner = {
  initials: "WF",
  name: "Wênia Figueiredo",
  title: "Equipe PID Nexus",
} as const

export function Sidebar({ activeTab, setActiveTab, profileId }: SidebarProps) {
  const persona = demoProfileById[profileId].persona

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-100 bg-[#ffffff] font-sans shadow-sm">
      <div className="h-20 flex items-center px-8 border-b border-slate-100">
        <div className="flex items-center gap-3"><div className="bg-[#FA441A] p-2 rounded-lg"><Leaf className="w-5 h-5 text-white" /></div><span className="text-xl font-black text-[#03254D] tracking-tighter">PID <span className="text-[#FA441A] font-light">&middot;</span> Nexus</span></div>
      </div>
      <nav className="flex-1 space-y-3 overflow-y-auto p-6" aria-label="Navegação principal">
        {appNavItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left font-bold transition-all duration-300 ${
                isActive 
                  ? "bg-slate-50 text-[#FA441A] shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#03254D]"
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-[#FA441A]" : "text-slate-400"}`} />
              <span className="min-w-0 flex-1 text-[13px] uppercase leading-tight tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </nav>
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-[#03254D] text-white flex items-center justify-center font-bold text-sm shadow-md">
            {sidebarOwner.initials}
           </div>
           <div className="text-left">
            <p className="text-[13px] font-bold text-[#03254D]">{sidebarOwner.name}</p>
            <p className="text-[11px] text-slate-500">{sidebarOwner.title}</p>
           </div>
        </div>
      </div>
    </aside>
  )
}




