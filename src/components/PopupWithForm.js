import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}>
            <div className="popup__container">
                <form className={`form form_type_${name}`} name={name} noValidate onSubmit={onSubmit}>
                    <h3 className="form__header">{title}</h3>
                    <div className="form__fieldset">{children}
                        <button type="submit" className="form__save-button">{buttonText}</button>
                    </div>
                    <button type="reset" className="popup__close-button" aria-label="закрыть" onClick={onClose}></button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;