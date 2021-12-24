const mongoose = require(`mongoose`);
const winston = require(`winston`);

//Initialise database
module.exports = function () {
  mongoose
    .connect(`mongodb://localhost/data`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connection to database succeeded`))
    .catch(err => console.error(`Connection to database failed`, err.message));
};
