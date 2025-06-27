const { celebrate, Joi, Segments } = require("celebrate");

// Signup validation
const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    username: Joi.string().required().min(2).max(30),
  }),
});

// Signin validation
const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Article validation
const validateArticle = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    source: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    keyword: Joi.string().required(),
    date: Joi.string().required(),
    link: Joi.string().uri().required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateArticle,
};
