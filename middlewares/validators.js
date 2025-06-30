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
  [Segments.BODY]: Joi.object()
    .keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().isoDate().required(),
      source: Joi.string().required(),
      link: Joi.string().uri().required(),
      image: Joi.string().uri().required(),
    })
    .unknown(true),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateArticle,
};
