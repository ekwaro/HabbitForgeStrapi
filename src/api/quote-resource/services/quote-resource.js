'use strict';

/**
 * quote-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quote-resource.quote-resource');
