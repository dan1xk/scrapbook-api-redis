require('dotenv').config();

module.exports = {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrations: [
        'dist/database/migrations/**/*.js'
    ],
    entities: [
        'dist/database/entities/**/*.js'
    ],
    cli: {
        entitiesDir: 'dist/database/entities',
        migrationsDir: 'dist/database/migrations'
    }
};