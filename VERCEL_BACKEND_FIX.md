# 🔧 Fix: "Cannot GET /" Error on Vercel

## Problem
You're seeing "Cannot GET /" which means Vercel isn't serving your Angular frontend properly.

## Solution

I've updated your `vercel.json` configuration. Here's what was fixed:

### ✅ What I Did

1. **Created `vercel.json`** with proper Angular build configuration
2. **Added `vercel-build` script** to `package.json`
3. **Configured rewrites** to route:
   - `/api/*` → Serverless functions (auto-detected)
   - `/*` → `index.html` (Angular SPA)

### 📁 Updated Files

**vercel.json:**
```json
{
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "dist/portfolio",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**package.json:**
Added script:
```json
"vercel-build": "npm install && ng build --configuration production"
```

---

## 🚀 Deploy Fix

### Step 1: Push Changes

```bash
git add .
git commit -m "Fix Vercel backend - configure Angular build and routing"
git push
```

### Step 2: Vercel Settings

1. Go to your Vercel project dashboard
2. Click **Settings** → **Build & Development Settings**
3. Make sure:
   - **Build Command:** `npm run vercel-build` (or leave empty if using vercel.json)
   - **Output Directory:** `dist/portfolio`
   - **Install Command:** `npm install` (or leave default)

### Step 3: Redeploy

1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Click **Redeploy**

Or push a new commit to trigger auto-deploy.

---

## ✅ Expected Behavior

After fix:
- ✅ Root URL (`https://your-project.vercel.app/`) → Shows Angular app
- ✅ `/api/health` → Returns health check
- ✅ `/api/contact` → Contact form endpoint
- ✅ `/api/contacts` → Get contacts endpoint

---

## 🔍 Troubleshooting

### Still Getting "Cannot GET /"?

1. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Latest → Logs
   - Look for Angular build errors
   - Ensure `ng build` completes successfully

2. **Verify Build Output:**
   - Check if `dist/portfolio` folder exists after build
   - Verify `dist/portfolio/index.html` exists

3. **Check Vercel Settings:**
   - Settings → Build & Development Settings
   - Framework Preset: Should be "Other" or empty
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/portfolio`

4. **Test Build Locally:**
   ```bash
   npm run vercel-build
   ```
   - Should create `dist/portfolio` folder
   - Should contain `index.html` and built Angular files

### Build Errors?

**Common Issues:**
- **Angular CLI not found:** Add `@angular/cli` to devDependencies
- **TypeScript errors:** Check `tsconfig.json`
- **Missing dependencies:** Run `npm install` first

---

## 📝 Manual Fix in Vercel Dashboard

If auto-detection doesn't work:

1. **Vercel Dashboard** → Your Project → **Settings**
2. **Build & Development Settings**
3. Configure:
   - **Framework Preset:** Leave empty or select "Other"
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `dist/portfolio`
   - **Install Command:** `npm install`
4. **Save** and **Redeploy**

---

## 🎯 What This Fixes

- ✅ Angular app builds during deployment
- ✅ Angular app serves at root URL
- ✅ API routes work at `/api/*`
- ✅ All routes redirect to `index.html` (SPA routing)
- ✅ No more "Cannot GET /" error

---

## 📚 File Structure

```
Portfolio_Soc/
├── api/              # Serverless functions (auto-detected)
│   ├── health.js
│   ├── contact.js
│   └── contacts.js
├── src/              # Angular source
├── dist/portfolio/   # Angular build output (created during build)
├── vercel.json       # Vercel configuration
└── package.json      # With vercel-build script
```

---

After deploying with these changes, your portfolio should work correctly!

**Test these URLs:**
- `https://your-project.vercel.app/` → Should show your portfolio
- `https://your-project.vercel.app/api/health` → Should return JSON

