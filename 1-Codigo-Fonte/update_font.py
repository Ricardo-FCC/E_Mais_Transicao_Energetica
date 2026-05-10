import os

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace('import { Geist, Geist_Mono } from "next/font/google";', 'import { Space_Grotesk, JetBrains_Mono } from "next/font/google";')
layout = layout.replace('const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });', 'const spaceGrotesk = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });')
layout = layout.replace('const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });', 'const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });')
layout = layout.replace('${geistSans.variable} ${geistMono.variable}', '${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans')

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('--font-mono: var(--font-geist-mono);', '--font-mono: var(--font-mono);')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Font updated to Space Grotesk")
