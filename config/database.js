module.exports= ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL'),
    ssl: env('NODE_ENV') === 'production' ? {
      rejectUnauthorized: false, // for Neon and other managed services
    } : false, // Disable SSL in development for faster connections
    pool: {
      min: 1, // Reduced for development
      max: 10, // Reduced from 30 to 10 for development
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
  },
});
