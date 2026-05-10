import os

# 1. Update MarketplacePanel
with open("src/components/MarketplacePanel.tsx", "r", encoding="utf-8") as f:
    mp = f.read()

mp = mp.replace("text-emerald-400", "text-[#E84E1B]")
mp = mp.replace("bg-emerald-600 hover:bg-emerald-500", "bg-[#E84E1B] hover:bg-[#b1340d]")
mp = mp.replace("Nexus Market", "PID · Nexus Market")

with open("src/components/MarketplacePanel.tsx", "w", encoding="utf-8") as f:
    f.write(mp)

# 2. Update LoginPage
with open("src/app/login/page.tsx", "r", encoding="utf-8") as f:
    lp = f.read()

lp = lp.replace("bg-gradient-to-br from-emerald-500 to-cyan-500", "bg-[#E84E1B]")
lp = lp.replace("from-emerald-400 to-cyan-400", "from-[#E84E1B] to-[#f59e0b]")
lp = lp.replace("bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500", "bg-[#E84E1B] hover:bg-[#b1340d]")
lp = lp.replace("text-emerald-400", "text-[#E84E1B]")

with open("src/app/login/page.tsx", "w", encoding="utf-8") as f:
    f.write(lp)

# 3. Update Page Header
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    pg = f.read()

pg = pg.replace("from-emerald-400 to-cyan-400", "from-[#E84E1B] to-cyan-400")
pg = pg.replace("bg-background/95", "bg-[#01213F]/95")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(pg)

print("Colors updated to match PID brand.")
