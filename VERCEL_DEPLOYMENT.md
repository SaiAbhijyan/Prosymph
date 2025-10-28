# Deploy Prosymph Web App to Vercel

## Quick Deployment Steps

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/new
- Sign in with GitHub

### 2. Import Your Repository
- Click "Import Git Repository"
- Select: `SaiAbhijyan/Prosymph`
- Click "Import"

### 3. Configure Project Settings
- **Project Name**: `prosymph-web` (or any name you prefer)
- **Root Directory**: `apps/web-static`
- **Framework Preset**: Other
- **Build Command**: `echo 'No build needed for static site'`
- **Output Directory**: `.`
- **Install Command**: `echo 'No install needed'`

### 4. Deploy
- Click "Deploy"
- Wait 2-3 minutes for deployment to complete

### 5. Get Your Web App URL
- After deployment, you'll get a URL like: `https://prosymph-web.vercel.app`
- Copy this URL

### 6. Update Render CORS (if needed)
The Render API already has CORS configured for Vercel domains, but if you get CORS errors:

1. Go to Render Dashboard → `prosymph-api` service
2. Go to Environment tab
3. Add/Update `CORS_ORIGINS`:
   - **Key**: `CORS_ORIGINS`
   - **Value**: `https://prosymph-web.vercel.app` (your actual Vercel URL)
4. Save changes (this will trigger a redeploy)

## Test Your Live Web App

1. Open your Vercel URL: `https://prosymph-web.vercel.app`
2. The API Base URL should already be set to: `https://prosymph.onrender.com`
3. Enter a prompt like: "build a todo app"
4. Select target: "cursor"
5. Click "Rewrite"
6. You should see a formatted prompt!

## Expected Results

✅ **Web App**: `https://prosymph-web.vercel.app`  
✅ **API**: `https://prosymph.onrender.com`  
✅ **Auto-connect**: Web app automatically uses production API  
✅ **CORS**: Already configured for Vercel domains  

## Troubleshooting

If you get "Failed to fetch":
1. Check that the API Base URL shows `https://prosymph.onrender.com`
2. If not, manually change it in the web app
3. Test the API directly: `https://prosymph.onrender.com/healthz`

## Next Steps

Once deployed, you can:
- Share the Vercel URL with users
- Deploy the Chrome extension (update host permissions)
- Deploy the VS Code extension
- Use the API directly in other applications
