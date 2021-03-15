const http = require('http');

const port = 3001;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain'),
  res.end('Hello World!');
});

server.listen(port, () => {
  console.log(`server run on http://${hostname}:${port}/`);
});