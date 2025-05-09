const http = require('http');
const server = http.createServer((req, res) =>{
    res.end('welcome to node.js')
});
server.listen(8000);