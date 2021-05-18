class AuthApi {
  constructor(options) {
    ({ baseUrl: this._baseUrl, headers: this._headers } = options);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  sign({ email, password }, endPoint) {
    return fetch(this._baseUrl + endPoint, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }
  checkToken(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        headers: this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }
}

const authApi = new AuthApi({
  baseUrl: "https://api.front15.smistav.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
export default authApi;
