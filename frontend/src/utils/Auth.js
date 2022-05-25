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

  signUp(email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(this._checkResponse)
  };
  
  signIn(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      })  
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
  baseUrl: 'https://api.withus.nomoredomains.xyz',
});

export default auth;

// scp -r ./build/* bmazur@51.250.76.140:/home/bmazur/react-mesto-api-full/frontend/build