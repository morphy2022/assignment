var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');

app.use(bodyParser.json());
app.use('/', router);

app.use('/:birth', router);




app.listen(3000, () => {
 console.log("Server running on port 3000");
});




    
    