'use strict';

/**
 * quote-resource router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::quote-resource.quote-resource');
