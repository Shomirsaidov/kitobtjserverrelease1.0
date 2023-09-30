module.exports = {
    mainData: {
        type: "object",
        properties: {
            sales: {
                type: 'array',
                items: {
                    $ref: "#/components/schemas/book", // Reference to your book schema
                  }
            }
        }
    }
}