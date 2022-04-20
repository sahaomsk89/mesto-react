import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isCardDeletePopupOpen, setisCardDeletePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectCard, setSelectCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userInfo, cardInfo]) => {
        setCurrentUser(userInfo);
        setCards(cardInfo);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      api
        .deletelike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api
      .editProfile(userInfo.name, userInfo.about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatarInfo) => {
    api
      .getAvatar(avatarInfo.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleAddPlaceSubmit = (inputCard) => {
    //console.log(inputCard)
    setIsLoading(true);
    api
      .addCard(inputCard.name, inputCard.link)

      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleDeleteClick(card) {
    setisCardDeletePopupOpen(true);
    setSelectCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisCardDeletePopupOpen(false);
    setSelectedCard(false);
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
        <Footer />
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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          card={selectCard}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
