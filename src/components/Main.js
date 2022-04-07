import React from 'react';
import { api } from '../utils/Api.js'
import Card from './Card.js';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userInfo, cardInfo]) => {
        setUserName(userInfo.name)
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
        setCards(cardInfo)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-wrap">
          <button className="profile__avatar-overlay" type="button" aria-label="редактировать аватар" onClick={props.onEditAvatar}></button>
          <img className="profile__avatar" src={userAvatar} alt="Жак-Ив Кусто" />
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
          </div>

          <button className="profile__edit-button" type="button" aria-label="редактировать место" onClick={props.onEditProfile}>
          </button>
        </div>

        <button className="profile__add-button" type="button" aria-label="добавить место" onClick={props.onAddPlace}>
        </button>
      </section>

      <section className="gallery">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );


}

export default Main;


