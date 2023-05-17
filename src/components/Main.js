import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container-info">
                    <div className="profile__container-avatar">
                        <img src={currentUser.avatar} className="profile__avatar" alt="Аватар профиля." />
                        <button onClick={onEditAvatar} className="profile__avatar-edit-button"
                            aria-label="открыть форму редактирования аватара"></button>
                    </div>
                    <div className="profile__user">
                        <div className="profile__info">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__caption">{currentUser.about}</p>
                        </div>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="редактировать профиль">
                        </button>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="добавить фото"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />)
                    })}
                </ul>
            </section>
        </main>
    );
};

export default Main;