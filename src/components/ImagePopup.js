import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
    return (
        <div className={`popup popup_content-image popup_type_view-photo ${isOpen && "popup_opened"}`}>
            <div className="place">
                <div className="place__figure">
                    <img className="place__picture" src={card.link} alt={card.name} />
                    <h2 className="place__caption">{card.name}</h2>
                    <button onClick={onClose} type="button" className="popup__close-button" aria-label="закрыть"></button>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;