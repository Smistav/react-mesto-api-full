class MestoApi {
  constructor(options) {
    ({ baseUrl: this._baseUrl, headers: this._headers } = options);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { headers: this._headers }).then(
      this._checkResponse
    );
  }
  addNewCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", { headers: this._headers }).then(
      this._checkResponse
    );
  }
  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLike) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: isLike ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}
const mestoApi = new MestoApi({
  //baseUrl: "https://api.front15.smistav.nomoredomains.icu",
  baseUrl: "http://localhost:3005",
  headers: {
    'authorization': `Bearer ${localStorage.getItem("jwt")}`,
    'Content-Type': 'application/json',
    //'credentials': 'include',
  },
});

export default mestoApi;
