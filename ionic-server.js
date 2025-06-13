const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5002;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // API routes
  if (pathname === '/api/services') {
    const services = [
      {
        id: '1',
        name: 'Renovação de Cozinha',
        description: 'Renovação completa de cozinhas com design moderno',
        category: 'renovacao',
        price: 2500,
        duration: 7,
        regions: ['São Miguel', 'Aveiro', 'Coimbra'],
        image: 'kitchen-renovation.jpg'
      },
      {
        id: '2',
        name: 'Reparação de Telhados',
        description: 'Reparação e manutenção de telhados',
        category: 'reparacao',
        price: 800,
        duration: 2,
        regions: ['São Miguel', 'Aveiro'],
        image: 'roof-repair.jpg'
      },
      {
        id: '3',
        name: 'Pintura Interior',
        description: 'Pintura profissional de interiores',
        category: 'pintura',
        price: 600,
        duration: 3,
        regions: ['São Miguel', 'Aveiro', 'Coimbra'],
        image: 'interior-painting.jpg'
      }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(services));
    return;
  }

  if (pathname.startsWith('/api/translations/')) {
    const lang = pathname.split('/')[3] || 'pt';
    const translations = {
      pt: {
        welcome_title: 'Bem-vindo à Natan Construtora',
        welcome_subtitle: 'Serviços de construção e manutenção de qualidade em Portugal',
        request_service: 'Solicitar Serviço',
        our_services: 'Nossos Serviços',
        request_this_service: 'Solicitar Este Serviço',
        service_areas: 'Áreas de Atendimento',
        contact_us: 'Contacte-nos',
        whatsapp_contact: 'Contactar via WhatsApp'
      },
      en: {
        welcome_title: 'Welcome to Natan Construtora',
        welcome_subtitle: 'Quality construction and maintenance services in Portugal',
        request_service: 'Request Service',
        our_services: 'Our Services',
        request_this_service: 'Request This Service',
        service_areas: 'Service Areas',
        contact_us: 'Contact Us',
        whatsapp_contact: 'Contact via WhatsApp'
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(translations[lang] || translations.pt));
    return;
  }

  // Serve static files
  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(__dirname, 'src', pathname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Natan Construtora Angular/Ionic server running on http://0.0.0.0:${PORT}`);
  console.log('Serving branch feature/tsk-002 with Angular/Ionic layout');
  console.log('Features: Multi-language support, Service request forms, Responsive design');
});