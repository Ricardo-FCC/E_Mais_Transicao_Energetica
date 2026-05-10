"use client"
import { type ReactNode, useEffect, useMemo, useState } from "react"
import { BarChart3, Bot, CircleHelp, Send, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { demoProfileById, getDemoRegionById, type DemoProfileId, type DemoRegion } from "@/lib/demo-data"

type Message = { id: number; role: "user" | "bot"; text: ReactNode }

interface CopilotChatProps {
  profileId: DemoProfileId
  selectedRegion: DemoRegion | null
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function createWelcomeMessage(profileLabel: string): Message {
  return {
    id: 1,
    role: "bot",
    text: `Olá! Sou o Nexus Copiloto. Perfil ativo: ${profileLabel}. Posso resumir o IPN regional, sugerir polos prioritários e traduzir o output do Nexus Sim em linguagem de banca.`,
  }
}

export function CopilotChat({ profileId, selectedRegion }: CopilotChatProps) {
  const selectedProfile = demoProfileById[profileId]
  const fallbackRegion = getDemoRegionById("ceara-pecem")
  const [messages, setMessages] = useState<Message[]>(() => [createWelcomeMessage(selectedProfile.label)])
  const [inputValue, setInputValue] = useState("")

  const activeRegion = selectedRegion ?? fallbackRegion
  const displayRegion = selectedRegion
  const quickPrompts = selectedProfile.promptExamples

  useEffect(() => {
    setMessages([createWelcomeMessage(selectedProfile.label)])
  }, [selectedProfile.label])

  const promptMap = useMemo(
    () => [
      {
        label: quickPrompts[0],
        matches: ["h2", "hidrogenio", "investir", "investimento verde"],
        reply: (
          <div className="space-y-2">
            <p>Com base no IPN mockado da demo, estes são os polos com melhor leitura para investimento verde imediato:</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li><strong className="text-[#03254D]">Hub Pecém (CE)</strong> - IPN 94, porto/ZPE e demanda industrial já ancorada.</li>
              <li><strong className="text-[#03254D]">Parnaíba (PI)</strong> - IPN 88, excelente fator eólico-solar e terra competitiva.</li>
              <li><strong className="text-[#03254D]">Suape (PE)</strong> - IPN 82, mercado comprador relevante para amônia verde.</li>
            </ol>
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              Dica de demo: clique em Pecém no mapa para abrir os KPIs que sustentam essa priorização.
            </p>
          </div>
        ),
      },
      {
        label: "Qual o IPN do Hub Pecém?",
        matches: ["ipn", normalize(activeRegion?.shortName ?? ""), "pecem", "parnaiba"],
        reply: activeRegion ? (
          <div className="space-y-2">
            <p><strong className="text-[#03254D]">{activeRegion.name}</strong> está com IPN <strong className="text-orange-600">{activeRegion.ipn}</strong> e prontidão <strong className="text-[#03254D]">{activeRegion.readiness}</strong>.</p>
            <p>{activeRegion.profileViews[profileId].summary}</p>
            <ul className="space-y-1 text-sm text-slate-700">
              {activeRegion.profileViews[profileId].kpis.map((kpi) => (
                <li key={kpi.label}>
                  <strong>{kpi.label}:</strong> {kpi.value} - {kpi.caption}
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      },
      {
        label: "Se eu investir R$ 80 bi até 2038, qual output esperar?",
        matches: ["80", "output", "sim", "horizonte", "2038"],
        reply: (
          <div className="space-y-2">
            <p>No cenário demo de <strong className="text-[#03254D]">R$ 80 bi até 2038</strong>, o Nexus Sim projeta:</p>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Output anual:</strong> ~184 kt equivalentes ao final do horizonte.</li>
              <li><strong>CO2 evitado:</strong> ~77 Mt acumulados no período.</li>
              <li><strong>Mensagem para banca:</strong> o efeito escala com investimento e prazo, e melhora ainda mais quando o território selecionado já tem IPN elevado.</li>
            </ul>
          </div>
        ),
      },
      {
        label: "Qual região acelera empregos verdes?",
        matches: ["emprego", "empregos", "regiao", "gestor publico"],
        reply: (
          <div className="space-y-2">
            <p>Para política pública, o melhor caso da demo continua sendo <strong className="text-[#03254D]">Pecém</strong>.</p>
            <p>Ele concentra infraestrutura existente, reduz o tempo de licenciamento coordenado e abre uma carteira estimada de 23 mil empregos até 2035.</p>
          </div>
        ),
      },
      {
        label: "Quais dados sustentam o IPN?",
        matches: ["dados", "evidencia", "pesquisa", "sustentam"],
        reply: (
          <div className="space-y-2">
            <p>O IPN desta demo cruza quatro blocos de evidência: infraestrutura, recurso energético, demanda industrial e maturidade regulatória.</p>
            <p>Para a banca, vale explicar que a nota não é só potencial físico: ela mede quão pronto o território está para sair do mapa e virar projeto.</p>
          </div>
        ),
      },
    ],
    [activeRegion, profileId, quickPrompts],
  )

  const resolveReply = (question: string) => {
    const normalizedQuestion = normalize(question)
    const matchedPrompt = promptMap.find((prompt) =>
      prompt.matches.some((matcher) => normalizedQuestion.includes(matcher)),
    )

    return matchedPrompt?.reply ?? (
      <div className="space-y-2">
        <p>Consigo responder melhor com os prompts preparados para a demo.</p>
        <p className="text-sm text-slate-600">Tente uma destas perguntas: {quickPrompts.join(" | ")}</p>
      </div>
    )
  }

  const submitQuestion = (question: string) => {
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion) {
      return
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text: trimmedQuestion },
    ])
    setInputValue("")

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "bot", text: resolveReply(trimmedQuestion) },
      ])
    }, 450)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitQuestion(inputValue)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="h-16 border-b border-border/40 flex items-center px-4 gap-3 bg-muted/20">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <Bot className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">Nexus Copiloto</h2>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Online e pronto</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-3 text-xs text-cyan-800">
          <div className="flex items-start gap-2">
            <CircleHelp className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-[0.14em]">Como usar na banca</p>
              <p>Digite uma pergunta ou toque em um exemplo abaixo. {displayRegion ? `Contexto atual: ${displayRegion.shortName}, IPN ${displayRegion.ipn}.` : "Nenhuma região selecionada ainda; clique no mapa para contextualizar o chat."}</p>
            </div>
          </div>
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted/50 border border-border/50 rounded-tl-sm text-foreground"}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/10 border-t border-border/40">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
          <BarChart3 className="size-3.5 text-cyan-500" />
          Perguntas exemplo prontas para demo
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickPrompts.map((prompt) => (
            <button key={prompt} onClick={() => submitQuestion(prompt)} className="text-xs bg-card border border-border/50 hover:bg-muted px-2 py-1.5 rounded-md transition-colors flex items-center gap-1 text-left">
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" /> {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={`Ex.: ${quickPrompts.slice(0, 2).join(" | ")}`}
            className="pr-10 bg-card"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1 h-7 w-7 text-muted-foreground" disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}