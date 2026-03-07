# CorperCompass
CorperCompass is your all-in-one relocation guide for a smooth transition into NYSC service. Discover safe areas, browse lodges, learn local culture, track your pre-arrival checklist, and estimate your monthly budget—all in one place. No bookings, no payments—just reliable information to help you focus on your service year.
 CorperCompass 🧭

CorperCompass is a relocation transition-support platform designed specifically for NYSC (National Youth Service Corps) members in Nigeria. It helps corpers navigate their new environment by providing curated information on areas, lodges, cultural onboarding, a relocation checklist, and a budget estimator.

 # CorperCompass

CorperCompass is a relocation transition-support platform for NYSC corpers moving across different geopolitical regions in Nigeria. It provides structured guidance before travel, during arrival, and early settlement.

Think of CorperCompass as your trusted companion—pointing you in the right direction so you can focus on making the most of your service year.

Social Media Blurb:
✨ Just posted to your dream state? Let CorperCompass be your guide!
🏠 Find safe areas & lodges
💰 Estimate your monthly budget
🗺️ Learn local culture & customs
✅ Track your relocation checklist. 
Start exploring at http://corperCompass.org  
#NYSC 
#CorperCompass 
#RelocationMadeEasy




## Features

- **User authentication** (JWT in HTTP‑only cookies)
- **Relocation journey dashboard** with checklist
- **Area intelligence** (rent, transport, safety, lifestyle notes)
- Lodge directory (admin‑managed)
- **Cultural onboarding** content
- **Relocation budget** estimator
- **Admin panel** for content management
- **Marketplace extensions**: booking, payments (Paystack), negotiations (conversations), real‑time messaging
- **Authentication** – JWT-based signup/login with role-based access (user/admin).
- **Profile Management** – Store posted state, preferences, and personal details.
- **Relocation Dashboard** – Track progress through a customizable checklist of pre- and post-arrival tasks.
- **Area Intelligence** – Browse states, LGAs, and areas with safety ratings, cost of living, and amenities.
- **Lodge Directory** – Admin-managed list of lodges (informational only) with prices, amenities, and contacts.
- **Cultural Onboarding Guide** – Learn about local languages, festivals, cuisines, and etiquette by state.
- **Budget Estimator** – Calculate estimated monthly expenses with a built-in buffer and risk alerts.
- **Admin Panel** – CRUD operations for areas, lodges, and cultural content.

---

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express.js** – RESTful API
- **MongoDB** + **Mongoose ODM** – Database
- **JSON Web Tokens (JWT)** – Authentication
- **bcrypt** – Password hashing
- **express-validator** – Input validation
- **helmet**, **cors** – Security middleware
- **jest** + **supertest** – Testing
- Socket.io, JWT, bcrypt, Helmet, express-rate-limit, express-mongo-sanitize, xss, cookie-parser
  
- **Frontend**: React, Vite, React Router, Axios, Socket.io-client
- **React** (with Vite) – UI library
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Context API** – State management (auth)
- **Plain CSS** – No UI frameworks; custom responsive design
- frontend - backend communication 
The frontend (React) communicates with the backend (Node.js/Express) via HTTP requests over a RESTful API. 
**communicanition****Between the** **frontend and backend** 
React Component 

    → calls service function 
    → Axios makes HTTP request (with token) 
    → Express route handles request 
    → Controller processes & returns JSON 
    → Axios resolves promise 
    → Component updates state re-renders
    
## Security

- HTTP‑only signed cookies for JWT storage
- Rate limiting on auth endpoints
- Input sanitization against NoSQL injection and XSS
- Helmet with CSP headers
- CORS with credentials
- Payload size limit
- Logout endpoint clears cookie

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Paystack account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/corpercompass.git
   cd corpercompass

 
---

 ✨




---

## 📁 Project Structure

