"use client"
import { User, Shield, Database, Bell, Cpu, Globe } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsPanel() {
  return (
    <div className="p-6 h-full overflow-y-auto space-y-6 bg-background font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Nexus <span className="text-orange-500">Settings</span></h2>
        <p className="text-muted-foreground">Gerencie as diretrizes da sua inteligência territorial e perfil institucional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111]/50 border-white/5 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" /> Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center py-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E84E1B] to-orange-400 flex items-center justify-center text-2xl font-black text-white mb-3">UD</div>
              <p className="font-bold text-white">User Demo Hackathon</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Acesso Nível 1</p>
            </div>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-xs h-9">Editar Perfil</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#111]/50 border-white/5 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" /> Parâmetros de Inteligência (IA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-white">Otimização Prospectiva</Label>
                <p className="text-xs text-muted-foreground italic">Permitir que a IA sugira novos pontos de interesse baseados em IPN.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-white">Alertas de Crédito de Carbono</Label>
                <p className="text-xs text-muted-foreground italic">Notificar quando ativos de alta integridade (Nexus Market) estiverem disponíveis.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-white">Modo Matching Automático</Label>
                <p className="text-xs text-muted-foreground italic">Sugerir conexões proprietário-desenvolvedor sem intervenção manual.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111]/50 border-white/5 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-orange-500" /> Conectividade e Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Satélites (Inpe/GPM)", status: "Ativo", color: "text-emerald-400" },
                { name: "Land Registry (CAR)", status: "Ativo", color: "text-emerald-400" },
                { name: "Weather (Clymer)", status: "Ativo", color: "text-emerald-400" },
                { name: "Grid Ops (ONS)", status: "Sincronizando...", color: "text-orange-400" },
              ].map((src, i) => (
                <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-lg flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{src.name}</span>
                  <span className={`text-[11px] font-mono font-bold ${src.color}`}>{src.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" className="text-xs text-muted-foreground hover:text-white">Redefinir Padrões</Button>
        <Button className="bg-[#E84E1B] hover:bg-[#b1340d] text-white font-bold text-xs px-8">Salvar Alterações</Button>
      </div>
    </div>
  )
}
