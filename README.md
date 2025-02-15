# Simple IP API Server

This is a simple Node.js API server that listens on all HTTP methods and returns the client's IP address. The IP is determined using the following code:

```js
req.headers['x-forwarded-for'] || req.socket.remoteAddress
```

For HEAD and CONNECT requests, the server responds with headers only.

## Prerequisites
- Node.js (version 12 or higher recommended)

## How to Run
1. Clone or Download this repository and navigate to the project directory.
2. Run the Server with the following command:

```bash
node server.js
```
The server listens on port 3000 by default. You can change the port by setting the PORT environment variable:
```bash
PORT=5000 node server.js
```
3. Server Output:

You should see a message like:
```
Server is running on port 3000
```

## Usage Examples with Curl
Below are examples of how to use the API server with various HTTP methods.

### GET Request
```bash
curl -X GET http://localhost:3000/
```
Response:
```json
{"ip":"::1"}
```
(Note: `::1` is the IPv6 loopback address, your output may vary.)

### HEAD Request
```bash
curl -I http://localhost:3000/
```
Response Headers:

```
HTTP/1.1 200 OK
Content-Type: application/json
X-Response: {"ip":"::1"}
...
```
(No body is returned as per the HEAD specification.)

### POST Request
```bash
curl -X POST http://localhost:3000/
```
Response:
```json
{"ip":"::1"}
```
### PUT Request
```bash
curl -X PUT http://localhost:3000/
```
Response:
```json
{"ip":"::1"}
```
### DELETE Request
```bash
curl -X DELETE http://localhost:3000/
```
Response:
```json
{"ip":"::1"}
```
### CONNECT Request
Since the CONNECT method is normally used for tunneling (e.g., HTTPS proxies), you can simulate it with curl as follows:

```bash
curl --request CONNECT http://localhost:3000/
```
Response:

The server responds with header-only data similar to a HEAD request:
```
HTTP/1.1 200 Connection Established
Content-Type: application/json
X-Response: {"ip":"::1"}
```
Note: The actual behavior of CONNECT may vary depending on your environment and curl version.

## License
This project is open source and available under the MIT License.