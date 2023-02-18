const { Product, schemas } = require("../../models/product");
const createError = require("http-errors");
const updateActiveItem = async (req, res, next) => {
  try {
    const { error } = schemas.update.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { productsId } = req.params;
    const result = await Product.findByIdAndUpdate(productsId, req.body, {
      new: true,
    });
    if (!result) {
      throw new createError(404, "not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateActiveItem;
