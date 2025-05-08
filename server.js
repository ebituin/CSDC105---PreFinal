const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'text/html');

    let path = 'views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end('Error loading page.');
        } else {
            res.end(data);
        }
    });
});

const port = 3000;
server.listen(port, 'localhost', () => {
    console.log(`Listening for requests on http://localhost:${port}`);
});
