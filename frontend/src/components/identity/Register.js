import React from 'react';
import TextField from '../TextField';
import { useFormWithValidation } from '../../utils/FormValidator';

function Register(props) {
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
    props.onRegister(values).then(resetFrom())
    .catch(err => {
      console.log(err.message || 'Что то пошло не так.');
    });
  }

  return(
    <div className="identity">
      <h2 className="identity__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <div className="form__help">
          Уже зарегистрированы? 
          <a href="/sign-in" className="form__link">Войти</a> 
        </div>
      </form>
    </div>
  );
}

export default Register ;