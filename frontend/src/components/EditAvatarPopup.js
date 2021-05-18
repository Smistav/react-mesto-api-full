import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [avatarLink, setAvatarLink] = React.useState("");
  const [isAvatarLinkError, setIsAvatarLinkError] = React.useState();
  const [isValidForm, setIsValidForm] = React.useState(false);

  React.useEffect(() => {
    setAvatarLink("");
    setIsAvatarLinkError(true);
  }, [props.isOpen]);

  React.useEffect(() => {
    if (isAvatarLinkError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [isAvatarLinkError]);

  function handleAvatarLink(e) {
    setAvatarLink(e.target.value);
    const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    if (url.test(String(e.target.value).toLowerCase())) {
      setIsAvatarLinkError("");
    } else {
      setIsAvatarLinkError("Введите правильный URL");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLink,
    });
  }
  return (
    <PopupWithForm
      title="Обновить Аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onValid={isValidForm}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButton="Обновление..."
      buttonName="Обновить"
      name="avatar"
    >
      <div className="popup__input-container">
        <input
          id="link-avatar"
          name="link"
          value={avatarLink}
          onChange={handleAvatarLink}
          className="popup__input"
          type="url"
          placeholder="ссылка на аватар"
          required
        />
        {isAvatarLinkError && (
          <span
            id="link-avatar-error"
            className={`popup__error ${
              isAvatarLinkError ? "popup__error_visible" : ""
            }`}
          >
            {isAvatarLinkError}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
