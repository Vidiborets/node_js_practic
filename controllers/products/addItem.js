const { Product, schemas } = require("../../models/product");
const createError = require("http-errors");
const addItem = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const data = { ...req.body, owner: req.user._id };
    const newProduct = await Product.create(data);
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message.includes("Validation failed")) {
      error.status = 400;
    }
    next(error);
  }
};
module.exports = addItem;
