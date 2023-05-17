class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    };

    _getHeaders() {
        return {
            authorization: this._token,
            'content-type': 'application/json',
        };
    };

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    };

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    };

    createNewUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._getJson);
    };

    createNewAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._getJson);
    };

    createNewCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify(item),
        }).then(this._getJson);
    };

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._getJson);
    };

    likeCardAndUnLike(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: this._getHeaders(),
        }).then(this._getJson);
      }
};

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-61',
    '6a1833eb-800a-4ae7-9f24-46696a199881'
);

export default api;