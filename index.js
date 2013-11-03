// # Ghost bootloader
// Orchestrates the loading of Ghost

var configLoader = require('./core/config-loader.js'),
    error        = require('./core/server/errorHandling');

// If no env is set, default to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log(process.env.NODE_ENV);
console.log("Database port " + process.env.OPENSHIFT_MYSQL_DB_PORT);
console.log("Database host " + process.env.OPENSHIFT_MYSQL_DB_HOST);
console.log("Database username " + process.env.OPENSHIFT_MYSQL_DB_USERNAME);
console.log("Database password " + process.env.OPENSHIFT_MYSQL_DB_PASSWORD);
console.log("Database " + process.env.OPENSHIFT_APP_NAME);

configLoader.loadConfig().then(function () {
    // The server and its dependencies require a populated config
    require('./core/server');
}).otherwise(error.logAndThrowError);
