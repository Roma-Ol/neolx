const verifyEntityExists = async (id, model) => {
  const entity = await model.exists({ _id: id });

  if (!entity) {
    const error = new Error(`Entity with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
};

module.exports = { verifyEntityExists };
