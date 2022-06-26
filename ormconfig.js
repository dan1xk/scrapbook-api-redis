require('dotenv').config();

let config = {};

if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
    config = {
        type: 'sqlite',
        database: './db-test.sql',
        migrations: [ 'src/database/migrations/**/*' ],
        entities: [ 'src/database/entities/**/*' ]
    };
} else {
    config = {
        type: process.env.DATABASE_TYPE,
        url: process.env.DATABASE_URL,
        logging: false,
        extra: {
            ssl: { rejectUnauthorized: false }
        },
        migrations: [ 'src/database/migrations/**/*' ],
        entities: [ 'src/database/entities/**/*' ],
        cli: {
            entitiesDir: 'src/database/entities',
            migrationsDir: 'src/database/migrations'
        }
    };
}

module.exports = config
