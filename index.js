const http = require('http');

// Standard HTTP request handling (GET, HEAD, POST, etc.)
const server = http.createServer((req, res) => {
  // Extract the client's IP address from the header or socket
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  const responseBody = { ip };

  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Response', JSON.stringify(responseBody));

  // For HEAD requests, only send headers; for others, include the JSON body.
  if (req.method === 'HEAD') {
    res.end();
  } else {
    res.end(JSON.stringify(responseBody));
  }
});

// Handling CONNECT method requests via the 'connect' event.
// The CONNECT method is typically used to establish a tunnel (e.g., for HTTPS),
// but here we simply return a header-only response.
server.on('connect', (req, clientSocket, head) => {
  // Extract IP using clientSocket since no 'res' object is provided.
  const ip = req.headers['x-forwarded-for'] || clientSocket.remoteAddress;
  const responseBody = { ip };

  // Build the response headers.
  // Note: The first line must be the status line for CONNECT responses.
  const responseHeaders = [
    'HTTP/1.1 200 Connection Established',
    'Content-Type: application/json',
    'X-Response: ' + JSON.stringify(responseBody),
    '', // Empty line to end headers
    ''
  ].join('\r\n');

  // Send the headers over the socket and end the connection.
  clientSocket.write(responseHeaders);
  clientSocket.end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
