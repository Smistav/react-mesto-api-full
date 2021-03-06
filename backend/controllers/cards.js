const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort('field -createdAt')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        return card;
      }
      return next(new ForbiddenError('Нельзя удалять чужие карточки'));
    })
    .then((card) => Card.findByIdAndRemove(card._id)
      .then((cardRemoved) => res.send({ data: cardRemoved })))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.cardId} не найдена`));
      }
    });
};

// Может быть это изза того что Вы проверяете
// cards/id/likes и тогда будет 404 всегда
// а у меня cards/likes/id  и тогда феншуй

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.cardId} не найдена`));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.cardId} не найдена`));
      }
    });
};
