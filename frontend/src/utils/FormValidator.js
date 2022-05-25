// connect
//
// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector))
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(config, formElement);
//     const formName = formElement.getAttribute('name');
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };
// enableValidation(config);


export default function resetForms(forms, formValidators) {
  forms.forEach(form => 
    formValidators[ document
                    .querySelector(form)
                    .getAttribute('name') ]
                    .resetValidation())
}

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }

  resetValidation() {   
    this._formElement.reset();
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  _hideError(inputElement) {
    inputElement.textContent = '';
    this._hideInputError (inputElement);
  }

  _setEventListeners() {
    this._toggleButtonState()
    const checkInputValidity = (inputElemen) => 
      this._checkInputValidity(inputElemen);
    const toggleButtonState = () => 
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(inputElement);
        toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._buttonElement) {
      if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
    }
  };
  
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
}