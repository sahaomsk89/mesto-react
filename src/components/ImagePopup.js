import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image-container ${
        props.card.name && "popup_opened"
      }`}
    >
      <div className="popup__container-image">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
          aria-label="закрыть"
        ></button>
        <img
          className="popup__image-link"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__place-name">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
