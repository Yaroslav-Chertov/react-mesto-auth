import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    };

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link,
        });
    };

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add-card"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={"Создать"}
        >
            <input
                className="form__input form__input_type_image-title"
                id="place-input"
                name="name"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="place-input-error form__input-error"></span>
            <input
                className="form__input form__input_type_image-url"
                id="link-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required
                value={link || ''}
                onChange={handleLinkChange}
            />
            <span className="link-input-error form__input-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;