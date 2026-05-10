import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, Filter, BookOpen, Download, ExternalLink, CheckCircle2, ChevronDown, Database } from "lucide-react"

const mockResults = [
  {
    id: 1,
    base: "IBGE",
    title: "BDiA - Banco de Informações Ambientais",
    authors: "Instituto Brasileiro de Geografia e Estatística",
    year: 2024,
    type: "Base de Dados",
    abstract: "Reúne a coleção de bases temáticas de recursos naturais do território nacional, ajustadas à escala 1:250.000. Abrange Geologia, Geomorfologia, Pedologia e Vegetação no âmbito do projeto de Mapeamento de Recursos Naturais.",
    openAccess: true,
    peerReviewed: true,
    url: "https://bdiaweb.ibge.gov.br/#/home"
  },
  {
    id: 2,
    base: "MapBiomas",
    title: "Plataforma MapBiomas Brasil",
    authors: "Rede MapBiomas",
    year: 2024,
    type: "Série Temporal / Mapas",
    abstract: "Rede global e multi-institucional que monitora as transformações na cobertura e no uso da terra. Fornece a mais atualizada e detalhada base de dados espaciais de uso da terra e seus impactos nos territórios.",
    openAccess: true,
    peerReviewed: true,
    url: "https://brasil.mapbiomas.org/"
  },
  {
    id: 3,
    base: "INPE",
    title: "Terrabrasilis",
    authors: "Instituto Nacional de Pesquisas Espaciais",
    year: 2024,
    type: "Monitoramento Geográfico",
    abstract: "Acesso, consulta e análise de dados geográficos gerados pelos projetos PRODES e DETER. Monitoramento da vegetação nativa para subsidiar formulação de políticas públicas.",
    openAccess: true,
    peerReviewed: true,
    url: "https://terrabrasilis.dpi.inpe.br/"
  },
  {
    id: 4,
    base: "IBGE",
    title: "PEVS - Produção da Extração Vegetal e da Silvicultura",
    authors: "Instituto Brasileiro de Geografia e Estatística",
    year: 2024,
    type: "Estatística Econômica",
    abstract: "Principal fonte de estatísticas sobre exploração de recursos florestais. Investiga quantidade e valor da produção de recursos vegetais nativos e maciços florestais plantados por município.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9105-producao-da-extracao-vegetal-e-da-silvicultura.html"
  },
  {
    id: 5,
    base: "IBGE",
    title: "PAM - Produção Agrícola Municipal",
    authors: "Instituto Brasileiro de Geografia e Estatística",
    year: 2024,
    type: "Estatística Agrícola",
    abstract: "Investiga anualmente os principais produtos das lavouras temporárias e permanentes. Relevância econômica e social, abrangendo componentes da cesta básica brasileira.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9117-producao-agricola-municipal-culturas-temporarias-e-permanentes.html"
  },
  {
    id: 6,
    base: "IBGE",
    title: "SIDRA - Sistema de Recuperação Automática",
    authors: "Instituto Brasileiro de Geografia e Estatística",
    year: 2024,
    type: "Plataforma de Dados",
    abstract: "Plataforma online para extrair dados estatísticos oficiais do Brasil. Reúne pesquisas econômicas, demográficas e sociais com recortes geográficos personalizados.",
    openAccess: true,
    peerReviewed: true,
    url: "https://sidra.ibge.gov.br/"
  },
  {
    id: 7,
    base: "Conab",
    title: "Portal de Informações Agropecuárias",
    authors: "Companhia Nacional de Abastecimento",
    year: 2024,
    type: "Dashboard / BI",
    abstract: "Plataforma com dados e análises sobre o setor agropecuário brasileiro. Inclui dashboards interativos (Produtos 360) e acesso direto às bases de dados.",
    openAccess: true,
    peerReviewed: true,
    url: "https://portaldeinformacoes.conab.gov.br/produtos-360.html"
  },
  {
    id: 8,
    base: "IBÁ",
    title: "Indústria Brasileira de Árvores",
    authors: "Associação IBÁ",
    year: 2023,
    type: "Relatórios Setoriais",
    abstract: "Dados sobre o setor de florestas plantadas no Brasil: produção, área plantada, consumo e indicadores econômicos disponíveis para download.",
    openAccess: true,
    peerReviewed: true,
    url: "https://iba.org/publicacoes/"
  },
  {
    id: 9,
    base: "IBGE",
    title: "Atlas Nacional Digital do Brasil",
    authors: "Instituto Brasileiro de Geografia e Estatística",
    year: 2024,
    type: "Atlas Interativo",
    abstract: "Integra dados estatísticos, ambientais e socioeconômicos em representações cartográficas. Permite explorar temas como população, economia e infraestrutura de forma dinâmica.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.ibge.gov.br/apps/atlas_nacional/#/home"
  },
  {
    id: 10,
    base: "EPE",
    title: "Webmap Interativo do Sistema Energético",
    authors: "Empresa de Pesquisa Energética",
    year: 2024,
    type: "GIS / Mapa",
    abstract: "Visualização geoespacial do setor energético brasileiro. Localização de usinas, linhas de transmissão, subestações e recursos energéticos com camadas interativas.",
    openAccess: true,
    peerReviewed: true,
    url: "https://gisepeprd2.epe.gov.br/WebMapEPE/"
  },
  {
    id: 11,
    base: "EPE",
    title: "BEN - Balanço Energético Nacional",
    authors: "Empresa de Pesquisa Energética",
    year: 2024,
    type: "Publicação Estatística",
    abstract: "Consolida dados sobre oferta, consumo, produção, importação e exportação de energia. Fundamental para analisar a estrutura da matriz energética brasileira.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-bem"
  },
  {
    id: 12,
    base: "ANP",
    title: "Painel Dinâmico de Produtores de Etanol",
    authors: "Agência Nacional do Petróleo",
    year: 2024,
    type: "Dashboard BI",
    abstract: "Informações sobre unidades produtoras de etanol: localização, capacidade, matéria-prima e situação operacional das usinas sucroenergéticas.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/paineis-dinamicos-da-anp/paineis-e-mapa-dinamicos-de-produtores-de-combustiveis-e-derivados/painel-dinamico-de-produtores-de-etanol"
  },
  {
    id: 13,
    base: "ANP",
    title: "Painel Dinâmico de Produtores de Biodiesel",
    authors: "Agência Nacional do Petróleo",
    year: 2024,
    type: "Dashboard BI",
    abstract: "Dados atualizados sobre unidades produtoras de biodiesel: capacidade autorizada, matéria-prima utilizada e situação operacional das usinas no Brasil.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/paineis-dinamicos-da-anp/paineis-e-mapa-dinamicos-de-produtores-de-combustiveis-e-derivados/painel-dinamico-de-produtores-de-biodiesel"
  },
  {
    id: 14,
    base: "ANP",
    title: "Painel Dinâmico de Produtores de Biometano",
    authors: "Agência Nacional do Petróleo",
    year: 2024,
    type: "Dashboard BI",
    abstract: "Acompanhamento das unidades de biometano: localização, capacidade de produção e origem do biogás. Inclui bases de dados para extração direta.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/paineis-dinamicos-da-anp/paineis-e-mapa-dinamicos-de-produtores-de-combustiveis-e-derivados/painel-dinamico-de-produtores-of-biometano"
  },
  {
    id: 15,
    base: "ANEEL",
    title: "SIGA - Sistema de Informações de Geração",
    authors: "Agência Nacional de Energia Elétrica",
    year: 2024,
    type: "Plataforma Interativa",
    abstract: "Dados atualizados sobre o parque gerador brasileiro em operação e planejamento. Capacidade instalada, fonte de geração e situação dos empreendimentos elétricos.",
    openAccess: true,
    peerReviewed: true,
    url: "https://app.powerbi.com/view?r=eyJrIjoiNjc4OGYyYjQtYWM2ZC00YjllLWJlYmEtYzdkNTQ1MTc1NjM2IiwidCI6IjQwZDZmOWI4LWVjYTctNDZhMi05MmQ0LWVhNGU5YzAxNzBlMSIsImMiOjR9"
  },
  {
    id: 16,
    base: "Sebrae",
    title: "Observatório Setorial Territorial",
    authors: "Serviço Brasileiro de Apoio às Micro e Pequenas Empresas",
    year: 2024,
    type: "Inteligência de Mercado",
    abstract: "Reúne dados econômicos e territoriais. Dashboards interativos para explorar informações por setor de atividade e recorte geográfico brasileiro.",
    openAccess: true,
    peerReviewed: true,
    url: "https://observatorio.sebrae.com.br/"
  },
  {
    id: 17,
    base: "OCF",
    title: "Observatório do Código Florestal",
    authors: "Observatório do Código Florestal",
    year: 2024,
    type: "Monitoramento Socioambiental",
    abstract: "Dados e indicadores sobre a implementação da Lei de Proteção da Vegetação Nativa (Código Florestal) no Brasil, com dashboards e bases abertas.",
    openAccess: true,
    peerReviewed: true,
    url: "https://observatorioflorestal.org.br/"
  },
  {
    id: 18,
    base: "Aço Brasil",
    title: "Estatísticas Setoriais - Instituto Aço Brasil",
    authors: "Instituto Aço Brasil",
    year: 2023,
    type: "Estatística Industrial",
    abstract: "Consolidação de dados sobre produção, consumo aparente e capacidade instalada do setor siderúrgico nacional.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.acobrasil.org.br/site/"
  },
  {
    id: 19,
    base: "World Bank",
    title: "World Bank Open Data",
    authors: "The World Bank Group",
    year: 2024,
    type: "Base Global",
    abstract: "Acesso livre a dados globais sobre economia, desenvolvimento humano, indicadores sociais e ambientais de todos os países membros.",
    openAccess: true,
    peerReviewed: true,
    url: "https://data.worldbank.org/"
  },
  {
    id: 20,
    base: "IRENA",
    title: "Renewable Energy Data & Statistics",
    authors: "International Renewable Energy Agency",
    year: 2024,
    type: "Estatística Internacional",
    abstract: "Capacidade instalada, geração, custos e investimentos em energias renováveis globais. Ferramentas de comparação internacional da transição energética.",
    openAccess: true,
    peerReviewed: true,
    url: "https://www.irena.org/Data"
  },
  {
    id: 21,
    base: "World Steel",
    title: "World Steel Association Data",
    authors: "World Steel Association",
    year: 2023,
    type: "Base Global Indústria",
    abstract: "Dados globais sobre produção, consumo e comércio de aço. Séries históricas por país e tecnologia de produção.",
    openAccess: true,
    peerReviewed: true,
    url: "https://worldsteel.org/data/"
  }
]

