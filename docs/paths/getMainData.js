module.exports = {
    "/getMainData": {
        get: {
          tags: ["Books Data"],
          description: "Get books for the start page !",
          operationId: "getBooks",
          responses: {
            200: {
              description: "Books were obtained",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Todo", // Reference to your Todo schema
                    },
                  },
                },
              },
            },
          },
        },
      },
}