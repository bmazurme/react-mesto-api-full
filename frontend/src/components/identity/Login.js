import React from 'react';
import TextField from '../TextField';
import { useFormWithValidation } from '../../utils/FormValidator';

function Login(props) {
  const {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
    isValidInputs
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values).then(resetFrom())
    .catch(err => {
      console.log(err.message || 'Что то пошло не так.');
    });
  }

  return(
    <div className="identity">
      <h2 className="identity__title">Вход</h2>
      <form 
        className="form form_identity" 
        onSubmit={handleSubmit}
      >
        <TextField
          styles="identity"
          placeholder="Email"
          label="email"
          handleChange={handleChange}
          name="email" 
          type="email"
          value={values.email}
          errors={errors}
          isValidInputs={isValidInputs}
        />
        <TextField
          styles="identity"
          placeholder="Пароль"
          label="password"
          handleChange={handleChange}
          name="password" 
          type="password"
          value={values.password}
          errors={errors}
          isValidInputs={isValidInputs}
        />
        <button 
          className={`button button_identity button_submit 
            ${!isValid 
              ? 'button_submit_inactive' 
              :''}`}
          type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login ;