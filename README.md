# Mini Healthcare Support Web App

A full-stack MERN project built with TypeScript for a simple healthcare support workflow. The app includes authentication, a protected dashboard, healthcare support form submission, AI-generated guidance, and a contact form popup.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Context API
- React Hot Toast
- React Icons
- React Spinners

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based auth
- Gemini API

## Features

- User signup and login
- JWT auth stored in secure HTTP-only cookies
- Protected dashboard route
- Healthcare support form for patients and volunteers
- AI-based health suggestion using Gemini
- Contact form popup from navbar
- MongoDB data storage
- Responsive UI for mobile and desktop
- Toast notifications and loading states

## Project Structure

```text
JaruratCareAssesment/
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- types/
|   |   |-- App.tsx
|   |   |-- index.css
|   |   `-- main.tsx
|   |-- .env
|   |-- package.json
|   `-- vite.config.ts
|-- server/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- types/
|   |   `-- server.ts
|   |-- .env
|   |-- package.json
|   `-- tsconfig.json
|-- .gitignore
`-- README.md
```

## Environment Variables

### Client

Create `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Server

Create `server/.env`

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=your-supported-gemini-model
```

## Installation

### 1. Install frontend dependencies

```bash
cd client
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

## Run The App

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

## Build Commands

### Frontend build

```bash
cd client
npm run build
```

### Backend build

```bash
cd server
npm run build
```

## Main API Routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Healthcare Support

- `POST /api/form/submit`

### AI

- `POST /api/ai/advice`

### Contact

- `POST /api/contact/submit`

## Notes

- Authentication uses cookies instead of localStorage.
- Gemini model names can change, so use a currently supported model in `server/.env`.
- MongoDB Atlas connectivity depends on correct network access and valid connection details.
- `.env` files are ignored by git through the root `.gitignore`.

## Demo Flow

1. Create an account or login.
2. Open the dashboard.
3. Submit a healthcare support message.
4. View the saved submission and AI response.
5. Open the navbar contact button and submit the popup contact form.

## Author

Built for assessment and portfolio demonstration.
