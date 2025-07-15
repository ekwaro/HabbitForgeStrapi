module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  environment: env('NODE_ENV', 'development'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Development optimizations
  ...(env('NODE_ENV') === 'development' && {
    cron: {
      enabled: false, // Disable cron jobs in development
    },
    admin: {
      autoOpen: false, // Don't auto-open browser
    },
  }),
});
