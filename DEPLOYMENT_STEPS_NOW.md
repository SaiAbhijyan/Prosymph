# 🚀 Deploy ProSymph RIGHT NOW (Step-by-Step)

## ✅ Prerequisites Complete
- [x] Code on GitHub: https://github.com/SaiAbhijyan/Prosymph
- [x] All tests passing
- [x] Deployment configs ready (render.yaml, vercel.json)

---

## 📍 **STEP 1: Deploy API to Render.com (5 minutes)**

### **1.1. Sign Up / Login**
Go to: **https://dashboard.render.com/register**
- Sign up with GitHub (easiest)
- Authorize Render to access your repositories

### **1.2. Create Web Service**
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Find your repository: **SaiAbhijyan/Prosymph**
4. Click **"Connect"**

### **1.3. Configure Service**
Render will auto-detect your `render.yaml`. Verify these settings:

```
Name: prosymph-api
Branch: main
Root Directory: (leave blank)
Runtime: Node
Build Command: pnpm install && pnpm run build
Start Command: pnpm start
```

### **1.4. Set Environment Variables**
Click "Advanced" → Add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `BEHAVIOR_LITE` | `true` |
| `CORS_REGEX` | `\.vercel\.app$\|\.netlify\.app$` |
| `ORCH_API_KEY` | Generate: `openssl rand -hex 32` or leave empty for now |

### **1.5. Create Service**
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. **Copy your API URL** (e.g., `https://prosymph-api.onrender.com`)

### **1.6. Test Your API**
```bash
# PowerShell
Invoke-WebRequest -UseBasicParsing https://prosymph-api.onrender.com/healthz
# Should return: {"status":"ok"}
```

**✅ API is now live!**

---

## 📍 **STEP 2: Deploy Web App to Vercel (2 minutes)**

### **2.1. Update API URL in Code**

**YOU MUST DO THIS FIRST:**

```bash
# In your local project, edit: apps/web-static/app.js
# Find line 13 and replace with your Render API URL:
```

```javascript
apiEl.value = localStorage.getItem("api") || urlParams.get("api") || "https://prosymph-api.onrender.com";
```

**Commit and push:**
```bash
git add apps/web-static/app.js
git commit -m "config: Set production API URL"
git push origin main
```

### **2.2. Sign Up / Login to Vercel**
Go to: **https://vercel.com/signup**
- Sign up with GitHub
- Authorize Vercel

### **2.3. Import Project**
1. Click **"Add New..."** → **"Project"**
2. Import Git Repository → Find **SaiAbhijyan/Prosymph**
3. Click **"Import"**

### **2.4. Configure Build**
```
Framework Preset: Other
Root Directory: apps/web-static
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: (leave empty)
```

### **2.5. Deploy**
1. Click **"Deploy"**
2. Wait ~30 seconds
3. **Copy your web app URL** (e.g., `https://prosymph-web.vercel.app`)

### **2.6. Update CORS on Render**
1. Go back to Render dashboard → prosymph-api → Environment
2. Update `CORS_ORIGINS`:
```
https://prosymph-web.vercel.app
```
3. Save (Render auto-redeploys)

**✅ Web app is now live!**

---

## 📍 **STEP 3: Test Everything (2 minutes)**

### **Test Production Web App:**
1. Open: `https://prosymph-web.vercel.app`
2. API URL should show your Render URL
3. Enter prompt: "build a todo app with React"
4. Select target: "cursor"
5. Click "Rewrite"
6. Should see formatted output with sections
7. Click "Copy" button
8. ✅ **SUCCESS!**

### **Test All Task Types:**
Try these prompts to verify Behavior Lite:

**DS&A:**
```
amazon sde2 interview coding round optimize for time complexity
```
Expected: "Senior SWE mentor + competitive programming coach"

**Web Full-Stack:**
```
create Next.js page with API route and Prisma database
```
Expected: "Senior Full-Stack Engineer + Tech Lead"

**Data Science:**
```
pandas data loader with sklearn model metrics
```
Expected: "Senior Data Scientist + MLE"

**DevOps:**
```
terraform and kubernetes with GitHub Actions CI
```
Expected: "DevOps/SRE Engineer"

---

## 🎯 **YOU ARE LIVE!**

### **Your URLs:**
- 🌐 **Web App:** `https://prosymph-web.vercel.app`
- 🔌 **API:** `https://prosymph-api.onrender.com`
- 📦 **GitHub:** `https://github.com/SaiAbhijyan/Prosymph`

### **Share These:**
```
🎉 Check out ProSymph - AI Prompt Orchestrator!

Transform any idea into expert prompts for Cursor, ChatGPT, Claude, Copilot & more.

✨ Features:
• 6 AI tools supported
• Task intelligence (DS&A, Web, Data Science, DevOps)
• Context engineering
• Verbalized sampling

🌐 Try it: https://prosymph-web.vercel.app
📖 GitHub: https://github.com/SaiAbhijyan/Prosymph
```

---

## 🔜 **What's Next**

### **This Week:**
1. Share ProSymph on Twitter/LinkedIn
2. Add icons and publish extensions
3. Monitor Render logs for usage
4. Collect user feedback

### **Future Enhancements:**
1. Add more task types (MOBILE, API_DESIGN)
2. LLM-based classification (vs keyword matching)
3. User accounts & saved prompts
4. Analytics dashboard
5. API rate limiting

---

## 📞 **If Something Goes Wrong:**

### **API won't start:**
- Check Render logs: Dashboard → prosymph-api → Logs
- Verify build succeeded
- Check environment variables

### **Web app can't reach API:**
- Check CORS_ORIGINS includes your Vercel URL
- Verify API URL in app.js is correct
- Check browser console for errors

### **Need Help:**
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- Or open an issue on your GitHub repo

---

## 🎊 Congratulations!

**You've deployed a production-ready, multi-tool AI prompt orchestrator!**

From zero to deployed in one session. Amazing work! 🚀

