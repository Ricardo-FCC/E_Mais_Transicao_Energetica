"use client"
import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { IpnMap } from "@/components/IpnMap"
import { SimulatorPanel } from "@/components/SimulatorPanel"
import { MarketplacePanel } from "@/components/MarketplacePanel"
import { MatchingPanel } from "@/components/MatchingPanel"
import { SettingsPanel } from "@/components/SettingsPanel"
import { DatabasePanel } from "@/components/DatabasePanel"
import { CopilotPanel } from "@/components/CopilotPanel"

export default function Home() {
  const [activeTab, setActiveTab] = useState("map")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getHeaderTitle = () => {
    switch(activeTab) {
      case "map": return "Inteligência Territorial (IPN)"
      case "database": return "Base de Periódicos"
      case "copilot": return "Assistente Virtual"
      case "sim": return "Simulador Prospectivo (Nexus Sim)"
      case "market": return "PID · Nexus Market"
      case "match": return "Nexus Match"
      case "settings": return "Configurações"
      default: return "Nexus"
    }
  }

  return (
    <div className="flex h-screen bg-[#ffffff] text-[#03254D] font-sans overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#03254D]/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} />
      </div>
      
      <main className="flex-1 flex flex-col relative bg-[#f8fafc] w-full min-w-0">
        <header className="h-20 border-b border-slate-100 flex items-center px-4 md:px-8 bg-white z-10 shadow-sm shrink-0 gap-4">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-[#03254D]" 
            onClick={() => setIsSidebarOpen(true)}
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-1"><img src="/pid-logo-full.png" alt="PID Logo" className="h-12 w-auto object-contain" /><div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div><span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] hidden md:block">Nexus Platform</span></div><h1 className="text-lg md:text-2xl font-black text-[#03254D] tracking-tight uppercase truncate">
              {getHeaderTitle()}
            </h1>
          </div>
        </header>
        
        <div className="flex-1 relative overflow-hidden">
          {activeTab === "map" && <IpnMap />}
          {activeTab === "database" && <DatabasePanel />}
          {activeTab === "copilot" && <CopilotPanel />}
          {activeTab === "sim" && <SimulatorPanel />}
          {activeTab === "market" && <MarketplacePanel />}
          {activeTab === "match" && <MatchingPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>
    </div>
  )
}



