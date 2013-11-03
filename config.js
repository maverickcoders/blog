// # Ghost Configuration
// Setup your Ghost install for various environments

var path = require('path'),
    config;

config = {
    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://docs.ghost.org/mail for instructions
         mail: {
             transport: 'SMTP',
             options: {
                 service: 'Mailgun',
                 auth: {
                     user: 'postmaster@maverickcoders.mailgun.org', // mailgun username
                     pass: '047ymeqtmvk9'  // mailgun password
                 }
             }
         },

        database: {
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'ghost',
                password: 'ghost',
                database: 'ghost',
                charset: 'utf8'
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        }
    },

    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://'+process.env.OPENSHIFT_APP_DNS,
         mail: {
             transport: 'SMTP',
             options: {
                 service: 'Mailgun',
                 auth: {
                     user: 'postmaster@maverickcoders.mailgun.org', // mailgun username
                     pass: '047ymeqtmvk9'  // mailgun password
                 }
             }
         },
        // database: {
        //     client: 'sqlite3',
        //     connection: {
        //         filename: path.join(__dirname, '/content/data/ghost.db')
        //     },
        //     debug: false
        // },

        database: {
            client: 'mysql',
            connection: {
                host: process.env.OPENSHIFT_MYSQL_DB_HOST,
                user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
                password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
                database: process.env.OPENSHIFT_APP_NAME,
                port: process.env.OPENSHIFT_MYSQL_DB_PORT,
                charset: 'utf8'
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: process.env.OPENSHIFT_NODEJS_IP,
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.OPENSHIFT_NODEJS_PORT
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    },

    // ### Travis
    // Automated testing run through Github
    travis: {
        url: 'http://127.0.0.1:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-travis.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        }
    }
};

// Export config
module.exports = config;
