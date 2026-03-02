import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./About.module.css";

const About = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("about");
  const lang = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const sections = useMemo(() => t("sections", { returnObjects: true }), [t]);

  const go = (to) => { if (to) navigate(to); };

  const onCardKeyDown = (e, to) => {
    if (!to) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(to); }
  };

  return (
      <article className={classes.about}>
        <header className={classes.header}>
          <div className={classes.headerInner}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </div>
          <div className={classes.headerLine} />
        </header>

        <section className={classes.grid}>
          {sections.map((s, i) => {
            const isCta = Boolean(s.cta);
            const clickable = Boolean(s.to);

            return (
                <article
                    key={i}
                    className={`${classes.card} ${classes[`card${i + 1}`]} ${isCta ? classes.ctaCard : ""} ${clickable ? classes.clickable : ""}`}
                    onClick={() => go(s.to)}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : -1}
                    onKeyDown={(e) => onCardKeyDown(e, s.to)}
                >
                  <div className={classes.cardInner}>
                    <div className={classes.cardTop}>
                      <span className={classes.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={classes.tag}>{s.subtitle}</span>
                      {clickable && <span className={classes.arrow} aria-hidden="true">↗</span>}
                    </div>

                    <h2 className={classes.title}>{s.title}</h2>
                    <p className={classes.text}>{s.text}</p>

                    {isCta && (
                        <div className={classes.ctaRow} onClick={(e) => e.stopPropagation()}>
                          <Link to="/contact" className={classes.linkWrapper}>
                            <button className={classes.ctaButton}>{s.ctaText}</button>
                          </Link>
                          {s.ctaHint && <p className={classes.ctaHint}>{s.ctaHint}</p>}
                        </div>
                    )}
                  </div>
                </article>
            );
          })}
        </section>
      </article>
  );
};

export default About;