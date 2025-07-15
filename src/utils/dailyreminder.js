'use strict';

module.exports = async (strapi) => {
  const habits = await strapi.db.query('api::habit.habit').findMany({
    populate: { owner: true },
  });

  for (const habit of habits) {
    const owner = habit.owner;

    if (!owner) continue;

    await strapi.db.query('api::notification.notification').create({
      data: {
        user: owner.id,
        title: `⏰ Daily Reminder for: ${habit.title}`,
        message: `Don't forget to complete "${habit.title}" today!`,
        type: 'reminder',
        habit: habit.id,
        read: false,
      },
    });

    strapi.log.info(`✅ Reminder sent to ${owner.email} for habit "${habit.title}"`);
  }
};
