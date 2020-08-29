/**
 * This function initializes which MongoDB should engine use
 * @description If code is being run in heroku, it chooses the
 * heroku provided DB url, if it's local, then it chooses local
 * mongodb with given url below
 */

module.exports = () => {
  if (process.env.HOST === "heroku") return process.env.DB_HOST;
  else return "mongodb://localhost:27017/serverland";
};
