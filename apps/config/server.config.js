/**
 * This function initializes which PORT should engine use
 * @description If code is being run in heroku, it chooses the
 * heroku provided PORT number, if it's local, then it chooses local
 * preferred port
 */

const env = require("./env.config");

module.exports = () => {
  if (env.HOST === "heroku") return env.PORT;
  else if (env.HOST === "test") return 3001;
  else return 3000;
};
