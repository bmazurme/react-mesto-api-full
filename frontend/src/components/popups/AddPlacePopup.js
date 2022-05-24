import PopupWithForm from "./PopupWithForm";
import React from "react";
import TextField from "../TextField";

function AddPlacePopup(props) {
  const [data, setData] = React.useState({
    name: '',
    link: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(
      {
        name: data.name,
        link: data.link
      });
  }

  React.useEffect(() => { 
    setData({
      name: '',
      link: ''
    }); 
  }, [props.isOpen]); 

  return(
    <PopupWithForm 
      title="Новое место" 
      name="place" 
      buttonText={props.isLoading 
        ? 'Загрузка...' 
        : 'Создать'}  
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <TextField 
        placeholder="Название"
        label="name"
        handleChange={handleChange}
        value={data.name}
        name="name" 
        type="text"
        minLength="2" 
        maxLength="30" 
      />
      <TextField 
        placeholder="Ссылка на картинку"
        label="link"
        handleChange={handleChange}
        value={data.link}
        name="link" 
        type="text"
      />
    </PopupWithForm >
  );
}

export default AddPlacePopup;