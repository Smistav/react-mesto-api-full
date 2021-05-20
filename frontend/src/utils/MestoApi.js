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
  getInitialCards(jwt) {
    return fetch(this._baseUrl + "/cards", { headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` }}).then(
      this._checkResponse
    );
  }
  addNewCard({ name, link },jwt) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  getUserInfo(jwt) {
    return fetch(this._baseUrl + "/users/me", { headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` }}).then(
      this._checkResponse
    );
  }
  setUserInfo({ name, about },jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(id,jwt) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLike, jwt) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: isLike ? "PUT" : "DELETE",
       headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` }
    }).then(this._checkResponse);
  }

  setUserAvatar(avatar,jwt) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {'Content-Type': 'application/json', 
    'authorization': `Bearer ${jwt}` },
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}
const mestoApi = new MestoApi({
  //baseUrl: "https://api.front15.smistav.nomoredomains.icu",
  baseUrl: "http://localhost:3005",
  // headers: {
  //   'authorization': `Bearer ${localStorage.getItem("jwt")}`,
  //   'Content-Type': 'application/json',
  //   //'credentials': 'include',
  // },
});

export default mestoApi;
