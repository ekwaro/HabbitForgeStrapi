'use strict';

/**
 * quote-resource controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quote-resource.quote-resource');
