module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Intercept /api/* requests
        destination: 'https://cli-deploy-backend-production.up.railway.app' + '/api/:path*', // Forward to the backend URL
      },
    ];
  },
};