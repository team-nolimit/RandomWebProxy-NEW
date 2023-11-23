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
  const forbiddenExtensions = ['.css', '.js']; // Add more extensions if needed

  const requestedExtension = path.extname(req.path);

  if (forbiddenExtensions.includes(requestedExtension)) {
    res.status(403).send('Forbidden');
  } else {
    next();
  }
});


app.use('/', function (req, res) {
  proxy.request(req,res)
});

app.listen(process.env.PORT || port, () => {
  console.log(`RandomWebProxy is running at localhost:${port}`)
})
