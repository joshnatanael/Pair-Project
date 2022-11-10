const express = require('express');
const router = require('./routes');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secretMySoldier',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))
app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})