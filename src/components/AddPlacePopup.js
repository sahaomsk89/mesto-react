import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState({});
  const [link, setlink] = React.useState({});

  function handleName(e) {
    setName(e.target.value);
  }

  function handlelink(e) {
    setlink(e.target.value);
  }

  const cardInputRef = React.useRef(null);
  const linkInputRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardInputRef.current.value,
      link: linkInputRef.current.value,
    });
  }
  React.useEffect(() => {
    setName("");
    setlink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name={"gallery"}
      buttonText={`${isLoading ? `Сохранение...` : `Создать`}`}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup-form__input popup-form__input_card-name"
        id="card-name"
        name="name"
        ref={cardInputRef}
        value={name}
        onChange={handleName}
        minLength="2"
        maxLength="30"
        required
        autocomplete="off"
      />
      <span className="input-name-error popup-form__error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup-form__input popup-form__input_card-link"
        id="card-link"
        ref={linkInputRef}
        value={link}
        onChange={handlelink}
        name="link"
        required
        autocomplete="off"
      />
      <span className="card-link-error popup-form__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
