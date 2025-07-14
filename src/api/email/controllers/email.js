'use strict';

module.exports = {
  async test(ctx) {
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'dominicnoelchris.com',
        subject: 'Test Email',
        text: 'Hello from Strapi!',
      });

      ctx.send({ message: 'Email sent!' });
    } catch (err) {
      ctx.send({ error: 'Failed to send email', details: err }, 500);
    }
  },
};
