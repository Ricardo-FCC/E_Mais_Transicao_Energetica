"use client"
import { useState } from "react"
import { UserRound } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"
import { IpnMap } from "@/components/IpnMap"
import { SimulatorPanel } from "@/components/SimulatorPanel"
import { MarketplacePanel } from "@/components/MarketplacePanel"
import { MatchingPanel } from "@/components/MatchingPanel"
import { SettingsPanel } from "@/components/SettingsPanel"
import { DatabasePanel } from "@/components/DatabasePanel"
import { CopilotPanel } from "@/components/CopilotPanel"
import { OnboardingProfileDialog } from "@/components/OnboardingProfileDialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getTabTitle, type AppTabId } from "@/lib/navigation"
import { demoProfileById, getDemoRegionById, type DemoProfileId } from "@/lib/demo-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState<AppTabId>("map")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true)
  const [selectedProfileId, setSelectedProfileId] = useState<DemoProfileId>("investor")
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)

  const selectedProfile = demoProfileById[selectedProfileId]
  const selectedRegion = getDemoRegionById(selectedRegionId)

  const handleTabChange = (tab: AppTabId) => {
    setActiveTab(tab)
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsSidebarOpen(false)
    }
  }

  const handleProfileSelect = (profileId: DemoProfileId) => {
    setSelectedProfileId(profileId)
    setIsOnboardingOpen(false)
    setActiveTab("map")
  }

  return (
    <>
      <div className="relative flex min-h-dvh max-w-full overflow-hidden bg-[#ffffff] font-sans text-[#03254D] md:h-dvh">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#03254D]/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <div className="hidden w-[280px] shrink-0 border-r border-slate-100 bg-white md:block">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} profileId={selectedProfileId} />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] max-w-[calc(100vw-1rem)] bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} profileId={selectedProfileId} />
      </div>
      
      <main className="relative flex min-w-0 flex-1 flex-col bg-[#f8fafc]">
        <header className="z-10 flex min-h-20 shrink-0 items-start gap-4 border-b border-slate-100 bg-white px-4 py-4 shadow-sm md:h-20 md:items-center md:px-8">
          <button 
            className="-ml-2 p-2 text-slate-500 hover:text-[#03254D] md:hidden" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir navegação"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex min-w-0 flex-wrap items-center gap-3"><img src="/pid-logo-full.png" alt="PID Logo" className="h-10 w-auto object-contain md:h-12" /><div className="mx-1 hidden h-8 w-px bg-slate-200 md:block"></div><span className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 md:block">Nexus Platform</span></div><h1 className="text-base font-black uppercase leading-tight tracking-tight text-[#03254D] md:text-2xl md:truncate">
              {getTabTitle(activeTab)}
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant="outline" className="border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700">
              <UserRound className="mr-1 size-3" />
              Perfil {selectedProfile.label}
            </Badge>
            <Button variant="outline" size="sm" className="border-slate-200 bg-white text-[#03254D]" onClick={() => setIsOnboardingOpen(true)}>
              Trocar perfil
            </Button>
          </div>
        </header>
        
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {activeTab === "map" && (
            <IpnMap
              profileId={selectedProfileId}
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
            />
          )}
          {activeTab === "database" && <DatabasePanel />}
          {activeTab === "copilot" && <CopilotPanel profileId={selectedProfileId} selectedRegion={selectedRegion} />}
          {activeTab === "sim" && <SimulatorPanel profileId={selectedProfileId} selectedRegion={selectedRegion} />}
          {activeTab === "market" && <MarketplacePanel />}
          {activeTab === "match" && <MatchingPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>
      </div>

      <OnboardingProfileDialog
        open={isOnboardingOpen}
        selectedProfileId={selectedProfileId}
        onSelectProfile={handleProfileSelect}
      />
    </>
  )
}



