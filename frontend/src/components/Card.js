import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `elements__trash-button ${
    isOwn ? "elements__trash-button_active" : ""
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__heart-button ${
    isLiked ? "elements__heart-button_active" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <figure className="elements__item">
      <img
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
        aria-label={card.name}
        className="elements__img"
      />
      <button
        onClick={handleDeleteClick}
        type="button"
        className={cardDeleteButtonClassName}
      />
      <figcaption className="elements__description">
        <h3 className="elements__heading">{card.name}</h3>
        <button
          onClick={handleLikeClick}
          type="button"
          className={cardLikeButtonClassName}
        >
          <p className="elements__heart-count">{card.likes.length}</p>
        </button>
      </figcaption>
    </figure>
  );
}
export default Card;
