import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }
  
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  } 

  return(
    <PopupWithForm title="Редактировать профиль" 
                   name="edit"
                   buttonText={props.isLoading 
                               ? 'Загрузка...' 
                               : 'Сохранить'}  
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    >
    <div className="form__box">
      <input placeholder="Имя"
             onChange={handleNameChange} 
             className="form__input 
                        form__input_type_name" 
             name="name" 
             required
             minLength="2" 
             maxLength="40" 
             id="name-input" 
             value={name || ''}
      />
      <span className="name-input-error 
                       form__input-error"></span>
    </div>

    <div className="form__box">
      <input placeholder="Профессия"
             onChange={handleDescriptionChange} 
             className="form__input form__input_type_profession" 
             name="profession"
             required 
             minLength="2" 
             maxLength="200" 
             id="profession-input" 
             value={description || ''}
      />
      <span className="profession-input-error 
                       form__input-error"></span>
    </div>
  </PopupWithForm>
  );
}

export default EditProfilePopup;