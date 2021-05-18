import React from "react";
import useCustomValidate from "./useCustomValidate";

function useCustomForm({ initialValues, onSubmit }) {
  const [values, setValues] = React.useState(initialValues);
  const { errors, validForm, handleValidate } = useCustomValidate();

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    handleValidate(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }
  return {
    values,
    errors,
    validForm,
    handleChange,
    handleSubmit,
  };
}
export default useCustomForm;
