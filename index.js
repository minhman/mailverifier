const http = require('http');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const clients = [];

function sendEvent(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((res) => res.write(payload));
}

async function verifyEmail(email) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:9292',
    params: { email },
    headers: {
      Authorization: process.env.ACCESS_TOKEN,
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data.success;
  } catch (err) {
    return false;
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    clients.push(res);
    req.on('close', () => {
      const idx = clients.indexOf(res);
      if (idx !== -1) {
        clients.splice(idx, 1);
      }
    });
  } else if (req.method === 'POST' && req.url === '/upload') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      const emails = JSON.parse(body);
      const total = emails.length;
      let current = 0;
      for (const email of emails) {
        const success = await verifyEmail(email);
        current++;
        sendEvent({ current, total, email, status: success ? 'valid' : 'invalid' });
      }
      sendEvent({ done: true });
      res.writeHead(200);
      res.end('OK');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
