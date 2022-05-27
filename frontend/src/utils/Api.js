export class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse);
  }

  patchUser({name, about}) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }

  patchAvatar({avatar}) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  postCard({name, link}) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',  
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  changeLike(cardId, value) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: value ? 'PUT' : 'DELETE',  
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.withus.nomoredomains.xyz',
});

export default api;