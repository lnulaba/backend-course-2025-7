const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lab 7 API Documentation',
      version: '1.0.0',
      description: 'API documentation for Backend Course Lab 7 - Docker and Database',
      contact: {
        name: 'Marta Stakhurska',
        email: 'Stakhurska.Marta@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
