# Deployment Guide — ProSymph Prompt Orchestrator

## ✅ Release Readiness Status

| Platform | Ready? | Status | Missing Items |
|----------|--------|--------|---------------|
| **VS Code Extension** | 95% | ✅ **READY TO PACKAGE** | Icon files only |
| **Chrome Extension** | 95% | ✅ **READY TO PACKAGE** | Icon files only |
| **Web Application** | 100% | ✅ **READY TO DEPLOY** | Nothing! |

---

## 🎯 **1. VS Code Extension Deployment**

### Current Status: ✅ **95% Complete**

**What's Ready:**
- ✅ Command palette integration
- ✅ TypeScript compiled (`dist/extension.js`)
- ✅ README.md, CHANGELOG.md
- ✅ .vscodeignore (excludes source files)
- ✅ Complete package.json metadata
- ✅ MIT license

**What's Missing:**
- ❌ **Icon file**: `apps/vscode-ext/images/icon-128.png` (128x128 PNG)

### Steps to Deploy:

#### Step 1: Add Icon
Create a 128x128 PNG icon and save it as:
```
apps/vscode-ext/images/icon-128.png
```

#### Step 2: Update Publisher ID
Edit `apps/vscode-ext/package.json`:
```json
"publisher": "your-actual-publisher-id"  // Get from marketplace.visualstudio.com
```

#### Step 3: Create Publisher Account
1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Create a publisher (choose a unique ID)

#### Step 4: Generate Personal Access Token (PAT)
1. Go to https://dev.azure.com
2. User Settings → Personal Access Tokens
3. Create new token with **Marketplace (Publish)** scope
4. Copy the token

#### Step 5: Package & Publish
```bash
cd apps/vscode-ext

# Install vsce (VS Code Extension CLI)
npm install -g @vscode/vsce

# Login with your PAT
vsce login yourPublisherId

# Package the extension
vsce package

# This creates: prompt-orchestrator-vscode-0.0.1.vsix

# Publish to marketplace
vsce publish
```

#### Step 6: Test Locally First
```bash
# Install the .vsix file in VS Code
code --install-extension prompt-orchestrator-vscode-0.0.1.vsix

# Test the command
# Ctrl+Shift+P → "Prompt Orchestrator: Rewrite Prompt"
```

### Can Cursor Help?
- ✅ **YES**: Generate icon, update metadata, create packaging scripts
- ❌ **NO**: Cannot create publisher account or publish (manual steps)

---

## 🎯 **2. Chrome Extension Deployment**

### Current Status: ✅ **95% Complete**

**What's Ready:**
- ✅ Manifest v3 with proper permissions
- ✅ Popup UI (HTML + JS)
- ✅ Error handling for offline API
- ✅ Privacy policy (PRIVACY.md)
- ✅ Plain-text rendering support

**What's Missing:**
- ❌ **Icon files**: 
  - `chrome-ext/icons/icon16.png` (16x16)
  - `chrome-ext/icons/icon48.png` (48x48)
  - `chrome-ext/icons/icon128.png` (128x128)

### Steps to Deploy:

#### Step 1: Add Icons
Create 3 PNG icons at:
```
chrome-ext/icons/icon16.png  (16x16)
chrome-ext/icons/icon48.png  (48x48)
chrome-ext/icons/icon128.png (128x128)
```

#### Step 2: Test Locally
```bash
# Open Chrome
chrome://extensions/

# Enable "Developer mode" (top-right toggle)

# Click "Load unpacked"
# Select: chrome-ext/ folder

# Test the extension
# Click extension icon → Enter prompt → Verify results
```

#### Step 3: Update Production URL
Edit `chrome-ext/manifest.json`:
```json
"host_permissions": [
  "https://your-deployed-api.com/*"  // Replace with your production API
]
```

#### Step 4: Prepare for Chrome Web Store
1. Create promotional images:
   - Small tile: 440x280 PNG
   - Large tile: 920x680 PNG (optional)
   - Screenshots: 1280x800 or 640x400 PNG (at least 1)

2. Update `chrome-ext/PRIVACY.md` with:
   - Your actual contact email
   - Your domain name

#### Step 5: Register & Upload
1. Go to https://chrome.google.com/webstore/devconsole
2. Pay $5 one-time developer fee
3. Click "New Item"
4. Upload `chrome-ext.zip` (zip the chrome-ext folder)
5. Fill in store listing:
   - Description
   - Category: Productivity
   - Language: English
   - Privacy policy (copy from PRIVACY.md)
   - Upload promotional images

6. Submit for review (1-3 days)

#### Step 6: Create Distribution Zip
```bash
# Create a clean zip (exclude .gitkeep)
cd chrome-ext
# Manually zip: manifest.json, popup.html, popup.js, icons/, PRIVACY.md
```

### Can Cursor Help?
- ✅ **YES**: Generate icons, screenshots, update manifest, create zip script
- ❌ **NO**: Cannot register developer account or submit (manual steps)

---

## 🎯 **3. Web Application Deployment**

### Current Status: ✅ **100% Complete - READY TO DEPLOY**

