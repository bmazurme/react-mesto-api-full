import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  } 
  return(
    <PopupWithForm name="confirm"
                   title={props.title}
                   buttonText={props.isLoading 
                    ? 'Удаление...' 
                    : props.buttonText}  
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    />
  );
}

export default PopupWithConfirm;