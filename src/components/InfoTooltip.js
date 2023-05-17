import React from 'react';
import ok from '../images/succees.svg';
import error from '../images/error.svg';

const InfoTooltip = ({ status, isOpen, onClose }) => {

    const statusImg = status ? ok : error;
    const statusText = status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <section className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container__tooltip">
                <button
                    aria-label="закрыть"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
                <section className="tooltip__section">
                    <img className="tooltip__image" alt="Внимание" src={statusImg} />
                    <p className="tooltip__text">{statusText}</p>
                </section>
            </div>
        </section>
    );
};

export default InfoTooltip;