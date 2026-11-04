'use strict';

const http = require('node:http');
const { calculateTotal } = require('./index');
const { version } = require('../package.json');

const PORT = Number(process.env.PORT || 3001);

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({
      status: 'healthy',
      version
    }));
  }

  if (req.method === 'POST' && req.url === '/payments') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;

      if (body.length > 1024 * 1024) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payment = JSON.parse(body);
        const total = calculateTotal(payment.amount, payment.fee || 0);

        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({
          total,
          version
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({
          error: error.message
        }));
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify({
    error: 'Not found'
  }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`kk-payments ${version} listening on port ${PORT}`);
});
