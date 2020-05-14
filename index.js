const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.write('<h1>Hii, there</h1>');
});

app.listen(5000, () => {
  console.log('connected!');
})