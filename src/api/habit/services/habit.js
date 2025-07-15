'use strict';

/**
 * habit service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer');

module.exports = createCoreService('api::habit.habit', ({ strapi }) => {

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: strapi.config.get('plugin::email.user', process.env.SMTP_USER),
      pass: strapi.config.get('plugin::email.pass', process.env.SMTP_PASS),
    },
  });

  return {
   
    async sendPartnerAlert({ habit, partnerEmail }) {
      if (!partnerEmail) {
        strapi.log.warn('No partner email provided. Email not sent.');
        return;
      }

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: partnerEmail,
        subject: '🎯 New Habit Assigned to You',
        text: `Hello,\n\nA new habit titled "${habit?.title}" has been assigned to you as an accountability partner.\n\nDescription: ${habit?.description}\n\nPlease support your partner's goal!`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        strapi.log.info(`Email sent to ${partnerEmail}: ${info.messageId}`);
      } catch (error) {
        strapi.log.error(`Failed to send email to ${partnerEmail}:`, error);
      }
    },
  };
});
