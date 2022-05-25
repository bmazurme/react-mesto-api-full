import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './popups/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import auth from '../utils/Auth';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import PopupWithConfirm from './popups/PopupWithConfirm';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./identity/Login.js";
import Register from "./identity/Register.js";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './popups/InfoTooltip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth.checkToken(jwt)
          .then((res) => {
            setIsLoggedIn(true);
            setEmail(res.email);
            history.push("/");
          })
          .catch((err) => {
            if (err.status === 401) {
              console.log("401 — Токен не передан или передан не в том формате.");
            }
            console.log(err);
          });
    }
  }, [history]);

  React.useEffect(() => {
      Promise.all([api.getCards(), api.getUser()])
      .then(([cards, userData, res]) => { 
        console.log('=>');
        console.log(cards);
        setCards(cards);
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
    setIsSuccess(false);
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api.patchUser({name, about})
       .then((userInfo) => {
          setCurrentUser(userInfo);
          setIsLoading(false);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.patchAvatar({avatar})
       .then((userInfo) => {
         setCurrentUser(userInfo);
         setIsLoading(false);
         closeAllPopups();
       })
       .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.postCard(card)
       .then((newCard) => {
         setCards([newCard, ...cards]);
         setIsLoading(false);
         closeAllPopups();
       })
       .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirm(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
       .then(() => {
         const newCards = cards.filter((_card) => _card !== card);
         setCards(newCards);
         setIsLoading(false);
         closeAllPopups();
       })
       .catch((err) => console.log(err));
  }

  function handleLoginSubmit(email, password) {
    auth.signIn(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true); 
        setIsSuccess(false); 

        if (err.status === 400) {
          console.log("400 - не передано одно из полей.");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден.");
        }
        console.log(err);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.signUp(email, password)
        .then((res) => {
          setIsInfoToolTipPopupOpen(true);
          setIsSuccess(true);
          history.push("/sign-in");
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 - некорректно заполнено одно из полей.");
          }
          console.log('400 - некорректно заполнено одно из полей');
          console.log(err);
          setIsInfoToolTipPopupOpen(true);
          setIsSuccess(false);
        });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/sign-in");
  }

  function escFunction(event){
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }
  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  });
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut}/>

        <Switch>
          <ProtectedRoute
            exact path="/"
            isLoggedIn={true}
            cards={cards}
            isLoading={isLoading}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDeleteConfirm}                          
            component={Main}                          
          />

          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit}/>
          </Route>

          <Route>
            {isLoggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />) }
          </Route>

        </Switch>

        <Footer/>
           
        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups} 
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}
        /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading}
        />
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />
        <PopupWithConfirm isOpen={isConfirmPopupOpen}
                          isLoading={isLoading}
                          card={deletedCard}
                          onClose={closeAllPopups}
                          onSubmit={handleCardDelete}
                          title="Вы уверены?"
                          buttonText="Да"
        />
        <InfoTooltip isOpen={isInfoToolTipPopupOpen}
                     onClose={closeAllPopups}
                     isSuccess={isSuccess}
                     text={isSuccess 
                            ? 'Вы успешно зарегистрировались!' 
                            : 'Что-то пошло не так! Попробуйте ещё раз.'}
                     />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;