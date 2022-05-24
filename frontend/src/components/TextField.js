function TextField(props) {
  // console.log(props.errors);
  return(
    <div 
      className={`text-field ${props.style 
        ? `text-field_${props.styles}` 
        : ''}`}
    >
      <input 
        placeholder={props.placeholder}
        onChange={props.handleChange} 
        className={`text-field__input ${props.styles 
          ? `text-field__input_${props.styles}` 
          : ''} text-field__input_type_${props.label}`}
        name={props.name} 
        type={props.type}
        required
        id={`${props.label}-input`}
        autoComplete="off"
        value={props.value || ''}
        minLength={props.minLength ? props.minLength : ''}
        maxLength={props.maxLength ? props.maxLength : ''}
      />
      <span className={`${props.label}-input-error text-field__input-error`}>
        {props.errors ? props.errors[props.name] : ''}
      </span>
  </div>
  );
}

export default TextField;