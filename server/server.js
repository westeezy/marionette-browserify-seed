var express = require("express"),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 3000,
    publicDir = process.argv[2] || __dirname + '/../public';

    console.log(publicDir)

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));
require('./application/routes')(app);
require('./i18n/routes')(app);

app.get('/', function(req,res) {
  res.sendfile('index.html');
});

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);

