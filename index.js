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
        ], "/blocked.html"), // Redirect to the blocked.html page
    ]
});

app.use('/', function (req, res, next) {
    if (req.url === "/blocked.html") {
        // Serve blocked.html directly
        res.sendFile(__dirname + "/public/blocked.html");
    } else {
        // Proxy all other requests
        proxy.request(req, res);
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`RandomWebProxy is running at localhost:${port}`);
});
