const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{7}$/;

const JoiAddProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  active: Joi.boolean(),
  status: Joi.string().valueOf("basic", "stock", "in sale"),
  code: Joi.string().pattern(codeRegexp),
});

const JoiUpdateFavoriteSchema = Joi.object({
  active: Joi.boolean().required(),
});

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "basic",
      enum: ["basic", "stock", "in sale"],
    },
    code: {
      type: String,
      required: true,
      match: codeRegexp,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas: {
    add: JoiAddProductSchema,
    update: JoiUpdateFavoriteSchema,
  },
};
