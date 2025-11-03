# 🚀 GITHUB PAGES - GUIA PARA PUBLICAR

## ✅ Seu projeto está pronto!

Seus arquivos estão commitados localmente e prontos para ir ao GitHub Pages.

---

## 📋 PASSO A PASSO para publicar:

### **PASSO 1: Configure suas credenciais do GitHub**

```bash
# No terminal, faça login no GitHub CLI:
gh auth login

# Escolha as opções:
# - What is your preferred protocol for Git operations? → HTTPS
# - Authenticate Git with your GitHub credentials? → Y
# - How would you like to authenticate GitHub CLI? → Login with a web browser
```

### **PASSO 2: Depois de fazer login, execute:**

```bash
cd /Users/cleoliveira/Desktop/street66

# Faça push
git push -u origin main
```

---

## 🎯 Ativando GitHub Pages (depois que fizer push):

1. Vá para: **github.com/oliveiracle/nightclub-website-template**
2. Clique em **Settings**
3. Na barra esquerda, clique em **Pages**
4. Em "Source", selecione **Deploy from a branch**
5. Choose branch: **main**
6. Choose folder: **/ (root)**
7. Clique em **Save**

⏳ **Aguarde 1-2 minutos...**

Seu site estará em: **https://oliveiracle.github.io/nightclub-website-template**

---

## 🔐 Alternativa: Usar Personal Access Token

Se `gh auth login` não funcionar:

1. Acesse: https://github.com/settings/tokens
2. Clique em **Generate new token (classic)**
3. Dê um nome: `github-pages`
4. Selecione: `repo` e `workflow`
5. Clique em **Generate token**
6. Copie o token

Depois execute:

```bash
cd /Users/cleoliveira/Desktop/street66

git remote set-url origin https://SEU_TOKEN@github.com/oliveiracle/nightclub-website-template.git

git push -u origin main
```

---

## ✨ Seu post no LinkedIn pode ser:

```
🚀 In Development: Street 66 Bar - Complete Website

Building a fully responsive website for Street 66 Bar in Dublin!

✨ Live Demo: https://oliveiracle.github.io/nightclub-website-template

Features:
• Interactive photo gallery with carousel + lightbox
• Events page with dynamic cards
• Contact form + Google Maps
• 100% responsive design
• Vintage Andy Warhol aesthetic

🛠️ Tech: HTML5 | CSS3 | Vanilla JavaScript

🔗 GitHub: github.com/oliveiracle/nightclub-website-template

Feedback welcome! 👇

#WebDevelopment #Frontend #ResponsiveDesign #GitHub
```

---

## 📱 Seu site já está:

✅ Funcional  
✅ Responsivo  
✅ Com galeria de 18 fotos  
✅ Com 16 fotos de pets  
✅ Com página de eventos  
✅ Com formulário de contato  
✅ Com Google Maps integrado

**Tudo pronto! Só falta fazer o push! 🎉**

---

## ❓ Dúvidas?

Se `gh auth login` não funcionar, me avisa que eu configuro manualmente com token!
