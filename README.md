# CorperCompass
CorperCompass is your all-in-one relocation guide for a smooth transition into NYSC service. Discover safe areas, browse lodges, learn local culture, track your pre-arrival checklist, and estimate your monthly budget—all in one place. No bookings, no payments—just reliable information to help you focus on your service year.
 CorperCompass 🧭

CorperCompass is a relocation transition-support platform designed specifically for NYSC (National Youth Service Corps) members in Nigeria. It helps corpers navigate their new environment by providing curated information on areas, lodges, cultural onboarding, a relocation checklist, and a budget estimator.

 This is an informational platform only. No bookings, payments, messaging, or negotiation features are included.

---

 ✨ Features

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

### Frontend
- **React** (with Vite) – UI library
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Context API** – State management (auth)
- **Plain CSS** – No UI frameworks; custom responsive design

---

## 📁 Project Structure
corpercompass/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/          # Environment & DB config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers (logger, calculator)
│   │   ├── validation/      # Request validation schemas
│   │   └── app.js           # Express app setup
│   ├── tests/               # Unit & integration tests
│   ├── .env.example         # Environment variables template
│   └── server.js            # Entry point
├── frontend/                # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, fonts
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API client functions
│   │   ├── store/           # Context providers
│   │   ├── utils/           # Constants, helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── README.md
└── .gitignore
