"use client"

import { BriefcaseBusiness, Building2, FlaskConical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { demoProfiles, type DemoProfileId } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

const profileIcons = {
  investor: BriefcaseBusiness,
  "public-manager": Building2,
  researcher: FlaskConical,
} as const

interface OnboardingProfileDialogProps {
  open: boolean
  selectedProfileId: DemoProfileId
  onSelectProfile: (profileId: DemoProfileId) => void
}

export function OnboardingProfileDialog({
  open,
  selectedProfileId: _selectedProfileId,
  onSelectProfile,
}: OnboardingProfileDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden border border-slate-200 bg-white p-0 shadow-2xl sm:max-w-5xl lg:max-w-6xl" showCloseButton={false}>
        <div className="grid gap-0 lg:grid-cols-[1.05fr_1.4fr]">
          <div className="bg-[#03254D] px-6 py-7 text-white md:px-8 md:py-9">
            <DialogHeader className="gap-3">
              <DialogTitle className="text-3xl font-black tracking-tight text-white">
                Escolha o perfil de entrada
              </DialogTitle>
              <DialogDescription className="max-w-md text-sm leading-6 text-slate-200">
                O perfil selecionado redefine os KPIs visíveis no mapa IPN, ajusta o contexto do copiloto e deixa o fluxo principal pronto para a demonstração.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <p>Fluxo recomendado: entrar, escolher perfil, clicar em uma região destacada, consultar o copiloto e rodar o Nexus Sim.</p>
            </div>
          </div>

          <div className="bg-[#f8fafc] p-5 md:p-7">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {demoProfiles.map((profile) => {
                const Icon = profileIcons[profile.id]

                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => onSelectProfile(profile.id)}
                    className={cn(
                      "flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                    )}
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                        <Icon className="size-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-[#03254D]">{profile.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{profile.description}</p>

                    <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
                      {profile.heroKpis.map((kpi) => (
                        <div key={kpi.label}>
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{kpi.label}</p>
                          <p className="mt-1 text-lg font-black text-[#03254D]">{kpi.value}</p>
                          <p className="text-xs text-slate-500">{kpi.caption}</p>
                        </div>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}