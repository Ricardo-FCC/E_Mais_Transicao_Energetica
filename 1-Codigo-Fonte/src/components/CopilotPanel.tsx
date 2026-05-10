import { CopilotChat } from "./CopilotChat"
import { Bot, Sparkles } from "lucide-react"

export function CopilotPanel() {
  return (
    <div className="h-full bg-slate-50 flex flex-col p-8 overflow-hidden font-sans">
      <div className="bg-[#01213F] p-8 rounded-xl shadow-lg mb-6 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Bot className="w-32 h-32 text-white" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-2 relative z-10">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Nexus AI Copilot
        </h2>
        <p className="text-slate-300 max-w-2xl relative z-10">
          Seu assistente inteligente dedicado à plataforma PID Nexus. Analise dados territoriais, encontre matches ideais no mercado de carbono e tire dúvidas técnicas sobre a transição energética.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <CopilotChat />
      </div>
    </div>
  )
}
