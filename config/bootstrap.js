const {cleanEnv, str, port, num} = require('envalid');
const path = require('path');
require('dotenv').config({path:
   path.join(__dirname, `/.env.${process.env.NODE_ENV}`)});
const env = cleanEnv(process.env, {
  NODE_ENV: str(
      {choices: ['development']}),
  url: str(),
  PORT: port(),
  SALT: num(),
  SECRET_KEY: str(),
});

const dbUrl = env.url;
const dbPort = env.PORT;
const salt = env.SALT;
const secretKey = env.SECRET_KEY;

module.exports = {dbUrl, dbPort, salt, secretKey};
