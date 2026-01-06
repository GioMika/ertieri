import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./About.module.css";

const About = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("about");
  const lang = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

  const cardBackgrounds = useMemo(
      () => [
        `radial-gradient(900px 700px at 18% 12%, rgba(96,165,250,.22), transparent 60%), radial-gradient(850px 650px at 82% 18%, rgba(34,211,238,.14), transparent 58%), linear-gradient(135deg, #061726 0%, #081a2b 45%, #06121f 100%)`,
        `radial-gradient(900px 700px at 20% 20%, rgba(167,139,250,.18), transparent 60%), radial-gradient(900px 650px at 82% 22%, rgba(96,165,250,.14), transparent 58%), linear-gradient(135deg, #070a1a 0%, #0a1030 55%, #06081a 100%)`,
        `radial-gradient(900px 700px at 22% 18%, rgba(34,211,238,.16), transparent 60%), radial-gradient(900px 650px at 78% 24%, rgba(16,185,129,.12), transparent 58%), linear-gradient(135deg, #06141f 0%, #081f2b 55%, #050f18 100%)`,
        `radial-gradient(900px 700px at 20% 16%, rgba(96,165,250,.18), transparent 60%), radial-gradient(900px 650px at 78% 26%, rgba(244,114,182,.10), transparent 58%), linear-gradient(135deg, #071022 0%, #0a1530 55%, #060b18 100%)`,
        `radial-gradient(900px 700px at 18% 14%, rgba(167,139,250,.16), transparent 60%), radial-gradient(900px 650px at 80% 24%, rgba(34,211,238,.12), transparent 58%), linear-gradient(135deg, #06111e 0%, #0a1a2b 55%, #050a14 100%)`,
      ],
      []
  );

  const meta = useMemo(
      () => ({
        title: t("meta.title"),
        description: t("meta.description"),
        keywords: t("meta.keywords"),
        ogTitle: t("meta.ogTitle"),
        ogDescription: t("meta.ogDescription"),
      }),
      [t]
  );

  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const sections = useMemo(() => t("sections", { returnObjects: true }), [t]);

  const go = (to) => {
    if (!to) return;
    navigate(to);
  };

  const onCardKeyDown = (e, to) => {
    if (!to) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(to);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Erti Eri",
    description: meta.description,
    url: "https://ertieri.ge",
    logo: "https://ertieri.ge/logo.png",
    image: "https://ertieri.ge/og-image.jpg",
    telephone: "+995-XXX-XXX-XXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
    priceRange: "$$",
  };

  const ariaGo =
      lang === "ru" ? "Перейти" : lang === "en" ? "Navigate" : "გადასვლა";

  return (
      <>
        {/* SEO Meta (React 19 native) */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://ertieri.ge/${lang}/about`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={`https://ertieri.ge/${lang}/about`} />
        <meta property="og:image" content="https://ertieri.ge/og-about.jpg" />
        <meta property="og:site_name" content="Erti Eri" />
        <meta
            property="og:locale"
            content={lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content="https://ertieri.ge/og-about.jpg" />

        {/* Alternate langs */}
        <link rel="alternate" hrefLang="ru" href="https://ertieri.ge/ru/about" />
        <link rel="alternate" hrefLang="en" href="https://ertieri.ge/en/about" />
        <link rel="alternate" hrefLang="ka" href="https://ertieri.ge/ge/about" />
        <link rel="alternate" hrefLang="x-default" href="https://ertieri.ge/en/about" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        <article className={classes.about}>
          <header className={classes.header}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </header>

          <section className={classes.grid}>
            {sections.map((s, i) => {
              const isCta = Boolean(s.cta);
              const clickable = Boolean(s.to);

              return (
                  <article
                      key={i}
                      className={`${classes.card} ${classes[`card${i + 1}`]} ${
                          isCta ? classes.ctaCard : ""
                      } ${clickable ? classes.clickable : ""}`}
                      style={{ ["--card-bg"]: cardBackgrounds[i] }}
                      onClick={() => go(s.to)}
                      role={clickable ? "link" : undefined}
                      tabIndex={clickable ? 0 : -1}
                      onKeyDown={(e) => onCardKeyDown(e, s.to)}
                      aria-label={clickable ? `${s.title}. ${ariaGo}` : undefined}
                  >
                    <div className={classes.cardTop}>
                      <div className={classes.meta}>
                    <span className={classes.num}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                        <span className={classes.dot} />
                        <span className={classes.tag}>{s.subtitle}</span>
                      </div>

                      <div className={classes.arrow} aria-hidden="true">
                        ↗
                      </div>
                    </div>

                    <h2 className={classes.title}>{s.title}</h2>
                    <p className={classes.text}>{s.text}</p>

                    {isCta && (
                        <div
                            className={classes.ctaRow}
                            onClick={(e) => e.stopPropagation()}
                        >
                          <Link to="/contact" className={classes.linkWrapper}>
                            <button className={classes.ctaButton}>{s.ctaText}</button>
                          </Link>
                          <div className={classes.ctaHint}>{s.ctaHint}</div>
                        </div>
                    )}
                  </article>
              );
            })}
          </section>
        </article>
      </>
  );
};

export default About;
