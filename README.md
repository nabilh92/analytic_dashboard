# Real-Time Analytics Dashboard

A modern, real-time analytics dashboard built with React and Node.js, featuring WebSocket connections for live data updates.

## 🚀 Features

- **Real-time Updates**: Live data streaming via Socket.io
- **Interactive Charts**: Beautiful visualizations with Recharts
- **Responsive Design**: Works seamlessly on all devices
- **Connection Status**: Visual feedback for WebSocket connection
- **Modern UI**: Clean interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Socket.io Client
- Recharts
- Tailwind CSS
- Lucide React (icons)
- Axios

### Backend

- Node.js
- Express
- Socket.io
- CORS

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository

```bash
git clone
cd realtime-analytics-dashboard
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

Server runs on `http://localhost:5000`

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📊 How It Works

1. **Initial Load**: Frontend fetches initial data via REST API
2. **WebSocket Connection**: Socket.io establishes real-time connection
3. **Live Updates**: Server broadcasts new data every 3 seconds
4. **Auto-reconnection**: Connection automatically restores if dropped

## 🎯 Key Features Demonstrated

- Component-based architecture
- Real-time data with WebSockets
- State management with React Hooks
- Responsive design patterns
- Clean code organization
- Error handling
- Connection resilience

## 🔧 Configuration

### Backend Port

Edit `server/server.js`:

```javascript
const PORT = process.env.PORT || 5000;
```

### Frontend API URL

Edit `client/src/services/socket.js`:

```javascript
const SOCKET_URL = "http://localhost:5000";
```

## 📝 Future Enhancements

- [ ] Add user authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] More chart types (bar, pie, area)
- [ ] Date range filters
- [ ] Export data to CSV/PDF
- [ ] Dark mode
- [ ] Custom dashboard layouts
- [ ] Alert notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

```

```
