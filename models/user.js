const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);
const User = model("user", userSchema);

const schemas = {
  register: registerJoiSchema,
};
module.exports = { User, schemas };
