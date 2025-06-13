const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Simple HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(__dirname, 'src/assets', urlPath);

  // Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA
      filePath = path.join(__dirname, 'src/assets/index.html');
      fs.readFile(filePath, (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackData);
        }
      });
    } else {
      // Determine content type
      const ext = path.extname(filePath);
      let contentType = 'text/plain';
      
      switch (ext) {
        case '.html': contentType = 'text/html'; break;
        case '.js': contentType = 'application/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
        case '.gif': contentType = 'image/gif'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Force killing processes...`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Natan Construtora server running on http://0.0.0.0:${PORT}`);
});

// Keep process alive
setInterval(() => {
  console.log('Server alive:', new Date().toISOString());
}, 60000);