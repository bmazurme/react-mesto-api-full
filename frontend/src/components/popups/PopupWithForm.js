function PopupWithForm(props) {
  function handleCloseClick(e)
  {
    e.currentTarget === e.target && props.onClose();
  }
  return (
    <div
      onClick={handleCloseClick}
      className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}
    >
    <div className="popup__container">
      <button 
        aria-label="Close" 
        className="popup__close" 
        type="button" 
        onClick={props.onClose}
      />
      <form 
        className={`form form_type form_type_${props.name}`} 
        name={`${props.name}-form`} 
        noValidate 
        onSubmit={props.onSubmit}
      >
        <h2 className="form__title">{props.title}</h2>
          {props.children}
        <button
          aria-label="Save" 
          className="button button_submit" 
          type="submit"
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm; 