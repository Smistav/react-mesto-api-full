function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_form_img ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form_img">
        <button
          type="button"
          onClick={onClose}
          className="popup__close popup__close_form_img"
        />
        <img className="popup__img" src={card.link} alt={card.name} />
        <h4 className="popup__heading popup__heading_form_img">{card.name}</h4>
      </div>
    </div>
  );
}
export default ImagePopup;
