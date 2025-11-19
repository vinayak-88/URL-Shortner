# URL Shortener

A full-stack web application that allows users to shorten long URLs and track analytics for shortened URLs. Built with Node.js/Express backend and React/Vite frontend.

## 🌟 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Analytics Dashboard**: Track click statistics for your shortened URLs
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **CORS Support**: Secure cross-origin requests between frontend and backend
- **MongoDB Integration**: Persistent storage with MongoDB
- **Production Ready**: Configured for deployment on Render

## 📋 Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud database)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/vinayak-88/URL-Shortner.git
cd URL-Shortner
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
PORT=3000
VITE_API_BASE_URL=http://localhost:3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

### 3. Install Dependencies

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd ../Frontend
npm install
```

### 4. Run the Application

**Backend (from Backend directory):**
```bash
npm start
```
The backend will run on `http://localhost:3000`

**Frontend (from Frontend directory, in a new terminal):**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
URL-Shortner/
├── Backend/
│   ├── src/
│   │   ├── index.js                 # Main server file
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── errorHandler.js      # Error handling middleware
│   │   │   └── rateLimit.js         # Rate limiting middleware
│   │   ├── models/
│   │   │   └── url.js               # URL schema
│   │   ├── routes/
│   │   │   └── urlRoute.js          # API routes
│   │   └── utils/
│   │       └── validator.js         # Input validation
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.jsx                  # Main component
│   │   ├── index.css                # Styles
│   │   └── Components/
│   │       ├── Body.jsx             # Main UI component
│   │       └── NotFound.jsx         # 404 page
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint rules
│   └── package.json
├── .env                             # Environment variables
└── README.md
```

## 🔌 API Endpoints

### POST `/url`
Create a shortened URL

**Request:**
```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3000/abc12345"
}
```

### GET `/:id`
Redirect to the original URL and increment click counter

**Response:** Redirects to original URL

### GET `/:id/analytics`
Get analytics data for a shortened URL

**Response:**
```json
{
  "data": {
    "_id": "...",
    "full_url": "https://example.com/very/long/url",
    "short_url": "abc12345",
    "clicks": 42,
    "createdAt": "2024-11-13T10:00:00.000Z",
    "updatedAt": "2024-11-13T12:30:00.000Z"
  }
}
```

## 🎨 Frontend Features

### Shorten Tab
- Input field to paste long URLs
- One-click URL shortening
- Copy-friendly short URL display
- Error handling with user-friendly messages

### Analytics Tab
- Enter a shortened URL to view its statistics
- Display original URL, short ID, and total clicks
- View creation and last update timestamps
- Real-time data from backend

## 🔒 Security Features

- **URL Validation**: Validates URL format before shortening
- **Localhost Blocking**: Prevents shortening of localhost URLs
- **Rate Limiting**: Prevents API abuse with request throttling
- **Input Sanitization**: Validates short IDs for security
- **CORS Protection**: Configured cross-origin requests

## 🛠️ Technology Stack

**Backend:**
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- validator - Input validation
- nanoid - Unique ID generation
- cors - Cross-origin support
- dotenv - Environment configuration

**Frontend:**
- React - UI library
- Vite - Build tool
- Axios - HTTP client
- Tailwind CSS - Styling
- React Compiler - Performance optimization

## 📦 Building for Production

**Backend Build:**
```bash
cd Backend
npm run build  # or simply npm start with NODE_ENV=production
```

**Frontend Build:**
```bash
cd Frontend
npm run build
```
This generates optimized files in the `dist/` folder.

