import React from "react";

function useCustomValidate() {
  const [errors, setErrors] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);

  React.useEffect(() => {
    errors.email !== "" || errors.password !== ""
      ? setValidForm(false)
      : setValidForm(true);
  }, [errors.email, errors.password]);

  React.useEffect(() => {
    setValidForm(false);
  }, []);

  function handleValidate(name, value) {
    switch (name) {
      case "email":
        const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        regEmail.test(String(value).toLowerCase())
          ? setErrors({ ...errors, [name]: "" })
          : setErrors({ ...errors, [name]: "Введите правильный Email" });
        break;

      case "password":
        value.length > 2 && value.length <= 100
          ? setErrors({ ...errors, [name]: "" })
          : setErrors({
              ...errors,
              [name]: "Должно быть больше 2-х символов и меньше 100",
            });
        break;

      default:
        break;
    }
  }
  return {
    errors,
    validForm,
    handleValidate,
  };
}
export default useCustomValidate;
