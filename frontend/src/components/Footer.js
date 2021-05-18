import React from "react";
function Footer() {
  const year = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {year.toLocaleString("ru-Ru", { year: "numeric" })} Mesto Russia
      </p>
    </footer>
  );
}
export default Footer;
