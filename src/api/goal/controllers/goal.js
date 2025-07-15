'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::goal.goal', ({ strapi }) => {
  return {
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('You must be logged in to create a goal.');
      }

      ctx.request.body.data = {
        ...ctx.request.body.data,
        owner: user.id,
      };

      return await strapi.controller('api::goal.goal').create(ctx);
    },

    async find(ctx) {
      const user = ctx.state.user;

      ctx.query = {
        ...ctx.query,
        filters: {
          ...(ctx.query.filters || {}),
          owner: user.id,
        },
      };

      return await strapi.controller('api::goal.goal').find(ctx);
    },

    async findOne(ctx) {
      const user = ctx.state.user;
      const goalId = ctx.params.id;

      const entity = await strapi.entityService.findOne('api::goal.goal', goalId, {
        populate: ['owner'],
      });

      if (!entity || entity.owner?.id !== user.id) {
        return ctx.unauthorized('You do not have access to this goal.');
      }

      return await strapi.controller('api::goal.goal').findOne(ctx);
    },
  };
});
