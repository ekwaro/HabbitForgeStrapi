'use strict';

/**
 * tip-resource router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tip-resource.tip-resource');
