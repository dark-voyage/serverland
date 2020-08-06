/**
 * This function initializes which PORT should engine use
 * @description If code is being run in heroku, it chooses the
 * heroku provided PORT number, if it's local, then it chooses local
 * preferred port
 */

module.exports = () => {
    if (process.env.HOST === "heroku")
        return process.env.PORT
    else return 3000
}