export function DatabasePanel() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResults = mockResults.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    res.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.base.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full bg-slate-50 flex flex-col p-8 overflow-hidden font-sans">
      {/* Header Search */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-[#03254D] mb-2 flex items-center gap-2">
          <Database className="w-6 h-6 text-[#FA441A]" />
          Base de Conhecimento Nexus (Acervo Estratégico)
        </h2>
        <p className="text-sm text-slate-500 mb-6">Conexão direta com as principais fontes oficiais de dados ambientais, agronegócio e energia do Brasil e do mundo.</p>
        
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar em bases oficiais (ex: IBGE, MapBiomas, EPE, ANP)..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#03254D] focus:ring-1 focus:ring-[#03254D] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-8 py-4 bg-[#03254D] text-white rounded-lg font-bold hover:bg-[#043b7a] transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" /> Filtrar Bases
          </button>
        </div>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-64 shrink-0 overflow-y-auto pr-2 space-y-4 pb-10 custom-scrollbar">
          <div className="text-sm font-bold text-slate-700 mb-4">{filteredResults.length} fontes integradas</div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center cursor-pointer">
              <span className="text-xs font-bold text-[#03254D]">Categoria da Fonte</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-3 space-y-2">
              {["Governamental", "Internacional", "Setorial", "Monitoramento"].map(cat => (
                <label key={cat} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="text-[#03254D] rounded-sm" />
                    <span className="text-xs text-slate-600">{cat}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto pb-10 space-y-4 pr-4 custom-scrollbar">
          {filteredResults.map(res => (
            <div key={res.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#FA441A]/30 transition-all group shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{res.base}</span>
                <Badge variant="outline" className="text-[10px] text-[#4D4E03] border-[#BECCCC] bg-slate-50 h-5">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> FONTE OFICIAL
                </Badge>
                <Badge variant="outline" className="text-[10px] text-[#03254D] border-slate-200 bg-slate-50 h-5 uppercase">
                  {res.type}
                </Badge>
              </div>
              
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-bold text-[#03254D] hover:text-[#FA441A] transition-colors mb-2">
                {res.title}
              </a>
              
              <div className="flex relative mt-4">
                <div className="w-1.5 h-auto bg-gradient-to-b from-[#FA441A] via-[#03254D] to-[#4D4E03] rounded-l-sm mr-4" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  {res.abstract}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 italic">{res.authors}</span>
                <div className="flex items-center gap-4">
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#03254D] flex items-center gap-1.5 px-4 py-2 bg-slate-100 rounded-lg hover:bg-[#FA441A] hover:text-white transition-all">
                    Acessar Plataforma <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {filteredResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Database className="w-12 h-12 text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">Nenhuma base de dados encontrada para "{searchTerm}"</p>
              <button onClick={() => setSearchTerm("")} className="mt-4 text-[#03254D] font-bold hover:underline">Limpar busca</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
