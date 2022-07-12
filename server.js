const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('www'));

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});