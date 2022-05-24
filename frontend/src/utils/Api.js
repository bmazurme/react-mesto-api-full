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
        headers: this._options.headers
      })
      .then(this._checkResponse);
  }

  patchUser({name, about}) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
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
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: this._options.headers,
    })
    .then(this._checkResponse);
  }

  postCard({name, link}) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',  
      headers: this._options.headers,
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
      headers: this._options.headers,
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'fcfa5c3a-c07d-49f3-a47d-0099ff285712',
    'Content-Type': 'application/json'
  }
});

export default api;