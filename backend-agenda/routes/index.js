const express = require('express');
const sgMail = require("@sendgrid/mail");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
