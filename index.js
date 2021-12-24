require(`express-async-errors`);
require(`winston-mongodb`);
const express = require(`express`);
const app = express();

require(`./startup/routes`)(app);
require(`./startup/db`)();

//PORT
//$env:PORT=1234
const port = process.env.PORT || 1234;
app.listen(port, () =>
  console.log(`Listening on port ${(process.env.PORT, port)}...`)
);
