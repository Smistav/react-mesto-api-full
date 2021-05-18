import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import mestoApi from "../utils/MestoApi";
import authApi from "../utils/AuthApi";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDelete from "./ConfirmDelete";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import InfoTooltips from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [
    isConfirmDeletePopupOpen,
    setIsConfirmDeletePopupOpen,
  ] = React.useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = React.useState();
  const [isInfoAuthOpen, setIsInfoAuthOpen] = React.useState(false);
  const [isResultAuth, setIsResultAuth] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  React.useEffect(() => {
    mestoApi
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    function checkToken() {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        authApi
          .checkToken(jwt)
          .then((data) => {
            setEmail(data.email);
            setIsLogged(true);
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    checkToken();
  }, [history]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(propsCard) {
    setSelectedCard(propsCard);
  }
  function handleUpdateUser(propsUser) {
    setIsLoading(true);
    mestoApi
      .setUserInfo(propsUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(propAvatar) {
    setIsLoading(true);
    mestoApi
      .setUserAvatar(propAvatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    mestoApi
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    mestoApi
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setIsConfirmDelete(card);
  }
  function handleConfirmDeleteSubmit() {
    setIsLoading(true);
    mestoApi
      .deleteCard(isConfirmDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== isConfirmDelete._id));
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    mestoApi
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoAuthOpen(false);
  }
  function closeEsc(evt) {
    if (evt.key === "Escape") closeAllPopups();
  }
  function closeOverlay(evt) {
    if (evt.target.className.includes("popup_form")) closeAllPopups();
  }
  function handleLogin(data) {
    setIsLoading(true);
    authApi
      .sign(data, "/signin")
      .then((jwt) => {
        if (jwt) {
          localStorage.setItem("jwt", jwt.token);
          setIsLogged(true);
          setIsLoading(false);
          setEmail(data.email);
          history.push("/");
        } else {
          throw jwt;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsResultAuth(false);
        setIsInfoAuthOpen(true);
        console.log(err);
      });
  }
  function handleRegister(onRegister) {
    setIsLoading(true);
    authApi
      .sign(onRegister, "/signup")
      .then(() => {
        setIsLoading(false);
        setIsResultAuth(true);
        setIsInfoAuthOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setIsLoading(false);
        setIsResultAuth(false);
        setIsInfoAuthOpen(true);
        console.log(err);
      });
  }

  function handleSignOut() {
    setIsLogged(false);
    setEmail("");
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        tabIndex="0"
        onKeyDown={closeEsc}
        onClick={closeOverlay}
        className="page"
      >
        {isLogged && (
          <Header onLogged={isLogged} email={email} onSignOut={handleSignOut} />
        )}
        <Switch>
          <ProtectedRoute
            loggedIn={isLogged}
            exact
            path="/"
            component={Main}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/signin">
            <Header onLogin={true} />
            <Login
              title="Вход"
              isLoading={isLoading}
              loadingButton="Вход..."
              buttonName="Войти"
              onLogin={handleLogin}
            />
          </Route>
          <Route path="/signup">
            <Header onRegister={true} />
            <Register
              title="Регистрация"
              isLoading={isLoading}
              loadingButton="Регистрация..."
              buttonName="Зарегистрироваться"
              onRegister={handleRegister}
            />
          </Route>
          <Route>
            {isLogged ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        {isLogged && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmDelete
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirmDeleteSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <InfoTooltips
          isOpen={isInfoAuthOpen}
          onClose={closeAllPopups}
          result={isResultAuth}
          textOk="Вы успешно зарегистрировались"
          textNotOk="Что-то пошло не так! Попробуйте ещё раз."
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
