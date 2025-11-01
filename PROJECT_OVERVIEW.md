# MEAN Stack Portfolio - Project Overview

## 🎯 Project Summary

A complete, production-ready portfolio website built with the MEAN stack featuring a dark cyberpunk theme, 3D UI/UX elements, and a fully functional contact form.

## 📦 What's Included

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ Contact form endpoint
- ✅ CORS enabled
- ✅ Environment configuration
- ✅ Error handling

### Frontend (Angular)
- ✅ Angular 17 with standalone components
- ✅ Dark cyberpunk theme
- ✅ 3D animated particle background (Three.js)
- ✅ Smooth scroll navigation
- ✅ Responsive design
- ✅ All your portfolio content
- ✅ Working contact form
- ✅ Hover effects and animations

### Content Sections
1. **Hero** - Introduction with 3D glow
2. **About** - Career objective and contact info
3. **Education** - B.Tech and Intermediate details
4. **Experience** - HQL EduTech internship
5. **Projects** - PizzaHut Landing Page
6. **Skills** - Languages, technologies, certifications
7. **Contact** - Functional form with MongoDB storage

## 🎨 Color Palette

- Background: #0a0a0a (Deep black)
- Secondary: #141414 (Dark gray)
- Tertiary: #1a1a1a (Lighter dark)
- Primary Accent: #00d4ff (Cyan)
- Secondary Accent: #8b5cf6 (Purple)
- Tertiary Accent: #ec4899 (Pink)

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Frontend
- Angular 17
- TypeScript
- Three.js
- CSS3
- HTML5

### Development
- Angular CLI
- Nodemon
- Modern ES6+

## 📂 File Structure

```
Portfolio_Soc/
├── Backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend
│   ├── angular.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── styles.css
│   │   └── app/
│   │       ├── app.component.ts
│   │       ├── app.component.html
│   │       └── app.component.css
│
├── Documentation
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── PORTFOLIO_FEATURES.md
│   ├── QUICK_START.md
│   └── PROJECT_OVERVIEW.md
│
└── Scripts
    ├── start.bat
    └── setup.bat
```

## 🚀 Getting Started

### Quick Setup
```bash
# 1. Install dependencies
npm install
copy angular-package.json package.json
npm install

# 2. Start MongoDB

# 3. Run both servers
start.bat
```

### Access
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- API Health: http://localhost:3000/api/health

## 🎯 Key Features

### 3D UI/UX
- Animated particle system
- Rotating 3D background
- Floating elements
- Glowing effects
- Smooth transitions

### Dark Theme
- Cyberpunk aesthetic
- Neon accent colors
- Easy on the eyes
- Professional look

### Interactive Elements
- Hover effects on cards
- Smooth scroll navigation
- Animated buttons
- Loading states
- Success messages

### Responsive Design
- Mobile optimized
- Tablet friendly
- Desktop enhanced
- Touch gestures

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server status |
| `/api/contact` | POST | Submit contact form |
| `/api/contacts` | GET | Get all contacts |

## 🎓 Content Included

### Personal Info
- Name: Mohan Venkat Kalla
- Email: mohanvenkat123456@gmail.com
- Phone: +91 6304507087

### Education
- B.Tech CSE (BVC College) - 7.4 GPA
- Intermediate MPC (Megha Jr College) - 8.3 GPA

### Experience
- JAVA Intern at HQL EduTech
- Duration: June-July 2024

### Projects
- PizzaHut Landing Page
- Tech: HTML, CSS, JavaScript

### Skills
- Java, HTML, CSS, JavaScript, SQL
- ServiceNow, VS Code, Eclipse
- Git & GitHub

### Certifications
- ServiceNow CAD (Sep 2025)
- ServiceNow CSA (Aug 2025)
- NPTEL Java (Elite+Gold)
- NPTEL DBMS

## 🎨 Customization

### Easy Changes
1. Colors: Edit `src/styles.css`
2. Content: Edit `src/app/app.component.html`
3. 3D Effects: Edit `src/app/app.component.ts`
4. API: Edit `server.js`

### Advanced
- Add more sections
- Implement blog
- Add admin panel
- Real-time updates
- Email notifications

## 📱 Deployment

### Frontend
```bash
ng build --prod
# Deploy dist/portfolio/ to Netlify/Vercel
```

### Backend
```bash
# Deploy to Railway/Render/Heroku
# Update MongoDB URI
# Update CORS origins
```

## 🔒 Security

- Environment variables
- Input validation
- CORS protection
- Error handling
- Secure endpoints

## 📈 Performance

- Optimized build
- Lazy loading ready
- Fast API responses
- Efficient 3D rendering
- Minimal bundle size

## 🌟 Highlights

✨ Modern MEAN stack  
✨ 3D interactive UI  
✨ Dark cyberpunk theme  
✨ Fully responsive  
✨ Production ready  
✨ Easy to customize  
✨ Your data included  
✨ Working forms  

## 📚 Documentation

- `README.md` - Main documentation
- `QUICK_START.md` - 5-minute setup
- `INSTALLATION.md` - Detailed guide
- `PORTFOLIO_FEATURES.md` - Features list

## 🎉 You're All Set!

Your portfolio is ready. Just:
1. Run `start.bat`
2. Visit localhost:4200
3. Customize as needed
4. Deploy to production

Built with ❤️ using MEAN Stack

