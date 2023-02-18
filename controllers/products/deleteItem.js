const { Product } = require("../../models/product");
const createError = require("http-errors");
const deleteItem = async (req, res, next) => {
  try {
    const { productsId } = req.params;
    const result = await Product.findByIdAndRemove(productsId);
    //await = Product.findByIdAndDelete => findOneAndDelete
    //await = Product.findByIdAndRemove => findManyModify
    if (!result) {
      throw new createError(400, "Not found");
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteItem;
