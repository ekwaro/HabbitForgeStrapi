// Development-specific optimizations
module.exports = ({ env }) => ({
  // Disable features that slow down development
  admin: {
    autoOpen: false,
    serveAdminPanel: true,
    forgotPassword: {
      enabled: false,
    },
  },
  
  // Optimize database queries for development
  database: {
    connection: {
      pool: {
        min: 1,
        max: 5, // Even smaller pool for development
      },
    },
  },
  
  // Disable unnecessary middleware in development
  middlewares: {
    settings: {
      cors: {
        enabled: true,
        origin: ['http://localhost:3000', 'http://localhost:1337'],
      },
      logger: {
        level: 'error', // Reduce logging in development
      },
    },
  },
  
  // Disable cron jobs and webhooks in development
  cron: {
    enabled: false,
  },
  
  webhooks: {
    populateRelations: false,
  },
}); 