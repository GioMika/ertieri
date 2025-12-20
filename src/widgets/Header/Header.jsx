import React, { useMemo, useState, useEffect, useCallback } from "react";
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
        { title: "Услуги", path: "/services" },
        { title: "Блог", path: "/blog" },
        { title: "Контакты", path: "/contact" },
      ],
      []
  );

  const languages = useMemo(() => ["GE", "RU", "EN"], []);
  const emailAddress = "hello@ertieri.com";
  const whatsappNumber = "995XXXXXXXXX";

  const isActive = useCallback(
      (path) => location.pathname === path,
      [location.pathname]
  );

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  // ✅ Закрывать меню при смене роута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ✅ ESC close + lock body scroll + компенсация скроллбара
  useEffect(() => {
    if (!isMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isMenuOpen, closeMenu]);

  return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <Link to="/" className={classes.logo} aria-label="На главную">
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
            <a className={classes.iconBtn} href={`mailto:${emailAddress}`} aria-label="Email" title="Email">
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
                      aria-pressed={currentLang === L}
                  >
                    {L}
                  </button>
              ))}
            </div>

            {/* Mobile burger */}
            <button
                type="button"
                className={`${classes.burger} ${isMenuOpen ? classes.burgerOpen : ""}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-drawer"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Backdrop */}
        <div
            className={`${classes.backdrop} ${isMenuOpen ? classes.backdropOpen : ""}`}
            onClick={closeMenu}
            aria-hidden="true"
        />

        {/* Drawer */}
        <aside
            id="mobile-drawer"
            className={`${classes.drawer} ${isMenuOpen ? classes.drawerOpen : ""}`}
            aria-hidden={!isMenuOpen}
        >
          <div className={classes.drawerHeader}>
            <span className={classes.drawerBrand}>ERTI ERI</span>

            <button className={classes.closeBtn} onClick={closeMenu} aria-label="Закрыть меню" type="button">
              <X size={18} />
            </button>
          </div>

          {/* ✅ ВАЖНО: всё, что нужно — СРАЗУ ПОД ссылками */}
          <div className={classes.drawerBody}>
            <nav className={classes.drawerNav} aria-label="Мобильное меню">
              {menuItems.map((item, i) => (
                  <Link
                      key={item.path}
                      to={item.path}
                      className={`${classes.drawerLink} ${isActive(item.path) ? classes.drawerActive : ""}`}
                      style={isMenuOpen ? { animationDelay: `${i * 0.06}s` } : undefined}
                  >
                    {item.title}
                  </Link>
              ))}
            </nav>

            {/* ✅ Иконки + языки — сразу под последней ссылкой */}
            <div className={classes.drawerTools}>
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
                        aria-pressed={currentLang === L}
                    >
                      {L}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </header>
  );
};

export default Header;
