# Installation Guide - MEAN Stack Portfolio

## Quick Start (Windows)

### Option 1: Automated Setup (Recommended)

1. **Run setup script:**
   ```bash
   setup.bat
   ```

2. **Install Angular dependencies:**
   ```bash
   copy angular-package.json package.json
   npm install
   ```

3. **Start everything:**
   ```bash
   start.bat
   ```

This will start both the backend (port 3000) and frontend (port 4200).

## Manual Setup

### Prerequisites
- Node.js (v18 or higher) - [Download](https://nodejs.org/)
- MongoDB (v7 or higher) - [Download](https://www.mongodb.com/try/download/community)
- Angular CLI (install globally: `npm install -g @angular/cli`)

### Step 1: Install Backend Dependencies

```bash
npm install
```

This installs:
- Express.js
- Mongoose
- CORS
- body-parser
- dotenv

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env` file with your connection string

### Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

For MongoDB Atlas, use:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Step 4: Install Angular Dependencies

```bash
# Copy the angular package file
copy angular-package.json package.json

# Install dependencies
npm install

# This installs Angular 17 and all required dependencies
```

### Step 5: Start the Servers

**Terminal 1 - Backend:**
```bash
node server.js
```

**Terminal 2 - Frontend:**
```bash
ng serve
```

Or use the automated script:
```bash
start.bat
```

## Verify Installation

- Backend API: http://localhost:3000/api/health
- Frontend: http://localhost:4200

## Troubleshooting

### Port Already in Use
If port 3000 or 4200 is already in use:

**Backend (change in .env):**
```env
PORT=3001
```

**Frontend (change in terminal):**
```bash
ng serve --port 4201
```

### MongoDB Connection Issues

1. **Local MongoDB:**
   - Ensure MongoDB service is running
   - Check connection string in `.env`

2. **MongoDB Atlas:**
   - Verify network access (IP whitelist)
   - Check username and password
   - Ensure cluster is running

### Angular Not Found

Install Angular CLI globally:
```bash
npm install -g @angular/cli@17
```

## Project Structure

```
Portfolio_Soc/
├── server.js              # Express backend
├── package.json           # Backend dependencies
├── angular-package.json   # Angular dependencies
├── angular.json            # Angular config
├── tsconfig.json          # TypeScript config
├── start.bat              # Start both servers
├── setup.bat              # Setup script
├── README.md              # Project documentation
├── INSTALLATION.md        # This file
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    └── app/
        ├── app.component.ts
        ├── app.component.html
        └── app.component.css
```

## Next Steps

1. Customize your portfolio content in `src/app/app.component.html`
2. Update your social media links
3. Add your project repositories
4. Modify the color scheme in `src/styles.css`
5. Deploy to production (see README.md)

## Building for Production

### Backend:
```bash
node server.js
```

### Frontend:
```bash
ng build --configuration production
```

The built files will be in `dist/portfolio/`

Deploy to:
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Railway, Render, Heroku

## Support

For issues or questions:
- Email: mohanvenkat123456@gmail.com
- Create an issue on GitHub

