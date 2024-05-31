const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
