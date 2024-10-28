import { useState, useEffect, useMemo } from "react";

export const useForm = (initialValue = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialValue);
  const [formValidation, setFormValidation] = useState({});
  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialValue);
  }, [initialValue]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;

      return true;
    }
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value, // computed property
    });
  };
  const onResetForm = () => {
    setFormState(initialValue);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    // loop through formValidations keys
    for (const formField of Object.keys(formValidations)) {
      // get validator function, message of formValidations[key]
      const [fn, errorMessage] = formValidations[formField];
      // add, construct object property of formCheckedValues as it's set on LoginPage useForm
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    // set state form validation
    setFormValidation(formCheckedValues);
    // console.log(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
