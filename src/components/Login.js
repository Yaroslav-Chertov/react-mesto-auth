import React from 'react';

export default function Login({ loginUser, buttonText }) {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: "",
    });

    function handleChange(evt) {
        const input = evt.target;

        setFormValue({
            ...formValue,
            [input.name]: input.value,
        });
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        loginUser(formValue);
    };

    return (
        <div className="ident">
            <p className="ident__welcome">Вход</p>
            <form onSubmit={handleSubmit} name="login" className="ident__form">
                <input
                    name="email"
                    type="email"
                    className="ident__input"
                    value={formValue.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    className="ident__input"
                    value={formValue.password}
                    placeholder="Пароль"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="ident__link">
                    {buttonText}
                </button>
            </form>
        </div>
    );
};