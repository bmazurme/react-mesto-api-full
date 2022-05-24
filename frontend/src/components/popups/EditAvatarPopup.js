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
    <PopupWithForm 
      title="Обновить аватар" 
      name="avatar" 
      buttonText={props.isLoading 
        ? 'Загрузка...' 
        : 'Сохранить'}  
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    <div className="text-field">
      <input
        ref={avatarRef}
        placeholder="Ссылка на картинку" 
        name="avatar" 
        className="text-field__input text-field__input_type_avatar"
        id="avatar-input"
        required 
        type="url"
      />
      <span className="avatar-input-error text-field__input-error">
      </span>
    </div>
  </PopupWithForm>
  ); 
}

export default EditAvatarPopup;