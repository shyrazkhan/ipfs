var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./routes.js')(app);
app.use('/', express.static(path.join(__dirname, './src')));

var port = 3000;
app.listen(port, () => {
    console.log('Server listening on port:', port);
});





