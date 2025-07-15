module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/email/test',
      handler: 'email.test',
      config: {
        policies: [],
      },
    },
  ],
};
