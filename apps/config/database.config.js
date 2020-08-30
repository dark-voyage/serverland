/**
 * This function initializes which MongoDB should engine use
 * @description If code is being run in heroku, it chooses the
 * heroku provided DB url, if it's local, then it chooses local
 * mongodb with given url below
 */

const env = require("./env.config");

module.exports = () => {
  if (env.HOST === "heroku") return env.DB_HOST;
  else if (env.HOST === "test") return null;
  else return "mongodb://localhost:27017/serverland";
};
