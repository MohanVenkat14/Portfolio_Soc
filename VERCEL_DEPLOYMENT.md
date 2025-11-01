# Deploying to Vercel

This guide will help you deploy your MEAN Stack Portfolio to Vercel with MongoDB Atlas.

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)

## Step 1: Setup MongoDB Atlas (Cloud Database)

Since Vercel doesn't support local MongoDB, you need to use MongoDB Atlas.

### Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project (or use the default)
4. Click "Build a Database"
5. Choose **FREE** (M0) tier
6. Select a cloud provider and region (choose the closest to your users)
7. Click "Create Cluster"
8. Wait for the cluster to be created (takes 1-3 minutes)

### Configure Database Access

1. Click "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Atlas Admin" or "Read and write to any database"
6. Click "Add User"

### Configure Network Access

1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add `0.0.0.0/0`)
4. Click "Confirm"

### Get Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Save this string - you'll need it for Vercel!

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to https://vercel.com
3. Sign up / Login
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel will auto-detect the configuration

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts

### Configure Environment Variables

1. Go to your project on Vercel dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Click "Add New"
5. Add the following:

**Name:** `MONGODB_URI`  
**Value:** `mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

**Important:** Replace the connection string with your actual MongoDB Atlas URI!

6. Select environments (Production, Preview, Development) - select all three
7. Click "Save"
8. Redeploy your application

## Step 3: Update Frontend API URLs

After deploying your backend to Vercel, you need to update your Angular frontend to use the new API URL.

### Find Your Backend URL

Your backend will be deployed to something like:
```
https://your-project-name.vercel.app
```

### Update Angular Component

Open `src/app/app.component.ts` and update the API_URL variable:

**Find this line (around line 31):**
```typescript
private readonly API_URL = 'http://localhost:3000'; // Change to your Vercel URL in production
```

**Replace with your Vercel URL:**
```typescript
private readonly API_URL = 'https://your-project-name.vercel.app';
```

**Important:** Make sure to update this for production deployment!

### Deploy Frontend

You have two options:

**Option 1: Deploy Frontend to Vercel too**

1. Push your code
2. Vercel will auto-build the Angular app
3. Your full stack is on Vercel!

**Option 2: Deploy Frontend Separately**

Build the Angular app:
```bash
ng build --configuration production
```

Deploy the `dist/portfolio` folder to:
- Netlify
- Vercel (separate project)
- GitHub Pages
- Any static hosting

## Project Structure for Vercel

```
Portfolio_Soc/
├── api/
│   ├── package.json        # Backend dependencies
│   └── server.js          # Express server
├── src/                    # Angular frontend
├── vercel.json             # Vercel configuration
├── package.json            # Frontend dependencies
├── angular.json
└── tsconfig.json
```

## Testing Your Deployment

1. Check health endpoint:
   ```
   https://your-project-name.vercel.app/api/health
   ```
   Should return: `{"status": "Server is running"}`

2. Test contact form:
   - Submit a test message
   - Check MongoDB Atlas to verify data is saved

3. View all contacts:
   ```
   https://your-project-name.vercel.app/api/contacts
   ```

## Troubleshooting

### MongoDB Connection Error

**Problem:** "MongoDB connection error" in Vercel logs

**Solutions:**
1. Verify MongoDB Atlas network access allows all IPs
2. Check username/password in connection string
3. Ensure connection string is correct in Vercel environment variables
4. Wait a few minutes for cluster to fully provision

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:** The backend already has CORS enabled, but if issues persist:
- In `api/server.js`, update CORS settings:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:4200']
}));
```

### 404 Errors

**Problem:** Routes return 404

**Solutions:**
1. Check `vercel.json` configuration
2. Ensure `api/server.js` exists
3. Verify routes start with `/api/`

### Deployment Takes Too Long

**Solutions:**
1. Ensure `api/package.json` has correct dependencies
2. Check Vercel build logs
3. Make sure MongoDB Atlas cluster is running

## Environment Variables Summary

For Vercel, you need:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Cost

- **Vercel:** Free for hobby tier
- **MongoDB Atlas:** Free M0 tier (512MB storage)

Both are free for small to medium projects!

## Next Steps

1. ✅ Setup MongoDB Atlas
2. ✅ Deploy backend to Vercel
3. ✅ Configure environment variables
4. ✅ Update frontend API URLs
5. ✅ Deploy frontend
6. ✅ Test everything
7. ✅ Share your portfolio!

## Need Help?

Check Vercel logs:
1. Go to your project on Vercel
2. Click "Deployments"
3. Click on a deployment
4. Click "View Logs"

Common issues are logged here with helpful error messages.

## Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Express on Vercel: https://vercel.com/docs/concepts/functions/serverless-functions

Happy deploying! 🚀

