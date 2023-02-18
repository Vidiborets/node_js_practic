const { Product } = require("../../models/product");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const result = await Product.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: +limit,
    }).populate("owner", "email");
    //Ограничить кол-во в обьектов await Product.find({},'',{ skip: 4, limit:20 })
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
