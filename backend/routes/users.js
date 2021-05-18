const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, setUserInfo, setUserAvatar, getUserId,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', celebrate({
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), getUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }).unknown(true),
}), getUserId);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), setUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), setUserAvatar);

module.exports = router;
