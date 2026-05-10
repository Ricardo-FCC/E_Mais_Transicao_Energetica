import os

login_page = """"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
            PID · Nexus
          </h1>
          <p className="text-muted-foreground text-sm font-medium">O cérebro da descarbonização brasileira</p>
        </div>

        <Card className="bg-[#121212]/80 border-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl tracking-tight text-white">Entrar no Sistema</CardTitle>
            <CardDescription className="text-zinc-500">Acesse o mapa de inteligência territorial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="pl-10 bg-black/40 border-white/5 text-white placeholder:text-zinc-700 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-black/40 border-white/5 text-white placeholder:text-zinc-700 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold h-11 transition-all duration-300">
                Acessar Plataforma <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-[11px] text-zinc-600">
              Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
            </p>
          </CardFooter>
        </Card>
        
        <p className="text-center mt-8 text-sm text-zinc-500">
          Não tem uma conta? <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">Solicitar acesso</span>
        </p>
      </div>
    </div>
  )
}
"""

admin_page = """"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldAlert, Fingerprint, Lock, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState("")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[150px]" />
      
      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 shadow-2xl shadow-cyan-500/10">
            <ShieldAlert className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-[0.2em] uppercase">
            Nexus <span className="text-cyan-400">Gov</span>
          </h1>
          <p className="text-cyan-500/50 text-[10px] font-mono tracking-widest uppercase">Acesso Restrito · Nível 5</p>
        </div>

        <Card className="bg-[#0a0a0a] border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <CardHeader className="border-b border-white/5 space-y-1 pb-6">
            <CardTitle className="text-xl text-center flex items-center justify-center gap-2 text-white">
              <Fingerprint className="w-5 h-5 text-cyan-400" /> Autenticação Segura
            </CardTitle>
            <CardDescription className="text-center text-[11px] font-mono text-cyan-700 uppercase">SYS_ADMIN_LOGIN_SEQUENCE_INITIATED</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-cyan-800 tracking-wider">Identificação Governamental</label>
                  <Input 
                    type="text" 
                    placeholder="ID-USER-ADMIN" 
                    className="bg-black border-cyan-900/50 text-cyan-100 focus:border-cyan-400 transition-colors placeholder:text-cyan-950 h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-cyan-800 tracking-wider">Token de Acesso (Hardware)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-cyan-900" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-black border-cyan-900/50 text-cyan-100 focus:border-cyan-400 transition-colors placeholder:text-cyan-950 h-11"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 font-bold h-11 transition-all duration-300 group">
                Verificar Credenciais <Activity className="ml-2 w-4 h-4 group-hover:animate-pulse" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-cyan-950/10 border-t border-white/5 py-3">
            <p className="text-[10px] text-center w-full text-cyan-900 font-mono uppercase">
              IP LOGGED: 187.65.XX.XX · ENC_AES_256
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 flex justify-center gap-6 text-[10px] font-mono text-cyan-900 uppercase tracking-widest">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Recuperar ID</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Suporte Técnico</span>
        </div>
      </div>
    </div>
  )
}
"""

os.makedirs("src/app/login", exist_ok=True)
os.makedirs("src/app/admin/login", exist_ok=True)

with open("src/app/login/page.tsx", "w", encoding="utf-8") as f:
    f.write(login_page)

with open("src/app/admin/login/page.tsx", "w", encoding="utf-8") as f:
    f.write(admin_page)

print("Login and Admin Login pages created successfully.")
