const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from assets directory
app.use(express.static(path.join(__dirname, 'src/assets')));

// Serve the main HTML file for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/assets/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Natan Construtora server running on http://0.0.0.0:${PORT}`);
});