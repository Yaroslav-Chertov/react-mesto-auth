import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    };

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    };

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"profile"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={"Сохранить"}
        >
            <input
                className="form__input form__input_type_name"
                id="name-input"
                name="name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="name-input-error form__input-error"></span>
            <input
                className="form__input form__input_type_about"
                id="about-input"
                name="about"
                type="text"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={description || ''}
                onChange={handleChangeDescription}
            />
            <span className="about-input-error form__input-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;