const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const Corrosion = require('./lib/server');

const port = process.env.PORT || 8080;
const app = express();

const proxy = new Corrosion({
    prefix: '/service/',
    codec: 'xor',
    title: 'Rusty',
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            'accounts.google.com',
        ], 'Page is blocked'),
    ],
});

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/service/', (req, res) => {
    proxy.request(req, res);
});

// HTTPS Configuration
const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/public/security/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '/public/security/ssl.cert')),
};

const server = https.createServer(ssl, app);

server.listen(port, () => {
    console.log(`Rusty is running at localhost:${port}`);
});