**What's Ready:**
- ✅ Static HTML/CSS/JS web app
- ✅ API integration with configurable URL
- ✅ API key support (optional)
- ✅ Target tool selector (6 tools)
- ✅ Plain-text rendering with copy button
- ✅ LocalStorage for settings persistence
- ✅ Error handling

**Access Now:**
```
http://localhost:5173
```

### Live Testing:

**Currently Running:**
- ✅ API: `http://localhost:3000`
- ✅ Web UI: `http://localhost:5173`

**Test it now:**
1. Open browser → `http://localhost:5173`
2. Enter a prompt: "Build a todo app"
3. Select target: "cursor"
4. Click "Rewrite"
5. Copy the generated prompt

### Deployment Options:

#### **Option A: Vercel (Recommended - Easiest)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy the web app
cd apps/web-static
vercel

# Deploy the API (separate deployment)
cd ../../
vercel --prod
```

**Vercel Setup:**
1. Create account at vercel.com
2. Connect your GitHub repo
3. Configure:
   - **Web App**: Root = `apps/web-static`, Framework = Other
   - **API**: Root = `.`, Build = `pnpm build`, Start = `pnpm dev`

#### **Option B: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy web app
cd apps/web-static
netlify deploy --prod

# For API, use Netlify Functions or deploy API separately
```

#### **Option C: Static Hosting (Web UI Only)**
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

**For API:**
- Railway.app
- Render.com
- Fly.io
- AWS EC2/ECS

#### **Option D: All-in-One (Render/Railway)**
Deploy both API + static files in one service:
```bash
# Render.com or Railway.app
# Add build command: pnpm install && pnpm build
# Add start command: pnpm dev
# Set static files path: apps/web-static
```

### Production Checklist:

1. **Environment Variables:**
   ```env
   PORT=3000
   ORCH_API_KEY=your-secret-key-here
   CORS_ORIGINS=https://your-web-app.vercel.app
   ```

2. **Update Web App:**
   Edit `apps/web-static/app.js`:
   ```javascript
   apiEl.value = localStorage.getItem("api") || "https://your-api.com";
   ```

3. **Update Chrome Extension:**
   Edit `chrome-ext/manifest.json`:
   ```json
   "host_permissions": ["https://your-api.com/*"]
   ```

### Can Cursor Help?
- ✅ **YES**: Create deployment configs, write deploy scripts, update URLs
- ✅ **YES**: Generate Docker files, CI/CD workflows
- ❌ **NO**: Cannot actually deploy (you need to run deploy commands or connect GitHub)

---

## 📦 **Quick Package Commands**

### VS Code Extension:
```bash
cd apps/vscode-ext
npm install -g @vscode/vsce
vsce package
# Creates: prompt-orchestrator-vscode-0.0.1.vsix
```

### Chrome Extension:
```bash
# Zip the chrome-ext folder (exclude .gitkeep)
cd chrome-ext
# Manually create chrome-ext.zip with all files
```

### Web App:
```bash
# Deploy to Vercel
cd apps/web-static
vercel --prod
```

---

## 🎨 **Icon Creation Resources**

**Free Icon Generators:**
- https://www.figma.com (design custom)
- https://realfavicongenerator.net (convert to all sizes)
- https://favicon.io (text-to-icon)

**Sizes Needed:**
- VS Code: 128x128 PNG
- Chrome: 16x16, 48x48, 128x128 PNG
- Web App: favicon.ico (optional)

**Design Tips:**
- Use a simple, recognizable symbol (e.g., ⚡️🔄🎯📝)
- Keep it readable at 16x16
- Use your brand colors

---

## 🚀 **Deployment Priority**

**Recommended Order:**
1. **Web App** (easiest) → Deploy to Vercel/Netlify **TODAY**
2. **Chrome Extension** → Test locally, submit to store (3-day review)
3. **VS Code Extension** → Test locally, publish to marketplace (instant)

**Why this order?**
- Web app has zero approval process (instant)
- Chrome review takes 1-3 days
- VS Code publishes instantly after first approval

---

## ⚡ **Next Steps (Right Now)**

### Immediate (5 minutes):
1. **Test web app**: Open `http://localhost:5173` in browser
2. **Generate icons**: Use favicon.io or Figma
3. **Add icons** to both extension folders

### Today (1 hour):
1. **Deploy web app** to Vercel (free)
2. **Deploy API** to Render/Railway (free tier)
3. **Update extension manifests** with production API URL

### This Week:
1. **Register Chrome Web Store** developer ($5)
2. **Register VS Code publisher** (free)
3. **Submit both extensions** for review

---

## 📞 **Support**

**If deployment fails:**
- Check CORS settings match your domains
- Verify API is accessible (not blocked by firewall)
- Test with `curl` or Postman first
- Check browser console for errors

**Cursor can help with:**
- Generating missing files
- Fixing build errors
- Writing deployment scripts
- Creating Docker configs
- Setting up CI/CD

**You must do manually:**
- Create accounts (publisher, web store, hosting)
- Run publish/deploy commands
- Submit for review
- Configure production secrets

