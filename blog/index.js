
const express = require('express');
const app = express();

const port = 8090;

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !');
});

app.listen(port, () => {
  console.log(`Serveur Express écoutant sur le port ${port}`);
});






