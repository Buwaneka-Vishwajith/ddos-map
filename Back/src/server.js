import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import AttackGenerator from './services/attackGenerator.js';
import DataService from './services/dataService.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const attackGenerator = new AttackGenerator();
const dataService = new DataService();

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Attack generation and broadcasting
const startAttackSimulation = () => {
  setInterval(async () => {
    try {
      // Try to get real data first
      const realData = await dataService.fetchRealAttackData();
      
      let attack;
      if (realData && realData.length > 0) {
        // Process real data (implementation depends on API structure)
        attack = realData[0]; // Simplified
      } else {
        // Generate realistic mock attack
        attack = attackGenerator.generateRealisticAttack();
      }

      // Broadcast to all connected clients
      io.emit('attack', attack);
      
      console.log(`Attack broadcasted: ${attack.sourceCountry} → ${attack.targetCountry} (${attack.type})`);
      
    } catch (error) {
      console.error('Error generating/broadcasting attack:', error);
    }
  }, Math.random() * 3000 + 1000); // Random interval between 1-4 seconds
};

// Start the simulation
startAttackSimulation();

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 CORS enabled for: ${process.env.CLIENT_URL}`);
  console.log(`⚡ Attack simulation started - generating realistic cyber threats...`);
});

export default app;