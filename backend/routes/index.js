const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('http://localhost:4000/api/');
});

module.exports = router;
 