module.exports = () => {
    if (process.env.HOST === "heroku")
        return process.env.DB_HOST
    else return 'mongodb://localhost:27017/serverland'
}
