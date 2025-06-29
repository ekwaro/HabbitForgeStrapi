'use strict';

/**
 * motivational-quote service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::motivational-quote.motivational-quote');
