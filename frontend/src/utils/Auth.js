export class Auth {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  signUp(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(this._checkResponse)
  };
  
  signIn(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(this._checkResponse)
  };
  
  checkToken(jwt) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then(this._checkResponse)
  };
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
});

export default auth;