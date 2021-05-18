function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_form_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form
        onSubmit={props.onSubmit}
        name={`form_${props.name}`}
        className="popup__container popup__container_form_isform"
        noValidate
      >
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close"
        />
        <h4 className="popup__heading">{props.title}</h4>
        {props.children}
        <button
          disabled={!props.onValid}
          type="submit"
          name="button"
          className={`popup__button ${
            props.onValid ? "" : "popup__button_disabled"
          }`}
        >
          {props.isLoading ? props.loadingButton : props.buttonName}
        </button>
      </form>
    </div>
  );
}
export default PopupWithForm;
