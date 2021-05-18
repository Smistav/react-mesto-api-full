const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return /https?:\/\/(www\.)?[a-z0-9-.]{3,20}[a-z]{2,6}[-._~:/[\]?#@!$&'()*+,;=a-z0-9]*/g.test(link);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('card', cardSchema);
