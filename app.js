const http = require('http');
const fileSys = require('fs');
    
const server = http.createServer((req, res) => {
    fileSys.readFile('pages/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

server.listen(8000);