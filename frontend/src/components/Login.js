import React from "react";
import useCustomForm from "./useCustomForm";
function Login(props) {
  const initialValues = {
    email: "",
    password: "",
  };
  const {
    values,
    errors,
    validForm,
    handleChange,
    handleSubmit,
  } = useCustomForm({
    initialValues,
    onSubmit: (values) => props.onLogin(values),
  });

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        name="form_login"
        className="popup__container popup__container_form_login"
        noValidate
      >
        <h4 className="popup__heading popup__heading_form_login">
          {props.title}
        </h4>
        <div className="popup__input-container">
          <input
            id="email-input"
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="popup__input popup__input_form_login"
            type="text"
            minLength="2"
            maxLength="40"
            required
          />
          {errors.email && (
            <span
              id="email-input-error"
              className={`popup__error ${
                errors.email ? "popup__error_visible" : ""
              }`}
            >
              {errors.email}
            </span>
          )}
        </div>
        <div className="popup__input-container">
          <input
            id="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            placeholder="Пароль"
            className="popup__input popup__input_form_login"
            type="password"
            minLength="2"
            maxLength="100"
            required
          />
          {errors.password && (
            <span
              id="password-input-error"
              className={`popup__error ${
                errors.password ? "popup__error_visible" : ""
              }`}
            >
              {errors.password}
            </span>
          )}
        </div>
        <button
          disabled={!validForm || props.isLoading}
          type="submit"
          name="button"
          className={`popup__button popup__button_form_login ${
            validForm ? "" : "popup__button_form_login_disabled"
          }`}
        >
          {props.isLoading ? props.loadingButton : props.buttonName}
        </button>
      </form>
    </main>
  );
}
export default Login;
