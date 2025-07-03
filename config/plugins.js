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
          user: "dorcusarigye9@gmail.com",
          pass: "jzpk ojzq qupc jidk",
        },
      },
      settings: {
        defaultFrom: "dorcusarigye9@gmail.com",
        defaultReplyTo: "dorcusarigye9@gmail.com",
      },
    },
  },
});
