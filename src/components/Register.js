import { Link } from 'react-router-dom';
import React from 'react';

export default function Register({ registerUser, buttonText }) {
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
    registerUser(formValue);
  };

  return (
    <div className="ident">
      <p className="ident__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} name="register" className="ident__form">
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

      <Link to="/sign-in" className="ident__login-link">
        Уже зарегистрированы? Войти
      </Link>

    </div>
  );
};