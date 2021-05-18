import PopupWithForm from "./PopupWithForm";
function ConfirmDelete(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirmDelete();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onValid={true}
      isLoading={props.isLoading}
      loadingButton="Удаление..."
      buttonName="Удалить"
      name="confirm"
    />
  );
}
export default ConfirmDelete;
