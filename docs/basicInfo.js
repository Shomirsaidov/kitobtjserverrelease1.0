const getMainData = require('./paths/getMainData');
const bookSchema = require('./schemas/bookSchema');
const mainData = require('./schemas/mainData')

module.exports = {
    openapi: "3.0.3",
    info: {
      title: "Kitob.tj API",
      description: "API docs for Kitob.tj",
      version: "1.0.0",
      contact: {
        name: "Shomirsaidov Abubakr",
        email: "shomirsaidov.abubakr@mail.ru",
        url: "kitob.tj",
      },
    },
    servers: [
      {
        url: "http://localhost:4545/",
        description: "Local server",
      },
    ],
    tags: [
      { name: "Books Data" },
      { name: "Clients Data" },
      { name: "Orders Data" },
    ],
    components: {
      schemas: {
        ...mainData,
        ...bookSchema,
        id: {
          type: "string",
          description: "An id of a todo",
          example: "tyVgf",
        },
        Todo: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Todo identification number",
              example: "ytyVgh",
            },
            title: {
              type: "string",
              description: "Todo's title",
              example: "Coding in JavaScript",
            },
            completed: {
              type: "boolean",
              description: "The status of the todo",
              example: false,
            },
          },
        },
        TodoInput: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Todo's title",
              example: "Coding in JavaScript",
            },
            completed: {
              type: "boolean",
              description: "The status of the todo",
              example: false,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Not found",
            },
            internal_code: {
              type: "string",
              description: "Error internal code",
              example: "Invalid parameters",
            },
          },
        },
      },
    },
    // Define your API paths and operations here
    paths: {
      ...getMainData
      // Add more paths and operations as needed
    },
  };
  