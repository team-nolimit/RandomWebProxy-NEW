const port = "8080";
const Corrosion = require('./lib/server');
const express = require('express');
const app = express();

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "RandomWebProxy",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "/pages/blocked.html"), // Redirect to the blocked.html page
    ]
});

app.use('/', express.static(__dirname + '/public'));

// Route for serving the blocked.html page
app.get('/blocked.html', (req, res) => {
    res.sendFile(__dirname + "/public/blocked.html");
});

app.use('/', function (req, res) {
    proxy.request(req, res);
});

app.listen(process.env.PORT || port, () => {
    console.log(`RandomWebProxy is running at localhost:${port}`);
});
