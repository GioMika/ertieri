import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./CasinoTour.module.css";

// Images
import img1 from "./images/a-high-end-casino-vip-gaming-hall-with-polished-bl.png";
import img2 from "./images/a-premium-rooftop-lounge-pool-at-night--overlookin.png";
import img3 from "./images/deep-shadows--subtle-sparkles--dark-background-fad.png";
import img4 from "./images/a-stylish-night-entertainment-scene-with-a-premium.png";
import img5 from "./images/a-luxurious-nighttime-coastal-city-scene-with-a-wi.png";

const SITE_URL = "https://ertieri.ge";
const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const CasinoTour = () => {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState(null);

  const { t, i18n } = useTranslation("casinoTour");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const images = useMemo(() => [img1, img2, img3, img4, img5], []);

  // ====== texts ======
  const meta = t("meta", { returnObjects: true }) || {};
  const ui = t("ui", { returnObjects: true }) || {};

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 140 },
    },
  };

  const layoutIdByBlock = (id) => `casino-img-${id}`;

  const openModal = (block) => {
    if (!block?.cta) setSelectedBlock(block);
  };

  const closeModal = () => setSelectedBlock(null);

  const go = (to) => {
    if (!to) return;
    navigate(to);
  };

  const onCardKeyDown = (e, to, disabled) => {
    if (!to || disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(to);
    }
  };

  const pathLang = lang === "ge" ? "ge" : lang === "en" ? "en" : "ru";
  const pageUrl = `${SITE_URL}/${pathLang}/casino-tour`;

  const alternates = meta.alternates || {
    ru: `${SITE_URL}/ru/casino-tour`,
    en: `${SITE_URL}/en/casino-tour`,
    ka: `${SITE_URL}/ge/casino-tour`,
  };

  const ogImage = meta.ogImage || `${SITE_URL}/og-casino-tour.jpg`;
  const ogLocale = meta.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE");

  // ====== JSON-LD ======
  const jsonLd = useMemo(
      () => ({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.title,
        description: meta.description,
        url: pageUrl,
        inLanguage: lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE",
        isPartOf: { "@type": "WebSite", name: "Erti Eri", url: SITE_URL },
        about: [
          {
            "@type": "TouristDestination",
            name: lang === "en" ? "Batumi" : lang === "ru" ? "Батуми" : "ბათუმი",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Batumi",
              addressRegion: "Ajara",
              addressCountry: "GE",
            },
          },
          {
            "@type": "Thing",
            name: lang === "en" ? "Casino Tour" : lang === "ru" ? "Казино-тур" : "კაზინო ტური",
          },
        ],
        publisher: {
          "@type": "TravelAgency",
          name: "Erti Eri",
          url: SITE_URL,
          telephone: "+995-XXX-XXX-XXX",
        },
      }),
      [meta.title, meta.description, pageUrl, lang]
  );

  return (
      <>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={pageUrl} />

          {/* hreflang */}
          <link rel="alternate" hrefLang="ru" href={alternates.ru} />
          <link rel="alternate" hrefLang="en" href={alternates.en} />
          <link rel="alternate" hrefLang="ka" href={alternates.ka} />
          <link rel="alternate" hrefLang="x-default" href={alternates.en} />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.ogTitle || meta.title} />
          <meta property="og:description" content={meta.ogDescription || meta.description} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="Erti Eri" />
          <meta property="og:locale" content={ogLocale} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.ogTitle || meta.title} />
          <meta name="twitter:description" content={meta.ogDescription || meta.description} />
          <meta name="twitter:image" content={ogImage} />

          {/* JSON-LD */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        <main className={classes.casinoTour}>
          <header className={classes.header}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </header>

          <motion.section
              className={classes.container}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={ui.sectionsAria || "Page sections"}
          >
            {sections.map((block) => {
              const isCta = Boolean(block.cta);
              const clickable = Boolean(block.to) && !isCta;

              return (
                  <motion.article
                      key={block.id}
                      className={`${classes.block} ${classes[`block${block.id}`]}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.25 } }}
                      onClick={() => (isCta ? go(block.to) : openModal(block))}
                      role={clickable ? "button" : undefined}
                      tabIndex={clickable ? 0 : -1}
                      onKeyDown={(e) => onCardKeyDown(e, block.to, !clickable)}
                      aria-label={
                        clickable
                            ? `${block.title}. ${ui.open || "Open"}`
                            : undefined
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
                          <Link to="/contact" className={classes.ctaLink}>
                            <motion.button
                                className={classes.ctaButton}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
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
                          aria-label={ui.close || "Close"}
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
                          <button className={classes.modalCtaButton}>
                            {ui.book || "Book"}
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

export default CasinoTour;
