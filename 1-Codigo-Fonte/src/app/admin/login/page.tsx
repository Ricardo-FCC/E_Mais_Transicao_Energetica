"use client"
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
