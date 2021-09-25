var express = require('express');
var routes = require('./routes/index');
var jwt = require('jsonwebtoken');

function logErrors(err, req, res, next, next) {
    console.error(err.stack);
    next(err);
  }

var app = express();

app.use(logErrors);

app.use(function(req, res, next) {

  const token = req.header("Authorization");
  if (!token) return res.status(400).send("Access Denied! Access token missing");
  try {
     jwt.verify(token, process.env.JWT_SECRET);
     next();
     } catch (err) {
        res.status(400).send({ 
          error: "auth failed, check auth-token" 
        });
     }
});

app.use('/', routes);

const port_runing = 3000;
app.listen(port_runing);

console.log("Application running at: " + port_runing)


