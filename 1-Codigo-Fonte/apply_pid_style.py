import os

# 1. Update globals.css with PID Colors
with open("src/app/globals.css", "r", encoding="utf-8") as f:
    css = f.read()

pid_vars = """
  --pid-orange: #E84E1B;
  --pid-navy: #01213F;
  --pid-navy-light: #023666;
"""

# Insert PID vars into :root and .dark
css = css.replace(":root {", ":root {\\n" + pid_vars)
css = css.replace(".dark {", ".dark {\\n" + pid_vars)

with open("src/app/globals.css", "w", encoding="utf-8") as f:
    f.write(css)

# 2. Update layout.tsx with Montserrat
with open("src/app/layout.tsx", "r", encoding="utf-8") as f:
    layout = f.read()

layout = layout.replace('import { Space_Grotesk, JetBrains_Mono } from "next/font/google";', 'import { Space_Grotesk, JetBrains_Mono, Montserrat } from "next/font/google";')
layout = layout.replace('const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });', 'const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });\\nconst montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });')
layout = layout.replace('${spaceGrotesk.variable} ${jetBrainsMono.variable}', '${spaceGrotesk.variable} ${jetBrainsMono.variable} ${montserrat.variable}')

with open("src/app/layout.tsx", "w", encoding="utf-8") as f:
    f.write(layout)

# 3. Update Sidebar Logo area
with open("src/components/Sidebar.tsx", "r", encoding="utf-8") as f:
    sidebar = f.read()

# Create a more "PID" style logo
pid_logo = """
      <div className="mb-8 px-2">
        <div className="bg-[#01213F] rounded-full p-1 pr-4 flex items-center gap-3 border border-white/10 shadow-lg group cursor-pointer overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E84E1B] to-[#b1340d] flex items-center justify-center shrink-0 shadow-inner">
            <div className="text-white font-black text-xs tracking-tighter">PID</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-black text-white leading-none tracking-tighter uppercase italic">Nexus</span>
            <span className="text-[8px] text-orange-500 font-bold uppercase tracking-widest leading-none mt-1">E+ Energia</span>
          </div>
        </div>
      </div>
"""

# Replace the old logo area
# Find the start of the logo area and replace it
# In Sidebar.tsx it was:
# <div className="mb-8 flex items-center gap-2 px-2">
#   <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
#     <Zap className="w-5 h-5 text-black" />
#   </div>
#   <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
#     PID · Nexus
#   </h1>
# </div>

import re
sidebar = re.sub(r'<div className="mb-8 flex items-center gap-2 px-2">.*?</h1>\\s*</div>', pid_logo, sidebar, flags=re.DOTALL)

# Add Montserrat to sidebar labels
sidebar = sidebar.replace('font-medium', 'font-montserrat font-semibold')

with open("src/components/Sidebar.tsx", "w", encoding="utf-8") as f:
    f.write(sidebar)

print("PID Visual Identity integrated successfully.")
