"use client"

import { ArrowRight, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ComingSoonPanelProps {
  title: string
  accent: string
  lines: [string, string]
}

export function ComingSoonPanel({ title, accent, lines }: ComingSoonPanelProps) {
  return (
    <div className="h-full overflow-y-auto bg-background p-4 font-sans md:p-6">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(250,68,26,0.10),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.12),_transparent_30%)]" />
          <div className="relative">
            <Badge variant="outline" className="border-orange-200 bg-orange-50 px-3 py-1 text-orange-700">
              <Clock3 className="mr-1 size-3" /> Em breve - Fase 2
            </Badge>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#03254D] md:text-5xl">
              Nexus <span className={accent}>{title}</span>
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{lines[0]}</p>
            <p className="mt-2 max-w-3xl text-lg leading-8 text-slate-600">{lines[1]}</p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              Roadmap ativo para o próximo sprint <ArrowRight className="size-4 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}