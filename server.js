const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting Natan Construtora server...');

// Middleware to handle CORS and headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'src/assets')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'src/assets/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Catch all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'src/assets/index.html');
  res.sendFile(indexPath);
});

// Start server and keep it alive
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Natan Construtora server running on http://0.0.0.0:${PORT}`);
  console.log('Server is ready to receive requests');
  
  // Keep alive ping
  setInterval(() => {
    console.log('Server heartbeat:', new Date().toISOString());
  }, 60000);
});

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});