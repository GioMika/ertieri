import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, MessageCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import classes from "./Header.module.css";
import logo from "./icon/logo.jpg";

const normalize = (lng) => (lng || "ru").split("-")[0].toLowerCase();

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const { t, i18n } = useTranslation("header");

  const currentCode = normalize(i18n.resolvedLanguage || i18n.language);

  const languages = useMemo(() => ["GE", "RU", "EN"], []);
  const langMap   = useMemo(() => ({ GE: "ge", RU: "ru", EN: "en" }), []);

  const activeLangLabel = useMemo(() => {
    if (currentCode === "ge") return "GE";
    if (currentCode === "en") return "EN";
    return "RU";
  }, [currentCode]);

  const menuItems = useMemo(
      () => [
        { title: t("header.menu.about"),    path: "/about"    },
        { title: t("header.menu.estate"),   path: "/estate"   },
        { title: t("header.menu.services"), path: "/services" },
        { title: t("header.menu.blog"),     path: "/blog"     },
        { title: t("header.menu.contact"),  path: "/contact"  },
      ],
      [t]
  );

  const emailAddress  = "hello@ertieri.com";
  const whatsappNumber = "995XXXXXXXXX";

  const isActive  = useCallback((path) => location.pathname === path, [location.pathname]);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  // close on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // lock scroll when drawer open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev  = document.body.style.overflow;
    const prevP = document.body.style.paddingRight;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevP;
    };
  }, [isMenuOpen, closeMenu]);

  const changeLang = useCallback(async (label) => {
    const next = langMap[label];
    if (!next) return;
    const nextCode = normalize(next);
    if (nextCode === currentCode) return;
    try { await i18n.changeLanguage(nextCode); } catch {}
  }, [i18n, langMap, currentCode]);

  return (
      <header className={classes.header}>

        {/* ── Pill bar ── */}
        <div className={`${classes.inner} ${isHome ? classes.innerTransparent : ""}`}>

          {/* Logo */}
          <Link to="/" className={classes.logo} aria-label={t("header.homeAria")}>
            <img src={logo} alt="Erti Eri" className={classes.logoImg} />
            <span className={classes.logoName}>Erti Eri</span>
          </Link>

          {/* Desktop nav */}
          <nav className={classes.nav} aria-label={t("header.navAria")}>
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                  <Link
                      key={item.path}
                      to={item.path}
                      className={`${classes.navLink} ${active ? classes.active : ""}`}
                      aria-current={active ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className={classes.actions}>
            <a
                className={classes.iconBtn}
                href={`mailto:${emailAddress}`}
                aria-label={t("header.emailAria")}
                title={t("header.emailTitle")}
            >
              <Mail size={16} />
            </a>

            <a
                className={classes.iconBtn}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("header.waAria")}
                title={t("header.waTitle")}
            >
              <MessageCircle size={16} />
            </a>

            <div className={classes.divider} aria-hidden="true" />

            <div className={classes.lang} role="group" aria-label={t("header.langAria")}>
              {languages.map((L) => (
                  <button
                      key={L}
                      type="button"
                      className={`${classes.langBtn} ${activeLangLabel === L ? classes.langActive : ""}`}
                      onClick={() => changeLang(L)}
                      aria-pressed={activeLangLabel === L}
                  >
                    {L}
                  </button>
              ))}
            </div>

            <button
                type="button"
                className={`${classes.burger} ${isMenuOpen ? classes.burgerOpen : ""}`}
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

        {/* ── Backdrop ── */}
        <div
            className={`${classes.backdrop} ${isMenuOpen ? classes.backdropOpen : ""}`}
            onClick={closeMenu}
            aria-hidden="true"
        />

        {/* ── Drawer ── */}
        <aside
            id="mobile-drawer"
            className={`${classes.drawer} ${isMenuOpen ? classes.drawerOpen : ""}`}
            aria-hidden={!isMenuOpen}
        >
          <div className={classes.drawerHeader}>
            <span className={classes.drawerBrand}>Erti Eri</span>
            <button
                className={classes.closeBtn}
                onClick={closeMenu}
                aria-label={t("header.closeMenu")}
                type="button"
            >
              <X size={16} />
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
                        className={`${classes.drawerLink} ${active ? classes.drawerActive : ""}`}
                        style={isMenuOpen ? { animationDelay: `${i * 0.055}s` } : undefined}
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
                  <Mail size={16} />
                </a>
                <a
                    className={classes.drawerIcon}
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("header.waAria")}
                >
                  <MessageCircle size={16} />
                </a>
              </div>

              <div className={classes.drawerLang} role="group" aria-label={t("header.langAria")}>
                {languages.map((L) => (
                    <button
                        key={L}
                        type="button"
                        className={`${classes.drawerLangBtn} ${activeLangLabel === L ? classes.drawerLangActive : ""}`}
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