import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "../components/Card";
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__img"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            onClick={props.onEditProfile}
            className="profile__edit-button"
          />
          <p className="profile__person-do">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
        />
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            card={item}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
