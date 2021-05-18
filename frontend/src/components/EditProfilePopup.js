import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const [isInputChange, setIsInputChange] = React.useState(false);
  const [isNameError, setIsNameError] = React.useState("");
  const [isAboutError, setIsAboutError] = React.useState("");
  const [isValidForm, setIsValidForm] = React.useState(false);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameError("");
    setIsAboutError("");
    setIsInputChange(false);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    if (isNameError || isAboutError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [isNameError, isAboutError]);

  React.useEffect(() => {
    if (!isInputChange) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [isInputChange]);

  function handleChangeName(e) {
    setName(e.target.value);

    if (e.target.value.length > 2 && e.target.value.length <= 40) {
      setIsNameError("");
      setIsInputChange(true);
    } else {
      setIsNameError("Должно быть больше 2-х символов и меньше 40");
    }
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);

    if (e.target.value.length > 2 && e.target.value.length <= 200) {
      setIsAboutError("");
      setIsInputChange(true);
    } else {
      setIsAboutError("Должно быть больше 2-х символов и меньше 200");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onValid={isValidForm}
      isLoading={props.isLoading}
      loadingButton="Сохранение..."
      buttonName="Сохранить"
      name="edit"
    >
      <div className="popup__input-container">
        <input
          id="name-input"
          value={name}
          onChange={handleChangeName}
          name="name"
          placeholder="Имя"
          className="popup__input"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        {isNameError && (
          <span
            id="name-input-error"
            className={`popup__error ${
              isNameError ? "popup__error_visible" : ""
            }`}
          >
            {isNameError}
          </span>
        )}
      </div>
      <div className="popup__input-container">
        <input
          id="job-input"
          value={description}
          onChange={handleChangeDescription}
          name="about"
          placeholder="О себе"
          className="popup__input"
          type="text"
          minLength="2"
          maxLength="200"
          required
        />
        {isAboutError && (
          <span
            id="job-input-error"
            className={`popup__error ${
              isAboutError ? "popup__error_visible" : ""
            }`}
          >
            {isAboutError}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
