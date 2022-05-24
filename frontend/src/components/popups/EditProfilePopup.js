import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import TextField from '../TextField';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: '',
    profession: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  React.useEffect(() => {
    setData({
      name: currentUser.name,
      profession: currentUser.about
    });
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: data.name,
      about: data.profession
    });
  }
  
  return(
    <PopupWithForm 
      title="Редактировать профиль" 
      name="edit"
      buttonText={props.isLoading 
        ? 'Загрузка...' 
        : 'Сохранить'}  
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <TextField 
        placeholder="Имя"
        label="name"
        handleChange={handleChange}
        value={data.name}
        name="name" 
        type="text"
        minLength="2" 
        maxLength="40" 
      />
      <TextField 
        placeholder="Профессия"
        label="profession"
        handleChange={handleChange}
        value={data.profession}
        name="profession" 
        type="text"
        minLength="2" 
        maxLength="200" 
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;