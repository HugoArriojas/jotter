const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // This should match the API endpoint prefix
    createProxyMiddleware({
      target: 'http://localhost:5000', // Backend server
      changeOrigin: true,
    })
  );
};
