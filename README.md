# Portfolio - MEAN Stack

A modern, dark-themed portfolio website with 3D UI/UX built using the MEAN stack (MongoDB, Express.js, Angular, Node.js).

## Features

- 🌙 Dark theme with cyberpunk aesthetics
- 🎨 3D animated background using Three.js
- 💫 Smooth animations and transitions
- 📱 Fully responsive design
- 🚀 Fast and optimized performance

## Tech Stack

- **Frontend**: Angular 17 (Standalone components)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **3D Graphics**: Three.js
- **Styling**: CSS3 with custom animations

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install backend dependencies:**
```bash
npm install
```

2. **Install Angular dependencies:**
```bash
cp angular-package.json package.json
npm install
```

3. **Start MongoDB:**
Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`

4. **Start the backend server:**
```bash
node server.js
```
The backend will run on `http://localhost:3000`

5. **Start the Angular development server:**
```bash
ng serve
```
The frontend will run on `http://localhost:4200`

### Environment Variables

**For Local Development:**
Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**For Vercel Deployment (MongoDB Atlas):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

See `env.example.txt` and `VERCEL_DEPLOYMENT.md` for detailed instructions on setting up MongoDB Atlas.

## Project Structure

```
Portfolio_Soc/
├── api/
│   ├── server.js          # Express backend (Vercel)
│   └── package.json       # Backend dependencies (Vercel)
├── server.js              # Express backend (local dev)
├── package.json           # Frontend dependencies
├── angular-package.json   # Angular dependencies
├── angular.json           # Angular configuration
├── vercel.json            # Vercel deployment config
├── tsconfig.json          # TypeScript configuration
├── VERCEL_DEPLOYMENT.md   # Vercel deployment guide
├── env.example.txt        # Environment variables template
├── src/
│   ├── index.html         # Main HTML file
│   ├── main.ts            # Angular entry point
│   ├── styles.css         # Global styles
│   └── app/
│       ├── app.component.ts    # Main component
│       ├── app.component.html  # Template
│       └── app.component.css   # Component styles
└── README.md
```

## Sections

1. **Home** - Hero section with introduction
2. **About** - Career objective and personal information
3. **Education** - Academic qualifications
4. **Experience** - Work experience and internships
5. **Projects** - Portfolio projects
6. **Skills** - Technical skills and certifications
7. **Contact** - Contact form with MongoDB integration

## API Endpoints

- `GET /api/health` - Server health check
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions

## Deployment

### Quick Deploy to Vercel (Recommended)

For deploying to Vercel with MongoDB Atlas (cloud database), see the detailed guide:
**[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)**

Quick steps:
1. Create MongoDB Atlas account (free)
2. Get your MongoDB Atlas connection string
3. Push code to GitHub
4. Import to Vercel
5. Add `MONGODB_URI` environment variable
6. Deploy!

### Manual Deployment

**Backend:**
Deploy to platforms like Heroku, Railway, Render, or Vercel.

**Frontend:**
Build and deploy:
```bash
ng build --configuration production
```

Deploy the `dist/portfolio` folder to platforms like Netlify, Vercel, or GitHub Pages.

## Contact

**Mohan Venkat Kalla**
- Email: mohanvenkat123456@gmail.com
- Phone: +91 6304507087
- LinkedIn: [Your Profile]
- GitHub: [Your Profile]

## License

This project is open source and available under the MIT License.

