import React, { useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./Services.module.css";
import back from '../../../public/back.mp4';

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

// Мемоизированная карточка тура
const TourCard = memo(({ tour, index, uiMore }) => {
  // Динамический класс для темы карточки
  const cardClass = `${classes.card} ${classes[`card${(index % 5) + 1}`]}`;

  return (
      <Link
          to={tour.link}
          className={classes.cardLink}
          aria-label={`${tour.title}. Подробнее`}
      >
        <article className={cardClass}>
          <div className={classes.cardTop}>
            <div className={classes.num}>{String(index + 1).padStart(2, "0")}</div>
            <div className={classes.pill}>{tour.pill}</div>
          </div>

          <h2 className={classes.title}>{tour.title}</h2>
          <div className={classes.subtitle}>{tour.subtitle}</div>

          <p className={classes.text}>{tour.text}</p>

          <div className={classes.footer}>
            <span className={classes.more}>{uiMore || "Узнать больше"}</span>
            <span className={classes.arrow} aria-hidden="true">→</span>
          </div>
        </article>
      </Link>
  );
});

const Services = () => {
  const { t, i18n } = useTranslation("services");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  // Мемоизация данных
  const meta = useMemo(() => t("meta", { returnObjects: true }) || {}, [t]);
  const tours = useMemo(() => {
    const data = t("tours", { returnObjects: true });
    return Array.isArray(data) ? data : [];
  }, [t]);
  const h1 = t("h1");
  const ui = useMemo(() => t("ui", { returnObjects: true }) || {}, [t]);

  // JSON-LD структурированные данные
  const jsonLd = useMemo(() => {
    const inLanguage = lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE";
    const canonical = meta?.canonical || `https://ertieri.ge/${lang}/services`;

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta?.title || "Туры и услуги Erti Eri",
      description: meta?.description,
      url: canonical,
      inLanguage,
      isPartOf: {
        "@type": "WebSite",
        name: "Erti Eri",
        url: "https://ertieri.ge"
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: tours.length,
        itemListElement: tours.map((tour, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: tour?.title,
            description: tour?.text,
            url: `https://ertieri.ge${tour?.link || "/services"}`,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock"
            }
          }
        }))
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://ertieri.ge"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Услуги",
            item: canonical
          }
        ]
      }
    };
  }, [lang, meta, tours]);

  const ogImage = "https://ertieri.ge/og-services.jpg";
  const canonical = meta?.canonical || `https://ertieri.ge/${lang}/services`;
  const ogLocale = meta?.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE");

  return (
      <>
        {/* SEO Meta теги */}
        <html lang={lang} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        {/* hreflang */}
        {meta?.alternates?.ru && (
            <link rel="alternate" hrefLang="ru" href={meta.alternates.ru} />
        )}
        {meta?.alternates?.en && (
            <link rel="alternate" hrefLang="en" href={meta.alternates.en} />
        )}
        {meta?.alternates?.ka && (
            <link rel="alternate" hrefLang="ka" href={meta.alternates.ka} />
        )}
        {meta?.alternates?.en && (
            <link rel="alternate" hrefLang="x-default" href={meta.alternates.en} />
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle || meta.title} />
        <meta property="og:description" content={meta.ogDescription || meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Erti Eri" />
        <meta property="og:locale" content={ogLocale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle || meta.title} />
        <meta name="twitter:description" content={meta.ogDescription || meta.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        {/* Основной контент */}
        <section className={classes.services}>
          {/* Видео фон */}
          <div className={classes.videoBackground}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className={classes.video}
                poster="/video-poster.jpg"
            >
              <source src={back} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <div className={classes.videoOverlay} />
          </div>

          <div className={classes.shell}>
            <header className={classes.header}>
              <h1 className={classes.h1}>{h1}</h1>
            </header>

            <div className={classes.grid}>
              {tours.map((tour, idx) => (
                  <TourCard
                      key={tour.link || idx}
                      tour={tour}
                      index={idx}
                      uiMore={ui?.more}
                  />
              ))}
            </div>
          </div>
        </section>
      </>
  );
};

export default Services;