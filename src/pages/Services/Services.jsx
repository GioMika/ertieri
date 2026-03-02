import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./Services.module.css";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("services");

  const pageTitle    = t("h1");
  const pageSubtitle = t("lead");

  const tours = useMemo(() => {
    const data = t("tours", { returnObjects: true });
    return Array.isArray(data) ? data : [];
  }, [t]);

  const ui = useMemo(() => t("ui", { returnObjects: true }) || {}, [t]);

  const go = (to) => { if (to) navigate(to); };

  const onCardKeyDown = (e, to) => {
    if (!to) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(to); }
  };

  return (
      <article className={classes.services}>

        <header className={classes.header}>
          <div className={classes.headerInner}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            {pageSubtitle && <p className={classes.pageSubtitle}>{pageSubtitle}</p>}
          </div>
          <div className={classes.headerLine} />
        </header>

        <section className={classes.grid}>
          {tours.map((tour, i) => {
            const isLast  = i === tours.length - 1;
            const isOdd   = tours.length % 2 !== 0;
            const isCta   = isLast && isOdd;
            const clickable = Boolean(tour.link);

            return (
                <article
                    key={tour.link || i}
                    className={[
                      classes.card,
                      classes[`card${i + 1}`],
                      isCta ? classes.ctaCard : "",
                      clickable ? classes.clickable : "",
                    ].join(" ")}
                    onClick={() => go(tour.link)}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : -1}
                    onKeyDown={(e) => onCardKeyDown(e, tour.link)}
                >
                  <div className={classes.cardInner}>

                    <div className={classes.cardTop}>
                      <span className={classes.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={classes.tag}>{tour.pill || tour.subtitle}</span>
                    </div>

                    <h2 className={classes.title}>{tour.title}</h2>
                    {tour.subtitle && tour.pill && (
                        <p className={classes.subtitle}>{tour.subtitle}</p>
                    )}
                    <p className={classes.text}>{tour.text}</p>

                    {!isCta && clickable && (
                        <div className={classes.cardFooter}>
                          <span className={classes.more}>{ui.more || "Подробнее"}</span>
                          <span className={classes.arrowFooter} aria-hidden="true">↗</span>
                        </div>
                    )}

                    {isCta && (
                        <div className={classes.ctaRow} onClick={(e) => e.stopPropagation()}>
                          <Link to="/contact" className={classes.linkWrapper}>
                            <button className={classes.ctaButton}>
                              {ui.ctaText || tour.ctaText || "Связаться"}
                            </button>
                          </Link>
                          {ui.ctaHint && <p className={classes.ctaHint}>{ui.ctaHint}</p>}
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

export default Services;