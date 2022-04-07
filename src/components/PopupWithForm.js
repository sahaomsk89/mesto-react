import React from 'react';

function PopupWithForm(props) {
  const name = props.name;
  const title = props.title;
  const buttonText = props.buttonText;
  const children = props.children;
  return (

    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
        <h2 className={`popup__title popup__title_for${name}`}>{title}</h2>
        <form className={`popup-form popup-form__input_${name}`} name={name} action="#" method="post">
          {children}
          <button className={`popup-form__button popup-form__button_for_${name}`} type="submit"> {buttonText} </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;