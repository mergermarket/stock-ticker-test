const http = require('http');

const port = 3000;

const server = http.createServer(function(req, res) {
  res.end('Hello, World!');
});

server.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
