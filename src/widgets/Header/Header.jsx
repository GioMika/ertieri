import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, MessageCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import classes from "./Header.module.css";

const normalize = (lng) => (lng || "ru").split("-")[0].toLowerCase();

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { t, i18n } = useTranslation("common");

  // Реальный текущий язык из i18next
  const currentCode = normalize(i18n.resolvedLanguage || i18n.language);

  // Твои кнопки в UI (как было)
  const languages = useMemo(() => ["GE", "RU", "EN"], []);

  // Маппинг UI -> i18n language code
  const langMap = useMemo(() => ({ GE: "ge", RU: "ru", EN: "en" }), []);

  // Определяем активную кнопку из i18n
  const activeLangLabel = useMemo(() => {
    if (currentCode === "ge") return "GE";
    if (currentCode === "en") return "EN";
    return "RU";
  }, [currentCode]);

  // Меню — ТОЛЬКО тексты через i18next, пути не трогаем
  const menuItems = useMemo(
      () => [
        { title: t("header.menu.about"), path: "/about" },
        { title: t("header.menu.services"), path: "/services" },
        { title: t("header.menu.blog"), path: "/blog" },
        { title: t("header.menu.contact"), path: "/contact" },
      ],
      [t]
  );

  const emailAddress = "hello@ertieri.com";
  const whatsappNumber = "995XXXXXXXXX";

  const isActive = useCallback(
      (path) => location.pathname === path,
      [location.pathname]
  );

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

    const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

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

  const changeLang = useCallback(
      async (label) => {
        const next = langMap[label];
        if (!next) return;

        const nextCode = normalize(next);
        if (nextCode === currentCode) return;

        try {
          await i18n.changeLanguage(nextCode);
        } catch (e) {
          // no-op
        }
      },
      [i18n, langMap, currentCode]
  );

  return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <Link to="/" className={classes.logo} aria-label={t("header.homeAria")}>
            ERTI ERI
          </Link>

          {/* Desktop nav */}
          <nav className={classes.nav} aria-label={t("header.navAria")}>
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                  <Link
                      key={item.path}
                      to={item.path}
                      className={`${classes.navLink} ${
                          active ? classes.active : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className={classes.actions}>
            <a
                className={classes.iconBtn}
                href={`mailto:${emailAddress}`}
                aria-label={t("header.emailAria")}
                title={t("header.emailTitle")}
            >
              <Mail size={18} />
            </a>

            <a
                className={classes.iconBtn}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("header.waAria")}
                title={t("header.waTitle")}
            >
              <MessageCircle size={18} />
            </a>

            {/* Desktop language */}
            <div className={classes.lang} role="group" aria-label={t("header.langAria")}>
              {languages.map((L) => (
                  <button
                      key={L}
                      type="button"
                      className={`${classes.langBtn} ${
                          activeLangLabel === L ? classes.langActive : ""
                      }`}
                      onClick={() => changeLang(L)}
                      aria-pressed={activeLangLabel === L}
                  >
                    {L}
                  </button>
              ))}
            </div>

            {/* Mobile burger */}
            <button
                type="button"
                className={`${classes.burger} ${
                    isMenuOpen ? classes.burgerOpen : ""
                }`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
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
            className={`${classes.backdrop} ${
                isMenuOpen ? classes.backdropOpen : ""
            }`}
            onClick={closeMenu}
            aria-hidden="true"
        />

        {/* Drawer */}
        <aside
            id="mobile-drawer"
            className={`${classes.drawer} ${
                isMenuOpen ? classes.drawerOpen : ""
            }`}
            aria-hidden={!isMenuOpen}
        >
          <div className={classes.drawerHeader}>
            <span className={classes.drawerBrand}>{t("header.drawerBrand")}</span>

            <button
                className={classes.closeBtn}
                onClick={closeMenu}
                aria-label={t("header.closeMenu")}
                type="button"
            >
              <X size={18} />
            </button>
          </div>

          <div className={classes.drawerBody}>
            <nav className={classes.drawerNav} aria-label={t("header.drawerMenuAria")}>
              {menuItems.map((item, i) => {
                const active = isActive(item.path);
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`${classes.drawerLink} ${
                            active ? classes.drawerActive : ""
                        }`}
                        style={isMenuOpen ? { animationDelay: `${i * 0.06}s` } : undefined}
                        aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                );
              })}
            </nav>

            <div className={classes.drawerTools}>
              <div className={classes.drawerQuick}>
                <a
                    className={classes.drawerIcon}
                    href={`mailto:${emailAddress}`}
                    aria-label={t("header.emailAria")}
                >
                  <Mail size={18} />
                </a>

                <a
                    className={classes.drawerIcon}
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("header.waAria")}
                >
                  <MessageCircle size={18} />
                </a>
              </div>

              <div className={classes.drawerLang} role="group" aria-label={t("header.langAria")}>
                {languages.map((L) => (
                    <button
                        key={L}
                        type="button"
                        className={`${classes.drawerLangBtn} ${
                            activeLangLabel === L ? classes.drawerLangActive : ""
                        }`}
                        onClick={() => changeLang(L)}
                        aria-pressed={activeLangLabel === L}
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
