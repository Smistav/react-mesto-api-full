const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }).unknown(true),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), deleteCard);
router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }).unknown(true),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), likeCard);
router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }).unknown(true),
  query: Joi.object().keys({
    _id: Joi.string().length(24),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
