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
import InfoTooltip from './popups/InfoTooltip';
import Login from "./identity/Login.js";
import Register from "./identity/Register.js";
import ProtectedRoute from './ProtectedRoute';
import { config } from '../utils/config';
import resetForms, { FormValidator } from '../utils/FormValidator';
import {
  Route,
  Switch,
  Redirect,
  useHistory 
} from "react-router-dom";

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
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const formValidators = {};

  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll('.form_type'));//config.formSelector));

    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  enableValidation(config);
  
  function escFunction(event){
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    api.getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
    api.getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  },
  // eslint-disable-next-line 
  []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push(`/${config.ROOT_URL}`);
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате.");
          }
          console.log(err);
        });
    }
  }, [history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
       .then((newCard) => {
         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
       .catch((err) => console.log(err));;
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
    resetForms(config.forms, formValidators);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.patchUser(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.patchAvatar(data)
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

  function handleLoginSubmit(data) {
    auth.signIn(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(data.email);
        history.push(`/${config.ROOT_URL}`);
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

  function handleRegisterSubmit(data) {
    auth.signUp(data)
      .then((res) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.replace({pathname: `/${config.ROOT_URL}/sign-in`});
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
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail('');
    history.push(`/${config.ROOT_URL}/sign-in`);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
        />

        <Switch>
          <ProtectedRoute 
            exact path={`/${config.ROOT_URL}`}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDeleteConfirm}
            cards={cards}
            component={Main}
            isLoading={isLoading}
          />

          <Route path={`/${config.ROOT_URL}/sign-in`}>
            <Login onLogin={handleLoginSubmit} />
          </Route>

          <Route path={`/${config.ROOT_URL}/sign-up`}>
            <Register onRegister={handleRegisterSubmit}/>
          </Route>

          <Route path="*">
            {
              isLoggedIn 
                ? (<Redirect to={`/${config.ROOT_URL}`} />) 
                : (<Redirect to={`/${config.ROOT_URL}/sign-in`} />) 
            }
          </Route>

        </Switch>

        <Footer/>
           
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        /> 
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          isLoading={isLoading}
          card={deletedCard}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          title="Вы уверены?"
          buttonText="Да"
        />
        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          text={
            isSuccess 
              ? 'Вы успешно зарегистрировались!' 
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;