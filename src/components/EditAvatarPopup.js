import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);


    function handleSubmit(evt) {
        evt.preventDefault();
        
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    };

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"update-avatar"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={"Сохранить"}
        >
            <input
                className="form__input form__input_type_avatar-url"
                id="avatar-input"
                name="avatar"
                type="url"
                placeholder="Ссылка на картинку"
                required
                ref={inputRef}
            />
            <span className="avatar-input-error form__input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;