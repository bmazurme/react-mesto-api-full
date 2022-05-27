import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__image" 
             style={{ backgroundImage: `url(${currentUser.avatar})` }} 
             onClick={props.onEditAvatar}>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__profession">{currentUser.about}</p>
          <button aria-label="Edit" 
                  type="button" 
                  className="profile__edit" 
                  onClick={props.onEditProfile}/>
        </div>

        <button aria-label="Add" 
                className="profile__add" 
                type="button" 
                onClick={props.onAddPlace}/>
      </section>

      <section className="cards">
        {props.cards.map((card) => 
          <Card
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          /> 
        )}
      </section>
  </main>
  );
}

export default Main;