/** Node, Express, Backend */

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL) || 3000;

const express = require('express');
const http  = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { uptime } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin: CORS_ORIGIN, //Vite default port
        methods:["GET","POST"]
    }
});

app.use(cors());
app.use(express.json());

//Store for mock data
let metrics = {
  totalSales: 45230,
  totalUsers: 1234,
  activeUsers: 89,
  revenue: 125400,
  salesData: [
    { name: 'Mon', sales: 4000, users: 240 },
    { name: 'Tue', sales: 3000, users: 139 },
    { name: 'Wed', sales: 2000, users: 980 },
    { name: 'Thu', sales: 2780, users: 390 },
    { name: 'Fri', sales: 1890, users: 480 },
    { name: 'Sat', sales: 2390, users: 380 },
    { name: 'Sun', sales: 3490, users: 430 },
  ]
};

// REST API endpoint to get initial data
app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});

//Socket.io connection

io.on('connection',(socket)=>{
    console.log('New client connected', socket.id);

    //Send inital data
    socket.emit("metrics-update", metrics);

    socket.on('disconenct', ()=>{
        console.log('CLient disconencted', socket.id);
    });
});

//simulate real time data--- update every 3 seconds
setInterval(()=>{

    //Update metrics with random changes
    metrics.totalSales +=  Math.floor(Math.random() * 100);
    metrics.activeUsers = Math.floor(Math.random() * 150) + 50;
    metrics.revenue += Math.floor(Math.random() * 500);

    //Update the last days's data
    const lastDay = metrics.salesData[metrics.salesData.length -1];
    lastDay.sales += Math.floor(Math.random() * 200);
    lastDay.users += Math.floor(Math.random() * 10);

    io.emit('metrics-update', metrics);
    console.log('Metrics updated and broadcasted');
    
}, UPDATE_INTERVAL);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Express handles HTTP requests, socket.io adds websocket to support for real time bidirectional communication
 * CORS allows frontend to communicate to backend
 * REST endpoint /api/metrics return initial data when page lods
 * 
 * set interval simulates real time data changes every 3 seconds
 * 
 */