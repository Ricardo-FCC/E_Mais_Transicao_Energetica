export type DemoProfileId = "investor" | "public-manager" | "researcher"

export interface DemoKpi {
  label: string
  value: string
  caption: string
}

export interface DemoPersona {
  name: string
  title: string
  initials: string
}

export interface DemoProfile {
  id: DemoProfileId
  label: string
  description: string
  persona: DemoPersona
  heroKpis: DemoKpi[]
  promptExamples: string[]
}

export interface DemoRegionView {
  headline: string
  summary: string
  kpis: DemoKpi[]
}

export interface DemoRegion {
  id: string
  name: string
  shortName: string
  ipn: number
  readiness: string
  description: string
  dominantVectors: string[]
  center: [number, number]
  polygon: [number, number][]
  profileViews: Record<DemoProfileId, DemoRegionView>
}

export const demoProfiles: DemoProfile[] = [
  {
    id: "investor",
    label: "Investidor",
    description: "Prioriza retorno, velocidade de implantação e sinais de demanda ancorada.",
    persona: {
      name: "Wênia Figueiredo",
      title: "Climate Ventures LatAm",
      initials: "WF",
    },
    heroKpis: [
      { label: "Pipeline pronto", value: "R$ 12,4 bi", caption: "ativos com diligência inicial concluída" },
      { label: "IRR alvo", value: "18,6%", caption: "cenários premium em H2V e biometano" },
      { label: "Time-to-market", value: "26 meses", caption: "média dos polos com IPN alto" },
    ],
    promptExamples: [
      "Onde investir em H2 Verde?",
      "Qual o IPN do Hub Pecém?",
      "Se eu investir R$ 80 bi até 2038, qual output esperar?",
    ],
  },
  {
    id: "public-manager",
    label: "Gestor Público",
    description: "Prioriza geração de emprego, arrecadação, licenciamento e impacto territorial.",
    persona: {
      name: "Wênia Figueiredo",
      title: "Secretaria de Desenvolvimento Verde",
      initials: "WF",
    },
    heroKpis: [
      { label: "Empregos potenciais", value: "+18,2 mil", caption: "estimativa em polos priorizados" },
      { label: "Arrecadação local", value: "R$ 430 mi/ano", caption: "cenário base com exportação verde" },
      { label: "CO₂ abatido", value: "7,1 Mt/ano", caption: "efeito combinado dos projetos elegíveis" },
    ],
    promptExamples: [
      "Qual região acelera empregos verdes?",
      "Qual o IPN do Hub Pecém?",
      "Se eu investir R$ 80 bi até 2038, qual output esperar?",
    ],
  },
  {
    id: "researcher",
    label: "Pesquisador",
    description: "Prioriza disponibilidade de dados, maturidade tecnológica e lacunas de evidência.",
    persona: {
      name: "Wênia Figueiredo",
      title: "Núcleo de Transição Energética",
      initials: "WF",
    },
    heroKpis: [
      { label: "Datasets integrados", value: "27", caption: "infraestrutura, clima, demanda e solo" },
      { label: "Projetos rastreados", value: "48", caption: "portfólio observado na amostra demo" },
      { label: "Gaps críticos", value: "4", caption: "variáveis com baixa cobertura territorial" },
    ],
    promptExamples: [
      "Quais dados sustentam o IPN?",
      "Qual o IPN do Hub Pecém?",
      "Se eu investir R$ 80 bi até 2038, qual output esperar?",
    ],
  },
]

export const demoProfileById = Object.fromEntries(
  demoProfiles.map((profile) => [profile.id, profile]),
) as Record<DemoProfileId, DemoProfile>

