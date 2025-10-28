# ProSymph Deployment Commands

## 🚀 Quick Deploy (Both Platforms)

### **Step 1: Deploy API to Render.com (5 minutes)**

#### Option A: One-Click Deploy (Easiest)
1. Go to https://render.com/deploy
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `SaiAbhijyan/Prosymph`
4. Render will auto-detect `render.yaml` and configure everything
5. Click "Create Web Service"
6. Wait 2-3 minutes → Copy your API URL (e.g., `https://prosymph-api.onrender.com`)

#### Option B: Manual Configuration
```bash
# 1. Go to https://dashboard.render.com
# 2. New → Web Service
# 3. Connect GitHub: SaiAbhijyan/Prosymph
# 4. Fill in:
Name: prosymph-api
Branch: main
Root Directory: (leave blank)
Build Command: pnpm install && pnpm run build
Start Command: pnpm start

# 5. Environment Variables:
PORT=10000
NODE_ENV=production
BEHAVIOR_LITE=true
CORS_REGEX=\.vercel\.app$|\.netlify\.app$
ORCH_API_KEY=(Generate a random key)
CORS_ORIGINS=(Add after deploying web app)

# 6. Click "Create Web Service"
```

**Your API will be at:** `https://prosymph-api.onrender.com`

---

### **Step 2: Deploy Web App to Vercel (2 minutes)**

#### Before Deploying:
Update the default API URL in your web app:

```bash
# Edit apps/web-static/app.js line 13:
# Change from:
apiEl.value = localStorage.getItem("api") || urlParams.get("api") || "http://127.0.0.1:3000";

# To (use your Render API URL):
apiEl.value = localStorage.getItem("api") || urlParams.get("api") || "https://prosymph-api.onrender.com";
```

#### Deploy with Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy the web app
cd apps/web-static
vercel --prod

# Vercel will ask:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? prosymph-web
# - Directory? ./ (current directory)
# - Override settings? N

# Your app will be at: https://prosymph-web.vercel.app (or custom domain)
```

#### Alternative: Vercel Dashboard (No CLI)
1. Go to https://vercel.com/new
2. Import Git Repository → Select `SaiAbhijyan/Prosymph`
3. Configure:
   - Framework Preset: Other
   - Root Directory: `apps/web-static`
   - Build Command: (leave empty - static files)
   - Output Directory: (leave empty - uses current dir)
4. Click "Deploy"

**Your web app will be at:** `https://prosymph-web.vercel.app`

---

### **Step 3: Connect API and Web App**

#### Update CORS on Render:
1. Go to Render dashboard → prosymph-api → Environment
2. Add/Update `CORS_ORIGINS`:
```
https://prosymph-web.vercel.app,https://prosymph-web-git-main-yourname.vercel.app
```
3. Save → Render will auto-redeploy

#### Update Web App Default API (if not done in Step 2):
```bash
# Edit apps/web-static/app.js
# Commit and push
git add apps/web-static/app.js
git commit -m "Update production API URL"
git push origin main

# Vercel will auto-redeploy
```

---

## 🧪 Test Production Deployment

### **Test API:**
```bash
# Health check
curl https://prosymph-api.onrender.com/healthz
# → {"status":"ok"}

# Version
curl https://prosymph-api.onrender.com/version
# → {"name":"prompt-orchestrator-mono"}

# Rewrite (with API key if set)
curl -X POST https://prosymph-api.onrender.com/rewrite?format=text \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_KEY" \
  -d '{"raw_prompt":"build a todo app","target":"cursor"}'
```

### **Test Web App:**
```
https://prosymph-web.vercel.app
```
1. Open in browser
2. API URL should be pre-filled with your Render URL
3. Enter a prompt → Select tool → Click Rewrite
4. Should return formatted output

---

## 🔐 Security (Production)

### **Generate Strong API Key:**
```powershell
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### **Update Render Environment:**
1. Dashboard → prosymph-api → Environment
2. Set `ORCH_API_KEY` to your generated key
3. Save (triggers redeploy)

### **Update Web App & Extensions:**
```javascript
// apps/web-static/app.js - Add API key field (already done!)
// Users can enter their API key in the UI

// chrome-ext/popup.js - Add API key support (future)
// apps/vscode-ext/src/extension.ts - Add API key prompt (future)
```

---

## 📊 Deployment Checklist

### Before Deploying:
- [x] Code on GitHub ✅
- [x] Tests passing locally ✅
- [x] Build successful ✅
- [x] render.yaml configured ✅
- [x] vercel.json configured ✅

### After Deploying:
- [ ] Test API health endpoint
- [ ] Test web app loads
- [ ] Test full rewrite flow (web → API → response)
- [ ] Update Chrome extension manifest with production URL
- [ ] Update VS Code extension with production URL option
- [ ] Test CORS from web app
- [ ] Monitor Render logs for errors

---

## 🎯 Platform Comparison

| Platform | API | Web App | Cost | Deploy Time |
|----------|-----|---------|------|-------------|
| **Render** | ✅ Perfect | ❌ | Free tier | 2-3 min |
| **Vercel** | ⚠️ Serverless only | ✅ Perfect | Free tier | 30 sec |
| **Railway** | ✅ Good | ✅ Good | $5/mo after trial | 1-2 min |
| **Fly.io** | ✅ Good | ✅ Good | Free tier | 2-3 min |
| **Netlify** | ❌ Functions only | ✅ Perfect | Free tier | 30 sec |

**Recommended:**
- **API:** Render.com (free, persistent, easy)
- **Web:** Vercel (fastest, CDN, preview deploys)

---

## 🔄 Auto-Deploy on Git Push

### **Vercel:**
✅ Already enabled! Every `git push origin main` triggers a new deployment.

### **Render:**
✅ Already enabled! Watches your `main` branch for changes.

**Workflow:**
```bash
# Make changes
git add .
git commit -m "feat: new feature"
git push origin main

# Render redeploys API automatically (2-3 min)
# Vercel redeploys web automatically (30 sec)
```

---

## 🎊 You're Done!

After following these steps, you'll have:
- ✅ API at `https://prosymph-api.onrender.com`
- ✅ Web at `https://prosymph-web.vercel.app`
- ✅ Auto-deploy on every git push
- ✅ CORS properly configured
- ✅ API key security (optional)
- ✅ Behavior Lite enabled (task intelligence)

**ProSymph will be live for the world to use!** 🌍

