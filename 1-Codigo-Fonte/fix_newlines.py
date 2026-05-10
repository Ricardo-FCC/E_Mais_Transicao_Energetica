import os

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Replace literal \n string with actual newline
    content = content.replace('\\n', '\n')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('src/app/page.tsx')
fix_file('src/components/Sidebar.tsx')
print('Fixed files')