export const demoRegions: DemoRegion[] = [
  {
    id: "ceara-pecem",
    name: "Hub Pecém / Ceará",
    shortName: "Pecém",
    ipn: 94,
    readiness: "Muito alta",
    description: "Área demo com infraestrutura portuária, ZPE, rede industrial e alto alinhamento para H2V.",
    dominantVectors: ["H2 Verde", "Eólica offshore", "Amônia verde"],
    center: [-3.55, -38.8],
    polygon: [
      [-4.45, -40.55],
      [-3.15, -40.3],
      [-2.85, -38.45],
      [-3.4, -37.15],
      [-4.65, -37.7],
      [-4.95, -39.5],
    ],
    profileViews: {
      investor: {
        headline: "Tese líder em exportação verde",
        summary: "Pecém combina demanda industrial, infraestrutura de escoamento e offtakers avançados.",
        kpis: [
          { label: "Payback estimado", value: "7,2 anos", caption: "mix H2V + derivativos" },
          { label: "Capex readiness", value: "88%", caption: "infraestrutura crítica mapeada" },
          { label: "Offtake em negoc.", value: "3 LOIs", caption: "amônia e combustíveis verdes" },
        ],
      },
      "public-manager": {
        headline: "Polo com maior capacidade de indução pública",
        summary: "O território sustenta escala industrial e ganho relevante de emprego qualificado.",
        kpis: [
          { label: "Empregos 2035", value: "23 mil", caption: "obra, O&M e cadeia local" },
          { label: "Receita anual", value: "R$ 620 mi", caption: "efeito fiscal estimado" },
          { label: "Licenciamento", value: "14 meses", caption: "cenários com rito coordenado" },
        ],
      },
      researcher: {
        headline: "Sandbox territorial bem instrumentado",
        summary: "Boa disponibilidade de dados para validar custos, demanda e emissão evitada.",
        kpis: [
          { label: "Datasets locais", value: "16", caption: "energia, porto, clima e uso do solo" },
          { label: "TRL dominante", value: "7-8", caption: "pilotos e planta pre-comercial" },
          { label: "Lacunas", value: "2", caption: "água industrial e curva de demanda" },
        ],
      },
    },
  },
  {
    id: "piaui-parnaiba",
    name: "Corredor Parnaíba / Piauí",
    shortName: "Parnaíba",
    ipn: 88,
    readiness: "Alta",
    description: "Área demo com excelente recurso eólico, expansão solar e disponibilidade territorial.",
    dominantVectors: ["Eólica", "Solar", "Combustíveis sintéticos"],
    center: [-2.92, -41.78],
    polygon: [
      [-4.05, -42.55],
      [-2.55, -42.2],
      [-2.3, -40.95],
      [-3.2, -40.6],
      [-4.15, -41.45],
    ],
    profileViews: {
      investor: {
        headline: "Território com upside em renováveis exportadoras",
        summary: "Parnaíba oferece terra competitiva e forte fator de capacidade para energia firme.",
        kpis: [
          { label: "IRR projetada", value: "16,9%", caption: "projetos greenfield maduros" },
          { label: "Capacidade firme", value: "68%", caption: "combinação eólica-solar" },
          { label: "Ramp-up", value: "30 meses", caption: "infraestrutura adicional necessária" },
        ],
      },
      "public-manager": {
        headline: "Oportunidade de interiorização verde",
        summary: "Potencial elevado para atrair investimento com foco em emprego e conexão regional.",
        kpis: [
          { label: "Empregos 2035", value: "14 mil", caption: "cenário com cluster industrial" },
          { label: "Renda regional", value: "+R$ 280 mi", caption: "efeito anual estimado" },
          { label: "Expansão de rede", value: "2 lotes", caption: "prioridades de transmissão" },
        ],
      },
      researcher: {
        headline: "Caso robusto para modelagem comparativa",
        summary: "Ideal para analisar complementaridade renovável e restrições de infraestrutura.",
        kpis: [
          { label: "Séries climáticas", value: "12 anos", caption: "vento e irradiação" },
          { label: "Casos benchmark", value: "9", caption: "comparação internacional" },
          { label: "Gaps", value: "3", caption: "água, porto e demanda local" },
        ],
      },
    },
  },
]

export function getDemoRegionById(regionId: string | null | undefined) {
  return demoRegions.find((region) => region.id === regionId) ?? null
}