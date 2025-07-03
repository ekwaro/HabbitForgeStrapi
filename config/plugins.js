module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },

  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: env('SMTP_USERNAME'), // Moved to .env
          pass: env('SMTP_PASSWORD')
        },
      },
      settings: {
               defaultFrom: env('SMTP_USERNAME'), // Moved to .env
        defaultReplyTo: env('SMTP_USERNAME'), 
      },
    },
  },
});
