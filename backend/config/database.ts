import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',

  connections: {
    postgres: {
      client: 'pg',

      connection: {
        connectionString: env.get('DATABASE_URL'),

        ssl: env.get('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
      },

      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig