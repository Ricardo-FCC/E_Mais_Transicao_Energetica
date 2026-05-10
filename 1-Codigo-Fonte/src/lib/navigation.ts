import {
  Bot,
  Database,
  Handshake,
  LayoutDashboard,
  Map,
  Settings,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"

export const APP_TABS = ["map", "database", "copilot", "sim", "market", "match", "settings"] as const

export type AppTabId = (typeof APP_TABS)[number]

export interface AppNavItem {
  id: AppTabId
  label: string
  title: string
  icon: LucideIcon
}

export const appNavItems: AppNavItem[] = [
  { id: "map", label: "Mapa IPN", title: "Inteligência Territorial (IPN)", icon: Map },
  { id: "database", label: "Base de Dados", title: "Base de Periódicos", icon: Database },
  { id: "copilot", label: "Copiloto IA", title: "Assistente Virtual", icon: Bot },
  { id: "sim", label: "Nexus Sim", title: "Simulador Prospectivo (Nexus Sim)", icon: LayoutDashboard },
  { id: "market", label: "Nexus Market", title: "PID · Nexus Market", icon: ShoppingCart },
  { id: "match", label: "Nexus Match", title: "Nexus Match", icon: Handshake },
  { id: "settings", label: "Configurações", title: "Configurações", icon: Settings },
]

const appTabTitleMap: Record<AppTabId, string> = Object.fromEntries(
  appNavItems.map(({ id, title }) => [id, title]),
) as Record<AppTabId, string>

export function getTabTitle(tab: string) {
  return appTabTitleMap[tab as AppTabId] ?? "Nexus"
}