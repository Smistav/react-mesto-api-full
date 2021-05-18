import logo from "../logo.svg";
import { Link, Switch, Route } from "react-router-dom";
function Header(props) {
  function handleSignOut() {
    props.onSignOut();
  }
  function handleMobileMenu() {
    document.querySelector(".header__popup").classList.toggle("header__popup_opened");
    document
      .querySelector(".header__button_type_authmobile")
      .classList.toggle("header__button_type_close");
  }
  return (
    <div className="header">
      <div className="header__popup">
        <button className="header__button header__button_type_popup">
          {props.email}
        </button>
        <button
          className="header__button header__button_type_popup"
          onClick={handleSignOut}
        >
          Выйти
        </button>
      </div>
      <div className="header__block">
        <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
        <div className="header__button-block">
          <Switch>
            <Route exact path="/">
              <button
                onClick={handleMobileMenu}
                className="header__button header__button_type_authmobile"
              ></button>
              <button className="header__button header__button_type_auth">
                {props.email}
              </button>
              <button
                className="header__button header__button_type_auth"
                onClick={handleSignOut}
              >
                Выйти
              </button>
            </Route>
            <Route path="/signup">
              <Link className="header__button" to="signin">
                Войти
              </Link>
            </Route>
            <Route path="/signin">
              <Link className="header__button" to="signup">
                Регистрация
              </Link>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
export default Header;
