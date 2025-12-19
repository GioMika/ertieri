import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, MessageCircle, X } from "lucide-react";
import classes from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");
  const location = useLocation();

  const menuItems = useMemo(
      () => [
        { title: "О нас", path: "/about" },
        { title: "Туры", path: "/services" },
        { title: "Блог", path: "/blog" },
        { title: "Контакты", path: "/contact" },
      ],
      []
  );

  const languages = ["GE", "RU", "EN"];
  const emailAddress = "hello@ertieri.com";
  const whatsappNumber = "995XXXXXXXXX";

  const isActive = (path) => location.pathname === path;

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // ESC close + lock body scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    if (isMenuOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <Link to="/" className={classes.logo} onClick={closeMenu}>
            ERTI ERI
          </Link>

          {/* Desktop nav */}
          <nav className={classes.nav} aria-label="Главное меню">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`${classes.navLink} ${isActive(item.path) ? classes.active : ""}`}
                >
                  {item.title}
                </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className={classes.actions}>
            <a
                className={classes.iconBtn}
                href={`mailto:${emailAddress}`}
                aria-label="Email"
                title="Email"
            >
              <Mail size={18} />
            </a>

            <a
                className={classes.iconBtn}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            {/* Desktop language */}
            <div className={classes.lang} role="group" aria-label="Язык">
              {languages.map((L) => (
                  <button
                      key={L}
                      type="button"
                      className={`${classes.langBtn} ${currentLang === L ? classes.langActive : ""}`}
                      onClick={() => setCurrentLang(L)}
                  >
                    {L}
                  </button>
              ))}
            </div>

            {/* Mobile burger */}
            <button
                type="button"
                className={classes.burger}
                onClick={openMenu}
                aria-label="Открыть меню"
                aria-expanded={isMenuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Drawer */}
        <div className={`${classes.drawer} ${isMenuOpen ? classes.drawerOpen : ""}`}>
          <div className={classes.drawerHeader}>
            <span className={classes.drawerBrand}>ERTI ERI</span>

            <button className={classes.closeBtn} onClick={closeMenu} aria-label="Закрыть меню">
              <X size={18} />
            </button>
          </div>

          <nav className={classes.drawerNav} aria-label="Мобильное меню">
            {menuItems.map((item, i) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`${classes.drawerLink} ${isActive(item.path) ? classes.drawerActive : ""}`}
                    onClick={closeMenu}
                    style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {item.title}
                </Link>
            ))}
          </nav>

          <div className={classes.drawerFooter}>
            <div className={classes.drawerQuick}>
              <a className={classes.drawerIcon} href={`mailto:${emailAddress}`} aria-label="Email">
                <Mail size={18} />
              </a>
              <a
                  className={classes.drawerIcon}
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            <div className={classes.drawerLang} role="group" aria-label="Язык">
              {languages.map((L) => (
                  <button
                      key={L}
                      type="button"
                      className={`${classes.drawerLangBtn} ${
                          currentLang === L ? classes.drawerLangActive : ""
                      }`}
                      onClick={() => setCurrentLang(L)}
                  >
                    {L}
                  </button>
              ))}
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {isMenuOpen && <div className={classes.backdrop} onClick={closeMenu} />}
      </header>
  );
};

export default Header;
