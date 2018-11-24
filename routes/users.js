//First it loads the express module
var express = require('express');
//and uses it to get an express.Router object
var router = express.Router();

/* GET users listing. */
//it specifies a route on that object,
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//exports the router from the module (this is what allows the file to be imported into app.js).
module.exports = router;
