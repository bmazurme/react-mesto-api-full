function InfoTooltip(props) {
  return(
    <div 
      onClick={ e => (e.currentTarget === e.target) && props.onClose()}
      className={`popup popup_tooltip ${props.isOpen 
        ? 'popup_active' 
        : ''}`} 
    >
      <div className="popup__container">
        <button 
          aria-label="Close"
          className="popup__close" 
          type="button" 
          onClick={props.onClose}
        />
        <div className="tooltip">
          <div className={`tooltip__image ${props.isSuccess 
            ? 'tooltip__image_success'
            : ''}`}
          >
          </div>
          <p className="tooltip__text">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;