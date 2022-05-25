import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return(
    <PopupWithForm title="Обновить аватар" 
                   name="avatar" 
                   buttonText={props.isLoading 
                               ? 'Загрузка...' 
                               : 'Сохранить'}  
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    >
    <div className="form__box">
      <input ref={avatarRef}
             placeholder="Ссылка на картинку" 
             name="avatar" 
             className="form__input 
                        form__input_type_link"
             id="avatar-input" 
             required 
             type="url"/>
      <span className="avatar-input-error 
                       form__input-error"></span>
    </div>
  </PopupWithForm>
  ); 
}

export default EditAvatarPopup;