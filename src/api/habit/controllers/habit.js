'use strict';

const nodemailer = require("nodemailer");
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::habit.habit', ({ strapi }) => ({
  async create(ctx) {
    // 1. Create the habit using the default logic
    const response = await super.create(ctx);

    // 2. Access the created habit's data
    const habitData = response.data?.attributes;

    // 3. Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dominicnoelchris@gmail.com",
        pass: "huqn xeds lodk rmxj", // Use App Password, not normal password
      },
    });

    await transporter.sendMail({
      from: "your@gmail.com",
      to: "dominicekwaro@hotmail.com", // could be ctx.state.user.email or a fixed email
      subject: "New Habit Created",
      text: `A new habit has been created:\n\nTitle: ${habitData.title}\nDescription: ${habitData.description}`,
    });

    return response;
  },
}));
