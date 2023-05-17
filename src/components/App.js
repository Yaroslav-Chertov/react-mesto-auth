import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import { useEffect, useState } from 'react';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Main from './Main';

import * as auth from '../utils/auth';
import api from '../utils/Api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSignIn, setIsSignIn] = useState(true);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [userData, setUserData] = useState({ email: "" });

  useEffect(() => {
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUserData(jwt)
        .then((res) => {
          if (res) {
            const data = res.data;
            setUserData({ email: data.email });
            setIsLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, isLoggedIn]);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsOpenInfoTooltip(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCardAndUnLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(userCard) {
    api
      .createNewCard(userCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateUser(data) {
    api
      .createNewUser(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(avatar) {
    api
      .createNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function loginUser({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserData(email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setStatus(false);
        setIsOpenInfoTooltip(true);
        console.log(err);
      });
  };

  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setStatus(true);
        setIsOpenInfoTooltip(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setStatus(false);
        setIsOpenInfoTooltip(true);
        console.log(err);
      });
  };

  function logOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({
      email: "",
      password: "",
    });
    navigate("/sign-in");
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Header
          isLoggedIn={isLoggedIn}
          email={userData.email}
          logOut={logOut}
        />

        <Routes>
          <Route path='/'
            element={<ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onClose={closeAllPopups}
            />} />

          <Route path='/sign-up'
            element={<Register
              registerUser={registerUser}
              title='Регистрация'
              buttonText='Зарегистрироваться'
            />} />

          <Route path='/sign-in'
            element={<Login
              loginUser={loginUser}
              title='Вход'
              buttonText='Войти'
            />} />

          <Route
            path='/*'
            element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
          />
        </Routes>

        {isLoggedIn && <Footer />}

        <InfoTooltip
          isSignIn={isSignIn}
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

      </CurrentUserContext.Provider >
    </>
  );
};

export default App;