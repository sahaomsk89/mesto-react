
import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App(props) {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({});
    }
    return (


        <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
            <Footer />

            <PopupWithForm title={'Редактировать профиль'} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}
                name={'profile'} buttonText={'Сохранить'}>
                <input type="text" placeholder="Введите имя" className="popup-form__input popup-form__input_name" id="name"
                    name="name"
                    minLength="2" maxLength="40" required autocomplete="off" />
                <span className="input-name-error popup-form__error"></span>
                <input type="text" placeholder="Описание" className="popup-form__input popup-form__input_job"
                    id="job"
                    name="job" minLength="2" maxLength="200" required autocomplete="off" />
                <span className="input-job-error popup-form__error"></span>
            </PopupWithForm>

            <PopupWithForm title={'Новое место'} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}
                name={'gallery'} buttonText={'Создать'}>
                <input type="text" placeholder="Название" className="popup-form__input popup-form__input_card-name" id="card-name"
                    name="name"
                    minLength="2" maxLength="30" required autocomplete="off" />
                <span className="input-name-error popup-form__error"></span>
                <input type="url" placeholder="Ссылка на картинку" className="popup-form__input popup-form__input_card-link"
                    id="card-link"
                    name="link" required autocomplete="off" />
                <span className="card-link-error popup-form__error"></span>
            </PopupWithForm>

            <PopupWithForm title={'Вы уверены?'} name={'delete'} buttonText={'Да'} />

            <PopupWithForm title={'Обновить аватар'} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}
                name={'avatar'} buttonText={'Сохранить'}>
                <input type="url" placeholder="Ссылка на картинку"
                    className="popup-form__input  popup-form__input_avatar" id="card-avatar" name="avatar-link" require autocomplete="off" />
                <span className="popup-form__error card-avatar-error"></span>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>

    );
}
export default App;