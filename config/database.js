module.exports= ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL'),
    ssl: {
      rejectUnauthorized: false, // for Neon and other managed services
    },
      pool: {
      min: 2,
      max: 30, // default is usually 10; increase this
    },
  },
});
