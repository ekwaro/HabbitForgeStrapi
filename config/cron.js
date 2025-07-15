// config/cron-tasks.js (or config/cron.js)
const app = require('../src/utils/dailyreminder');

module.exports = {
  // Runs every day at 7:00 AM
  '0 7 * * *': async () => {
    await app(strapi);
  },
};
