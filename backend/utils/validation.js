const Joi = require("joi");

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string()
  .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
  .trim()
  .required()
  .messages({
    "string.pattern.base": "Only Gmail addresses are allowed"
  }),
  password: Joi.string().min(6).required()
});

exports.noteSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  tags: Joi.array().items(Joi.string().trim()).default([])
});