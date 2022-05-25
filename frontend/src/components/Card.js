import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function x(x) {
  if (x !== undefined) {return x;} else {return []}
  
}


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);




  //console.log(`${props.card.owner} === ${currentUser._id}`);


  const isOwn = props.card.owner === currentUser._id;
  //console.log(props.card);
  //console.log(props.card.likes);

  const arr = x(props.card.likes);
  //console.log(arr);

  const isLiked = arr.some(i => i === currentUser._id);

  const cardDeleteButtonClassName = (
    `card__remove ${isOwn ? 'card__remove_visible' : ''}` 
  ); 
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_checked' : ''}`
  ); 






  return(
    <div className="card">
      <button onClick={() => props.onCardDelete(props.card)} 
              aria-label="Remove" 
              className={cardDeleteButtonClassName} 
              type="button"
      />
      <img className="card__image" 
           alt={props.card.name} 
           onClick={() => props.onCardClick(props.card)} 
           src={props.card.link}
      />
      <div className="card__group">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__column">
          <button onClick={() => props.onCardLike(props.card)} 
                  aria-label="Like" 
                  className={cardLikeButtonClassName}
                  name="button-like"
          />
        <p className="card__counter">{arr.length}</p>
      </div>
    </div>
  </div>   
  );
}

export default Card;