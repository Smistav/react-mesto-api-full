import sucess from "../images/sucess.svg";
import error from "../images/error.svg";
function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_form_${props.title} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_form_isform">
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close"
        />
        <img
          src={props.result ? sucess : error}
          alt={props.result ? "Успешно" : "Ошибка"}
          className="popup__imgInfo"
        />
        <h4 className="popup__heading popup__heading_form_info">
          {props.result ? props.textOk : props.textNotOk}
        </h4>
      </div>
    </div>
  );
}
export default InfoTooltip;
