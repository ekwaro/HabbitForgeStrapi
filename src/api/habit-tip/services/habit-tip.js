'use strict';

/**
 * habit-tip service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::habit-tip.habit-tip');
