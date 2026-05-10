# 2. Fluxograma do Projeto

`mermaid
graph TD
    A[Usuário Acessa Nexus] --> B{Menu Lateral}
    B -->|Mapa| C[Exploração Geoespacial]
    B -->|Base de Dados| D[Pesquisa de Artigos/Bases]
    B -->|Copilot| E[Assistente de IA]
    C --> C1[Troca de BaseMap]
    C --> C2[Visualização de Ativos]
    D --> D1[Filtros de Fonte]
    D --> D2[Link Externo Oficial]
    E --> E1[Análise de Dados]
`
"@

 = @"
# 2.3 Wireframe da Solução

A estrutura visual segue o padrão **Bento-Grid** com navegação lateral fixa:

1. **Sidebar (Esquerda):** Navegação persistente com Logo PID e links para módulos.
2. **Header (Topo):** Título do módulo atual e perfil do usuário.
3. **Área Central (Main Content):**
   - **Módulo Mapa:** Full-screen canvas com toolbar flutuante para controles GIS.
   - **Módulo Database:** Layout de duas colunas (Filtros e Lista de Resultados).
   - **Módulo Copilot:** Interface de chat moderna com histórico e ações rápidas.
