# ProSymph — Quick Deploy Guide

## 🚀 Deploy in 10 Minutes

### **Step 1: Deploy API (Render.com - FREE)**

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready"
git push origin main

# 2. Go to render.com → New Web Service
# 3. Connect your GitHub repo
# 4. Configure:
Build Command:     pnpm install && pnpm run build
Start Command:     pnpm start
Environment Variables:
  PORT=10000
  ORCH_API_KEY=your-secret-key-123
  CORS_REGEX=\\.vercel\\.app$|\\.netlify\\.app$

# 5. Deploy → Copy URL (e.g., https://prosymph.onrender.com)
```

---

### **Step 2: Deploy Web App (Vercel - FREE)**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Update default API URL in apps/web-static/app.js:
apiEl.value = localStorage.getItem("api") || "https://prosymph.onrender.com";

# 3. Deploy
cd apps/web-static
vercel --prod

# 4. Your web app is live! (e.g., https://prosymph.vercel.app)
```

---

### **Step 3: Update Extensions (5 min each)**

#### **VS Code Extension:**
```bash
# 1. Add icon: apps/vscode-ext/images/icon-128.png
# 2. Update package.json:
"publisher": "your-publisher-id",
"repository": { "url": "https://github.com/yourusername/prosymph" }

# 3. Package & publish
cd apps/vscode-ext
npm install -g @vscode/vsce
vsce package
vsce publish
```

#### **Chrome Extension:**
```bash
# 1. Add icons to chrome-ext/icons/ (16x16, 48x48, 128x128)
# 2. Update manifest.json:
"host_permissions": ["https://prosymph.onrender.com/*"]

# 3. Zip and upload
# Create chrome-ext.zip with all files
# Upload to chrome.google.com/webstore/devconsole
```

---

## 🧪 Verify Deployment

**API Health:**
```bash
curl https://prosymph.onrender.com/healthz
# → {"status":"ok"}
```

**Web App:**
```
https://prosymph.vercel.app
```

**Extensions:**
- VS Code: Search "Prompt Orchestrator" in marketplace
- Chrome: Search "Prompt Orchestrator" in web store

---

## 🔑 Environment Variables

### **Development (.env)**
```env
PORT=3000
ORCH_API_KEY=
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### **Production (Render/Railway)**
```env
PORT=10000
ORCH_API_KEY=strong-random-key-here
CORS_ORIGINS=https://your-web-app.vercel.app,https://your-web-app.netlify.app
CORS_REGEX=\\.vercel\\.app$|\\.netlify\\.app$|\\.onrender\\.com$
```

---

## 🎯 What's Live After Deploy

1. **API**: `https://prosymph.onrender.com`
   - `/healthz` - Health check
   - `/version` - Version info
   - `/rewrite` - JSON response
   - `/rewrite?format=text` - Plain-text response

2. **Web App**: `https://prosymph.vercel.app`
   - UI for all 6 AI tools
   - API URL/key configurable
   - Copy-ready output

3. **VS Code Extension**
   - Ctrl+Shift+P → "Prompt Orchestrator: Rewrite Prompt"
   - Available in VS Code Marketplace

4. **Chrome Extension**
   - Click icon → Enter prompt → Get results
   - Available in Chrome Web Store

---

## 🎉 You're Live!

After these steps, ProSymph will be:
- ✅ Publicly accessible web app
- ✅ Scalable API on Render/Railway
- ✅ Published extensions (VS Code + Chrome)
- ✅ CI/CD on every PR/push

**Total time:** ~10-15 minutes per platform (excluding approval wait times)

