import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (

    <div className="gallery__cart">
      <button type="button" className="gallery__delete-button"></button>
      <img className="gallery__view-button gallery__item" alt={props.card.name} src={props.card.link} onClick={handleClick} />
      <div className="gallery__description">
        <div className="gallery__list-item">
          <h2 className="gallery__title">{props.card.name}</h2>
          <div className="photo__likes-block">
            <button className="gallery__button" type="button" aria-label="поставить лайк"></button>
            <span className="card-like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Card;