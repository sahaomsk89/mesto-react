import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [avatar, setAvatar] = React.useState({});

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  const avatarInputRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  React.useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name={"avatar"}
      buttonText={`${isLoading ? `Сохранение...` : `Сохранить`}`}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarInputRef}
        value={avatar}
        onChange={handleAvatar}
        className="popup-form__input  popup-form__input_avatar"
        id="card-avatar"
        name="avatar-link"
        require
        autocomplete="off"
      />
      <span className="popup-form__error card-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
