# ProSymph — Prompt Orchestrator

**Multi-tool prompt rewriting engine with Context Engineering, Verbalized Sampling, and Self-Adapt loops.**

Transform any idea into senior-level, tool-specific prompts for **Cursor, ChatGPT, Claude, Copilot, Kiro, and Lovable**.

## ✨ Features

- **6 AI Tools Supported**: Cursor, ChatGPT, Claude (Code), Copilot, Kiro, Lovable
- **Context Engineering**: Auto-harvests repo structure, stack, linters, and examples
- **Verbalized Sampling (VS)**: Generates k=3 candidate prompt designs with probabilities
- **Self-Adapt (SEAL)**: Persists improvement rules to `skills/self-edits.json`
- **Multi-Interface**: API, Web App, VS Code Extension, Chrome Extension
- **Plain-Text Rendering**: Human-friendly output format
- **API Security**: Optional API key authentication
- **Acceptance Checks (CoVe)**: Validates security, correctness, style, performance, testability

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Terminal 1: Start the API server (port 3000)
pnpm dev

# Terminal 2: Start the web app (port 5173)
pnpm web:dev

# Open browser → http://localhost:5173
# Enter a prompt, select target tool, click Rewrite!
```

### Test the API Directly (PowerShell)

```powershell
$body = @{
  raw_prompt = "Build a todo app with React"
  target = "cursor"
  mode_flags = @{ vs = $true; k = 3; self_adapt = $true }
} | ConvertTo-Json

Invoke-WebRequest -Method Post -Uri http://localhost:3000/rewrite `
  -Body $body -ContentType "application/json" | 
  Select-Object -ExpandProperty Content
```

## 🏗️ Architecture

```
pnpm-workspace.yaml
apps/
  orchestrator/              # Fastify API (port 3000)
  web-static/                # Web UI (port 5173)
  vscode-ext/                # VS Code extension
  mcp-server/                # MCP tool (STDIO)
packages/
  core/                      # Rewrite engine + types + renderer
  context/                   # Repo harvesting (CTX v2)
  adapters/cursor/           # Cursor rules/commands/MCP
  eval/                      # Acceptance checks
chrome-ext/                  # Chrome extension
skills/
  self-edits.json            # Self-Adapt persistence
.cursor/
  rules/01-orchestrator.md   # Guardrails
  commands/orchestrate-prompt.md
  mcp.json                   # MCP tool config
```

## 📱 How to Use

### 1. **Web App** (Easiest)
```
http://localhost:5173
```
- Open in browser
- Enter your prompt
- Select target tool (Cursor, ChatGPT, etc.)
- Click Rewrite → Copy results

### 2. **VS Code Extension**
- Press `Ctrl/Cmd + Shift + P`
- Run: **"Prompt Orchestrator: Rewrite Prompt"**
- Select target tool → Enter prompt
- View JSON results in new document

### 3. **Chrome Extension**
- Click extension icon
- Enter prompt → Select tool → Click Rewrite
- Copy formatted output

### 4. **Direct API** (JavaScript/Python/cURL)

```javascript
const response = await fetch('http://localhost:3000/rewrite?format=text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    raw_prompt: "Build a user authentication system",
    target: "cursor",  // or chatgpt, claude-code, copilot, kiro, lovable
    mode_flags: { vs: true, k: 3, self_adapt: true }
  })
});
const result = await response.text();  // Plain text format
```

### 5. **Cursor MCP Tool**
```
Use the rewritePrompt tool to transform "Add pagination to users endpoint"
```

## Development

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Typecheck
pnpm typecheck

# Lint
pnpm lint
```

## Documentation

- [QUICKSTART.md](docs/QUICKSTART.md) - Getting started
- [CONTEXT_ENGINEERING.md](docs/CONTEXT_ENGINEERING.md) - How context harvesting works
- [VS_MODE.md](docs/VS_MODE.md) - Verbalized Sampling explained
- [SELF_ADAPT.md](docs/SELF_ADAPT.md) - Self-Adapt loop (SEAL)
- [ADAPTERS.md](docs/ADAPTERS.md) - Multi-tool adapter design

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guides:
- VS Code Extension → Marketplace
- Chrome Extension → Web Store
- Web App → Vercel/Netlify/etc.

### Current Status:
- ✅ **VS Code Extension**: 95% ready (needs icon)
- ✅ **Chrome Extension**: 95% ready (needs icons)
- ✅ **Web Application**: 100% ready to deploy

## 🎯 Release Checklist

### Before Publishing:

- [ ] Create icon files (128x128 for VS Code, 16/48/128 for Chrome)
- [ ] Update publisher IDs in package.json/manifest.json
- [ ] Add your GitHub repo URL
- [ ] Test all features locally
- [ ] Deploy API to production (Railway/Render)
- [ ] Update extension URLs to production API
- [ ] Create promotional images/screenshots
- [ ] Write privacy policy with your contact info

### VS Code Extension:
```bash
cd apps/vscode-ext
npm install -g @vscode/vsce
vsce package
vsce publish
```

### Chrome Extension:
1. Zip `chrome-ext/` folder
2. Upload to Chrome Web Store Developer Dashboard
3. Submit for review

### Web App:
```bash
cd apps/web-static
vercel --prod
# Or: netlify deploy --prod
```

## 📄 License

MIT



