import React, { useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./Services.module.css";

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const TourCard = memo(({ tour, index, isLast, isOdd, uiMore }) => {
  const isDark = isLast && isOdd;
  const colorIndex = (index % 4) + 1;

  const cardClass = [
    classes.card,
    isDark ? classes.cardDark : classes[`card${colorIndex}`],
  ].join(" ");

  return (
      <Link
          to={tour.link}
          className={classes.cardLink}
          aria-label={tour.title}
          style={isDark ? { gridColumn: "1 / -1" } : undefined}
      >
        <article className={cardClass}>
          <div className={classes.cardInner}>
            <div className={classes.cardTop}>
              <span className={classes.num}>{String(index + 1).padStart(2, "0")}</span>
              {tour.pill && <span className={classes.pill}>{tour.pill}</span>}
            </div>

            <div className={classes.cardBody}>
              <h2 className={classes.title}>{tour.title}</h2>
              {tour.subtitle && (
                  <div className={classes.subtitle}>{tour.subtitle}</div>
              )}
              <p className={classes.text}>{tour.text}</p>
            </div>

            <div className={classes.cardArrow}>
              <span className={classes.more}>{uiMore || "Learn more"}</span>
              <span className={classes.arrowCircle} aria-hidden="true">↗</span>
            </div>
          </div>
        </article>
      </Link>
  );
});

const Services = () => {
  const { t } = useTranslation("services");

  const tours = useMemo(() => {
    const data = t("tours", { returnObjects: true });
    return Array.isArray(data) ? data : [];
  }, [t]);

  const h1 = t("h1");
  const lead = t("lead");
  const ui = useMemo(() => t("ui", { returnObjects: true }) || {}, [t]);

  const isOdd = tours.length % 2 !== 0;

  return (
      <section className={classes.services}>

        <header className={classes.header}>
          <h1 className={classes.h1}>{h1}</h1>
          <div className={classes.headerLine} />
        </header>

        <div className={classes.grid}>
          {tours.map((tour, idx) => (
              <TourCard
                  key={tour.link || idx}
                  tour={tour}
                  index={idx}
                  isLast={idx === tours.length - 1}
                  isOdd={isOdd}
                  uiMore={ui?.more}
              />
          ))}
        </div>

      </section>
  );
};

export default Services;