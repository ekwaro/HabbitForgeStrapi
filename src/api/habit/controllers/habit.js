'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::habit.habit', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in to create a habit.');

    ctx.request.body.data = {
      ...ctx.request.body.data,
      owner: user.id, 
    };

    const response =  await super.create(ctx)
     const habit = response.data
      const habitId = response.data?.id;
       const fullHabit = await strapi.db.query('api::habit.habit').findOne({
      where: { id: habitId },
      populate: {
        accountabilityPartner: true,
      },
    });

    console.log(fullHabit)
    
     
    const partnerEmail = fullHabit?.accountabilityPartner?.email;
     if (partnerEmail) {
      await strapi.service('api::habit.habit').sendPartnerAlert({
        fullHabit,
        partnerEmail: partnerEmail
      });
    }
    return fullHabit;

  },

  async find(ctx) {
    const user = ctx.state.user;

    if (!user || !user.id) {
      return ctx.unauthorized('You must be logged in to view your habits.');
    }

    ctx.query = {
      ...ctx.query,
      filters: {
        ...(ctx.query.filters || {}),
        owner: {
          id: {
            $eq: user.id,
          },
        },
      },
    };

    return await super.find(ctx);
  },

 async findOne(ctx) {
  const user = ctx.state.user;
  const habitId = ctx.params.id;

  const entity = await strapi.db.query('api::habit.habit').findOne({
    where: { id: habitId },
    populate: { owner: true },
  });

  if (!entity || entity.owner?.id !== user.id) {
    return ctx.unauthorized('You do not have access to this habit.');
  }

  return await super.findOne(ctx);
}

 

}));
