import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  } 

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(
      {
        name: name,
        link: link
      });
  }

  React.useEffect(() => { 
    setName(''); 
    setLink(''); 
  }, [props.isOpen]); 

  return(
    <PopupWithForm title="Новое место" 
                   name="place" 
                   buttonText={props.isLoading 
                               ? 'Загрузка...' 
                               : 'Создать'}  
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    >
      <div className="form__box">
        <input placeholder="Название"
               onChange={handleNameChange} 
               value={name || ''}
               className="form__input form__input_type_name"
               required 
               minLength="2" 
               maxLength="30" 
               name="name" 
               id="name-input"/>
          <span className="name-input-error form__input-error"></span>
      </div>
      <div className="form__box">
        <input placeholder="Ссылка на картинку"
               onChange={handleLinkChange}
               value={link || ''}
               name="link" 
               className="form__input form__input_type_link" 
               id="link-input" 
               required 
               type="url"/>
        <span className="link-input-error form__input-error"></span>
      </div>
    </PopupWithForm >
  );
}

export default AddPlacePopup;