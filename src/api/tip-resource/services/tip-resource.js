'use strict';

/**
 * tip-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tip-resource.tip-resource');