corpercompass/
├── README.md
├── .gitignore
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── socket.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Profile.js
│   │   │   ├── State.js
│   │   │   ├── Area.js
│   │   │   ├── Lodge.js
│   │   │   ├── JourneySection.js
│   │   │   ├── ChecklistItem.js
│   │   │   ├── UserChecklistProgress.js
│   │   │   ├── CulturalContent.js
│   │   │   ├── EventLog.js
│   │   │   ├── Booking.js
│   │   │   ├── Payment.js
│   │   │   ├── Conversation.js
│   │   │   └── Message.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── journeyController.js
│   │   │   ├── areaController.js
│   │   │   ├── lodgeController.js
│   │   │   ├── cultureController.js
│   │   │   ├── budgetController.js
│   │   │   ├── bookingController.js
│   │   │   ├── paymentController.js
│   │   │   ├── conversationController.js
│   │   │   └── messageController.js
│   │   ├── services/
│   │   │   ├── budgetService.js
│   │   │   ├── paymentService.js
│   │   │   └── messagingService.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── journeyRoutes.js
│   │   │   ├── areaRoutes.js
│   │   │   ├── lodgeRoutes.js
│   │   │   ├── cultureRoutes.js
│   │   │   ├── budgetRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── conversationRoutes.js
│   │   │   └── messageRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── sanitize.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── app.js
│   │   └── server.js
│   └── tests/
│       ├── auth.test.js
│       ├── budget.test.js
│       ├── checklist.test.js
│       ├── lodgeCRUD.test.js
│       ├── booking.test.js
│       └── payment.test.js
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Navbar.css
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── ChecklistCard.jsx
    │   │   ├── ChecklistCard.css
    │   │   ├── DashboardProgress.jsx
    │   │   ├── DashboardProgress.css
    │   │   ├── AreaCard.jsx
    │   │   ├── AreaCard.css
    │   │   ├── LodgeCard.jsx
    │   │   ├── LodgeCard.css
    │   │   ├── BudgetForm.jsx
    │   │   ├── BudgetForm.css
    │   │   ├── BookingCard.jsx
    │   │   ├── BookingCard.css
    │   │   ├── MessageList.jsx
    │   │   ├── MessageList.css
    │   │   ├── ConversationItem.jsx
    │   │   └── ConversationItem.css
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Auth.css
    │   │   ├── Dashboard.jsx
    │   │   ├── Dashboard.css
    │   │   ├── AreaIntelligence.jsx
    │   │   ├── AreaIntelligence.css
    │   │   ├── LodgeDirectory.jsx
    │   │   ├── LodgeDirectory.css
    │   │   ├── BudgetEstimator.jsx
    │   │   ├── BudgetEstimator.css
    │   │   ├── CulturalOnboarding.jsx
    │   │   ├── CulturalOnboarding.css
    │   │   ├── AdminPanel.jsx
    │   │   ├── AdminPanel.css
    │   │   ├── Bookings.jsx
    │   │   ├── Bookings.css
    │   │   ├── MakeBooking.jsx
    │   │   ├── MakeBooking.css
    │   │   ├── Conversations.jsx
    │   │   ├── Conversations.css
    │   │   ├── ConversationDetail.jsx
    │   │   ├── ConversationDetail.css
    │   │   └── PaymentSuccess.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── (other service files if needed)
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── SocketContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useSocket.js
    │   └── styles/
    │       └── global.css
    └── public/
        └── favicon.ico

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/corpercompass.git
   cd corpercompass
```

1. Backend setup
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secret, and port
   ```
2. Frontend setup
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Set VITE_API_URL to point to your backend (e.g., http://localhost:5000/api)
   ```

Environment Variables

Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/corpercompass
JWT_SECRET=your_super_secret_key_change_me
NODE_ENV=development
```

Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

Database Seeding (Optional)

To populate initial states, areas, and cultural content:

```bash
cd backend
npm run seed
```

---

🏃 Running the Application

Start Backend Server

```bash
cd backend
npm run dev   # uses nodemon for auto-restart
```

API will be available at http://localhost:5000/api

Start Frontend Development Server

```bash
cd frontend
npm run dev
```

App will open at http://localhost:5173

---

📚 API Documentation

Method Endpoint Description Access
POST /api/auth/register Register new user Public
POST /api/auth/login Login, receive JWT Public
GET /api/dashboard/journey Get journey sections & checklist User
PATCH /api/dashboard/checklist/:id Toggle checklist item completion User
GET /api/areas List all areas (filter by state) User
GET /api/areas/:state Get areas by state User
GET /api/lodges List lodges (filter by area) User
POST /api/lodges Create lodge Admin
PUT /api/lodges/:id Update lodge Admin
DELETE /api/lodges/:id Soft delete lodge Admin
GET /api/culture Get cultural content by state User
POST /api/budget/calculate Calculate estimated budget User
... Admin CRUD for areas, culture Full CRUD operations Admin

For detailed request/response schemas, see the API documentation.

---

🧪 Testing

Backend Tests

```bash
cd backend
npm test
```

Tests are written with Jest and Supertest. Make sure a test database is configured (use TEST_MONGODB_URI in .env).

---

📦 Deployment

Backend (e.g., Render, Heroku, AWS)

· Set environment variables on the hosting platform.
· Ensure NODE_ENV=production.
· Use a production MongoDB instance (Atlas).

Frontend (Vercel, Netlify)

· Build command: npm run build
· Output directory: dist
· Set VITE_API_URL to your deployed backend URL.

---

🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change. For major changes, please open a feature branch and submit a pull request.

---

📄 License

MIT
