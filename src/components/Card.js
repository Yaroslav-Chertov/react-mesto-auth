import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_liked'}`;

    function handleClickImage() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
        <li className="element">
            {isOwn &&
                <button className="element__delete-button" aria-label="удалить фото" onClick={handleDeleteClick} />
            }
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClickImage} />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} aria-label="поставить лайк" type="button" onClick={handleLikeClick} />
                    <p className="element__like-quantity">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
};

export default Card;