"use client"
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
          <div className="w-16 h-16 rounded-2xl bg-[#E84E1B] flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E84E1B] to-[#f59e0b] bg-clip-text text-transparent tracking-tighter">
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
              <Button type="submit" className="w-full bg-[#E84E1B] hover:bg-[#b1340d] text-white font-bold h-11 transition-all duration-300">
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
          Não tem uma conta? <span className="text-[#E84E1B] font-semibold cursor-pointer hover:underline">Solicitar acesso</span>
        </p>
      </div>
    </div>
  )
}
