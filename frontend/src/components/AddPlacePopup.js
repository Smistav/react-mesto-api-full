import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [namePlace, setNamePlace] = React.useState();
  const [linkPlace, setLinkPlace] = React.useState();
  const [isNamePlaceError, setIsNamePlaceError] = React.useState();
  const [isLinkPlaceError, setIsLinkPlaceError] = React.useState();
  const [isValidForm, setIsValidForm] = React.useState(false);
  React.useEffect(() => {
    setNamePlace("");
    setLinkPlace("");
    setIsNamePlaceError(true);
    setIsLinkPlaceError(true);
  }, [props.isOpen]);

  React.useEffect(() => {
    if (isNamePlaceError || isLinkPlaceError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [isNamePlaceError, isLinkPlaceError]);

  function handleAddNamePlace(e) {
    setNamePlace(e.target.value);

    if (e.target.value.length > 2 && e.target.value.length <= 30) {
      setIsNamePlaceError("");
    } else {
      setIsNamePlaceError("Должно быть больше 2-х символов и меньше 30");
    }
  }
  function handleAddLinkPlace(e) {
    setLinkPlace(e.target.value);
    const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    if (url.test(String(e.target.value).toLowerCase())) {
      setIsLinkPlaceError("");
    } else {
      setIsLinkPlaceError("Введите правильный URL");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: namePlace,
      link: linkPlace,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onValid={isValidForm}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButton="Сохранение..."
      buttonName="Сохранить"
      name="add"
    >
      <div className="popup__input-container">
        <input
          id="place-input"
          value={namePlace || ""}
          onChange={handleAddNamePlace}
          name="name"
          className="popup__input popup__input_form_add"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="название"
          required
        />
        {isNamePlaceError && (
          <span
            id="place-input-error"
            className={`popup__error ${
              isNamePlaceError ? "popup__error_visible" : ""
            }`}
          >
            {isNamePlaceError}
          </span>
        )}
      </div>
      <div className="popup__input-container">
        <input
          id="link-input"
          name="link"
          value={linkPlace || ""}
          onChange={handleAddLinkPlace}
          className="popup__input popup__input_form_add"
          type="url"
          placeholder="ссылка на картинку"
          required
        />
        {isLinkPlaceError && (
          <span
            id="name-input-error"
            className={`popup__error ${
              isLinkPlaceError ? "popup__error_visible" : ""
            }`}
          >
            {isLinkPlaceError}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
