const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app directory
app.use(express.static(path.join(__dirname, 'src')));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve index.html for all routes (Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Natan Construtora Angular/Ionic server running on http://0.0.0.0:${PORT}`);
  console.log('Serving from branch feature/tsk-002');
  console.log('Angular/Ionic application with proper routing');
});