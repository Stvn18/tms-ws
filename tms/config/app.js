module.exports = {
    appConfig: {
        port: process.env.APP_PORT,
        context: process.env.CONTEXT
    },
    corsConfig: {
        origin: process.env.CORS_ORIGIN
    },
    authConfig: {
        key: process.env.SECRET_KEY
    },
    dataBaseConfig: {
        uri: process.env.URI_DB
    }
};

