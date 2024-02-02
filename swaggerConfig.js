const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'API documentation for Express app',
    },
  },
  apis: ['app/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;