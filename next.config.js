module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Intercept /api/* requests
        destination: process.env.BACKEND_URL + '/api/:path*', // Forward to the backend URL
      },
    ];
  },
};