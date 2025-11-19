# URL Shortener - Frontend

This is the React frontend for the URL Shortener application, built with Vite and styled with Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Backend API running on `http://localhost:3000`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📁 Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main component
├── index.css             # Global styles
└── Components/
    ├── Body.jsx          # Main UI with Shorten & Analytics tabs
    └── NotFound.jsx      # 404 page
```

## 🎨 Features

### Shorten Tab
- Paste long URLs and get shortened versions
- Automatic error handling
- One-click shortening

### Analytics Tab
- Enter a short URL to view statistics
- See total clicks, creation date, and more
- Real-time data from backend

## 🔧 Configuration

The frontend uses environment variables from the root `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📦 Dependencies

- **React** - UI library with React Compiler enabled
- **Vite** - Fast build tool
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and style checking

## 🚀 Production Build

```bash
npm run build
```

The built files in `dist/` are served by the backend when running in production mode.

