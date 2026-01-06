import React, { useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import classes from "./BeachRelax.module.css";

// Images
import img1 from "./images/a-cinematic-black-sea-coast-near-batumi-with-cryst.png";
import img2 from "./images/a-long-pebble-and-sand-beach-with-gradients-of-dee.png";
import img3 from "./images/a-luxury-seaside-hotel-with-glass-facades-reflecti.png";
import img4 from "./images/batumi-nightlife-along-the-coast-with-neon-turquoi.png";
import img5 from "./images/early-sunrise-over-the-black-sea-with-pastel-turqu.png";

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const BeachRelax = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("beachRelax");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = useMemo(() => [img1, img2, img3, img4, img5], []);

  // ✅ контент из JSON
  const meta = t("meta", { returnObjects: true });
  const ui = t("ui", { returnObjects: true });
  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const sectionsRaw = t("sections", { returnObjects: true });

  const sections = useMemo(() => {
    const arr = Array.isArray(sectionsRaw) ? sectionsRaw : [];
    return arr.map((s) => ({
      ...s,
      image: images[s.imageIndex ?? 0],
    }));
  }, [sectionsRaw, images]);

  // ====== НЕ ТРОГАЮ: твои анимации ======
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const blockVariants = {
    hidden: { y: -150, opacity: 0, scale: 0.7, rotate: -8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", damping: 15, stiffness: 120, duration: 0.9 },
    },
  };
  // =====================================

  const layoutIdByBlock = (id) => `beach-img-${id}`;

  const handleBlockClick = useCallback((block) => {
    if (!block?.cta) setSelectedBlock(block);
  }, []);

  const closeModal = useCallback(() => setSelectedBlock(null), []);

  // (оставляю как у тебя: навигация по Enter/Space, кликом — модалка)
  const onCardKeyDown = (e, to, isDisabled) => {
    if (!to || isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(to);
    }
  };

  // ✅ SEO URLs
  const canonical =
      meta?.canonical ||
      `https://ertieri.ge/${lang === "en" ? "en" : lang === "ge" ? "ge" : "ru"}/beach-relax`;

  const alternates = meta?.alternates || {
    ru: "https://ertieri.ge/ru/beach-relax",
    en: "https://ertieri.ge/en/beach-relax",
    ka: "https://ertieri.ge/ge/beach-relax",
  };

  const ogImage = meta?.ogImage || "https://ertieri.ge/og-beach-relax.jpg";

  // ✅ JSON-LD
  const jsonLd = useMemo(() => {
    const inLanguage = lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE";

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta?.title,
      description: meta?.description,
      url: canonical,
      inLanguage,
      isPartOf: { "@type": "WebSite", name: "Erti Eri", url: "https://ertieri.ge" },
      about: {
        "@type": "TouristDestination",
        name: lang === "en" ? "Batumi" : lang === "ge" ? "ბათუმი" : "Батуми",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Batumi",
          addressRegion: "Ajara",
          addressCountry: "GE",
        },
      },
      provider: {
        "@type": "TravelAgency",
        name: "Erti Eri",
        url: "https://ertieri.ge",
        telephone: "+995-XXX-XXX-XXX",
      },
    };
  }, [lang, meta?.title, meta?.description, canonical]);

  // ✅ safety fallback (если JSON не подгрузился)
  const safeMeta = meta || {};
  const safeUi = ui || {};

  return (
      <>
        <Helmet>
          <html lang={lang} />

          <title>{safeMeta.title}</title>
          <meta name="description" content={safeMeta.description} />
          <meta name="keywords" content={safeMeta.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonical} />

          {/* hreflang */}
          <link rel="alternate" hrefLang="ru" href={alternates.ru} />
          <link rel="alternate" hrefLang="en" href={alternates.en} />
          <link rel="alternate" hrefLang="ka" href={alternates.ka} />
          <link rel="alternate" hrefLang="x-default" href={alternates.en} />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={safeMeta.ogTitle || safeMeta.title} />
          <meta property="og:description" content={safeMeta.ogDescription || safeMeta.description} />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="Erti Eri" />
          <meta
              property="og:locale"
              content={safeMeta.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE")}
          />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={safeMeta.ogTitle || safeMeta.title} />
          <meta name="twitter:description" content={safeMeta.ogDescription || safeMeta.description} />
          <meta name="twitter:image" content={ogImage} />

          {/* JSON-LD */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        <main className={classes.beachRelax}>
          <header className={classes.header}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </header>

          <motion.section
              className={classes.container}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={safeUi.sectionsAria || "Sections"}
          >
            {sections.map((block) => {
              const isCta = Boolean(block.cta);
              const clickable = Boolean(block.to) && !isCta;

              return (
                  <motion.article
                      key={block.id}
                      className={`${classes.block} ${classes[`block${block.id}`]}`}
                      variants={blockVariants}
                      whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }}
                      onClick={() => handleBlockClick(block)}
                      role={clickable ? "button" : undefined}
                      tabIndex={clickable ? 0 : -1}
                      onKeyDown={(e) => onCardKeyDown(e, block.to, isCta)}
                      aria-label={
                        clickable ? `${block.title}. ${safeUi.openDetails || "Open details"}` : undefined
                      }
                  >
                    <div className={classes.imageWrapper}>
                      <motion.img
                          src={block.image}
                          alt={block.imageAlt || block.title}
                          className={classes.blockImage}
                          layoutId={layoutIdByBlock(block.id)}
                          loading="lazy"
                      />
                    </div>

                    <h2 className={classes.title}>{block.title}</h2>
                    <p className={classes.subtitle}>{block.subtitle}</p>
                    <p className={classes.description}>{block.description}</p>

                    {isCta && (
                        <div className={classes.ctaArea}>
                          <Link to={block.to || "/contact"} className={classes.ctaLink}>
                            <motion.button
                                className={classes.ctaButton}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.96 }}
                                aria-label={block.ctaText}
                            >
                              {block.ctaText}
                            </motion.button>
                          </Link>
                          {block.ctaHint && <div className={classes.ctaHint}>{block.ctaHint}</div>}
                        </div>
                    )}
                  </motion.article>
              );
            })}
          </motion.section>

          {/* Modal */}
          <AnimatePresence>
            {selectedBlock && (
                <>
                  <motion.div
                      className={classes.modalBackdrop}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={closeModal}
                  />

                  <motion.div
                      className={classes.modalWrapper}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ type: "spring", damping: 28, stiffness: 320 }}
                      role="dialog"
                      aria-modal="true"
                      aria-label={selectedBlock.title}
                  >
                    <div className={classes.modal}>
                      <button
                          className={classes.closeButton}
                          onClick={closeModal}
                          aria-label={safeUi.close || "Close"}
                          type="button"
                      >
                        ✕
                      </button>

                      <div className={classes.modalHero}>
                        <motion.img
                            src={selectedBlock.image}
                            alt={selectedBlock.imageAlt || selectedBlock.title}
                            className={classes.modalHeroImg}
                            layoutId={layoutIdByBlock(selectedBlock.id)}
                        />
                      </div>

                      <div className={classes.modalContent}>
                        <h2 className={classes.modalTitle}>{selectedBlock.title}</h2>
                        <p className={classes.modalSubtitle}>{selectedBlock.subtitle}</p>
                        <p className={classes.modalDescription}>{selectedBlock.fullDescription}</p>

                        <Link to="/contact" className={classes.modalCtaLink} onClick={closeModal}>
                          <button className={classes.modalCtaButton} type="button">
                            {safeUi.book || "Book"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </>
            )}
          </AnimatePresence>
        </main>
      </>
  );
};

export default BeachRelax;
