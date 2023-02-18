const { Product, schemas } = require("../../models/product");
const createError = require("http-errors");
const updateItem = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { productsId } = req.params;
    const result = await Product.findByIdAndUpdate(productsId, req.body, {
      new: true,
    });
    console.log(result);
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateItem;
