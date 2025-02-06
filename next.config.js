module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Intercept /api/* requests
          destination: 'http://127.0.0.1:8000/api/:path*', // Forward to FastAPI backend
        },
      ];
    },
  };