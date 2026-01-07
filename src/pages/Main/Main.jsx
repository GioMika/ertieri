import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Main.module.css";

const SITE_URL = "https://ertieri.ge";

const Main = () => {
  const { t, i18n } = useTranslation("main");
  const lang = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

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

  const canonicalUrl = `${SITE_URL}/${lang}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Erti Eri",
    url: SITE_URL,
    description: meta.description,
    areaServed: "GE",
  };

  return (
      <>
        {/* SEO Meta (React 19 native) */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/og-main.jpg`} />
        <meta property="og:site_name" content="Erti Eri" />
        <meta
            property="og:locale"
            content={lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/og-main.jpg`} />

        {/* Alternate langs */}
        <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/ru`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ka" href={`${SITE_URL}/ge`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        <section className={classes.main}>
          <video className={classes.video} autoPlay loop muted playsInline>
            <source src="/back.mp4" type="video/mp4" />
          </video>

          <div className={classes.overlay}>
            <div className={classes.textBox}>
              <h1 className={classes.title}>
                {t("hero.h1Line1")}
                <br />
                <span>{t("hero.h1Line2")}</span>
              </h1>
            </div>
          </div>
        </section>
      </>
  );
};

export default Main;
