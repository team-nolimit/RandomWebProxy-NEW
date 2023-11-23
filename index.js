const port = "8080"
const Corrosion = require('./lib/server')
const express = require('express')
const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "RandomWebProxy",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "Page is blocked"),
    ]
})

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.use('/', function (req, res, next) {
  if (req.originalUrl.endsWith('.js')) {
    res.sendStatus(404);
  } else {
    next();
  }
});

app.use('/', function (req, res) {
  proxy.request(req, res)
});

app.listen(process.env.PORT || port, () => {
  console.log(`RandomWebProxy is running at localhost:${port}`)
})
