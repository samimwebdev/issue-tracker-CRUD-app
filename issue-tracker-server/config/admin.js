module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '13eaddf2d17718eb5f34adf0b4a14370'),
  },
});
