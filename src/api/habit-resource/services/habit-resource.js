'use strict';

/**
 * habit-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::habit-resource.habit-resource');
