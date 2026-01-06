import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import classes from "./Services.module.css";

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const Services = () => {
  const { t, i18n } = useTranslation("services");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  // ✅ тянем всё из JSON (и массив тоже)
  const meta = t("meta", { returnObjects: true });
  const tours = t("tours", { returnObjects: true });
  const h1 = t("h1");
  const ui = t("ui", { returnObjects: true });

  // ✅ JSON-LD: CollectionPage + ItemList (максимум для индексации)
  const jsonLd = useMemo(() => {
    const inLanguage =
        lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE";

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta?.title,
      description: meta?.description,
      url: meta?.canonical,
      inLanguage,
      isPartOf: { "@type": "WebSite", name: "Erti Eri", url: "https://ertieri.ge" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: (Array.isArray(tours) ? tours : []).map((tour, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: tour?.title,
          url: `https://ertieri.ge${tour?.link || "/services"}`
        }))
      }
    };
  }, [lang, meta?.title, meta?.description, meta?.canonical, tours]);

  // ✅ fallback на случай если JSON не подгрузился (чтобы не крашилось)
  const safeMeta = meta || {};
  const safeTours = Array.isArray(tours) ? tours : [];

  return (
      <>
        {/* ✅ SEO / Helmet */}
        <Helmet>
          <html lang={lang} />

          <title>{safeMeta.title}</title>
          <meta name="description" content={safeMeta.description} />
          <meta name="keywords" content={safeMeta.keywords} />
          <meta name="robots" content="index, follow" />
          {safeMeta.canonical && <link rel="canonical" href={safeMeta.canonical} />}

          {/* hreflang */}
          {safeMeta?.alternates?.ru && (
              <link rel="alternate" hrefLang="ru" href={safeMeta.alternates.ru} />
          )}
          {safeMeta?.alternates?.en && (
              <link rel="alternate" hrefLang="en" href={safeMeta.alternates.en} />
          )}
          {safeMeta?.alternates?.ka && (
              <link rel="alternate" hrefLang="ka" href={safeMeta.alternates.ka} />
          )}
          {safeMeta?.alternates?.en && (
              <link rel="alternate" hrefLang="x-default" href={safeMeta.alternates.en} />
          )}

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={safeMeta.ogTitle || safeMeta.title} />
          <meta property="og:description" content={safeMeta.ogDescription || safeMeta.description} />
          <meta property="og:url" content={safeMeta.canonical} />
          <meta property="og:image" content="https://ertieri.ge/og-services.jpg" />
          <meta property="og:site_name" content="Erti Eri" />
          <meta property="og:locale" content={safeMeta.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE")} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={safeMeta.ogTitle || safeMeta.title} />
          <meta name="twitter:description" content={safeMeta.ogDescription || safeMeta.description} />
          <meta name="twitter:image" content="https://ertieri.ge/og-services.jpg" />

          {/* JSON-LD */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* ✅ ТВОЯ ВЕРСТКА 1:1 — переходы и структура не меняются */}
        <section className={classes.services}>
          <div className={classes.shell}>
            <header className={classes.header}>
              <h1 className={classes.h1}>{h1}</h1>
            </header>

            <div className={classes.grid}>
              {safeTours.map((tour, idx) => (
                  <Link
                      key={tour.link}
                      to={tour.link}
                      className={classes.cardLink}
                      aria-label={`${tour.title}. ${ui?.open || "Open"}`}
                  >
                    <article className={classes.card}>
                      <div className={classes.cardTop}>
                        <div className={classes.num}>{String(idx + 1).padStart(2, "0")}</div>
                        <div className={classes.pill}>{tour.pill}</div>
                      </div>

                      <h2 className={classes.title}>{tour.title}</h2>
                      <div className={classes.subtitle}>{tour.subtitle}</div>

                      <p className={classes.text}>{tour.text}</p>

                      <div className={classes.footer}>
                        <span className={classes.more}>{ui?.more || "Learn more"}</span>
                        <span className={classes.arrow} aria-hidden="true">
                      →
                    </span>
                      </div>
                    </article>
                  </Link>
              ))}
            </div>
          </div>
        </section>
      </>
  );
};

export default Services;
