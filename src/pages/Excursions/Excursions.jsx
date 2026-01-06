import React, { useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./Excursions.module.css";

// Images
import img1 from "./images/a-close-up-view-inside-a-vineyard-in-odessa--with-.png";
import img2 from "./images/an-ancient-georgian-monastery-overlooking-the-conf.jpg";
import img3 from "./images/medieval-svaneti-stone-towers-in-mestia-surrounded.jpg";
import img4 from "./images/gonio-fortress-by-the-black-sea--subtropical-palm-.jpg";
import img5 from "./images/night-panorama-of-tbilisi-with-narikala-fortress--.jpg";
import img6 from "./images/majestic-mount-kazbegi-with-the-gergeti-trinity-ch.jpg";

const SITE_URL = "https://ertieri.ge";

const normalizeLang = (lng) => {
  if (!lng) return "ru";
  // у тебя supportedLngs: ["ru","en","ge"] → грузинский = ge
  if (lng === "ka") return "ge";
  return lng;
};

const Excursions = () => {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState(null);

  const { t, i18n, ready } = useTranslation("excursions", { useSuspense: false });
  const lang = normalizeLang(i18n.resolvedLanguage);

  // если ns ещё не подгрузился — не показываем “ложный ru”
  if (!ready) return null;

  const meta = t("meta", { returnObjects: true });
  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const ui = t("ui", { returnObjects: true });
  const sectionsRaw = t("sections", { returnObjects: true });

  const imagesById = useMemo(
      () => ({
        1: img4,
        2: img5,
        3: img2,
        4: img6,
        5: img3,
        // если вдруг появится 6 — добавишь:
        6: img1,
      }),
      []
  );

  const sections = useMemo(() => {
    const list = Array.isArray(sectionsRaw) ? sectionsRaw : [];
    return list.map((s) => ({
      ...s,
      image: imagesById[s.id] || img1,
    }));
  }, [sectionsRaw, imagesById]);

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

  const layoutIdByBlock = (id) => `excursion-img-${id}`;

  const openModal = useCallback((block) => {
    if (!block?.cta) setSelectedBlock(block);
  }, []);

  const closeModal = useCallback(() => setSelectedBlock(null), []);

  const go = useCallback(
      (to) => {
        if (!to) return;
        navigate(to);
      },
      [navigate]
  );

  const onCardKeyDown = useCallback(
      (e, to, disabled) => {
        if (!to || disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(to);
        }
      },
      [navigate]
  );

  const pathLang = lang === "ge" ? "ge" : lang === "en" ? "en" : "ru";
  const pageUrl = `${SITE_URL}/${pathLang}/excursions`;

  const jsonLd = useMemo(
      () => ({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            name: meta.title,
            description: meta.description,
            url: pageUrl,
            inLanguage: lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE",
            isPartOf: { "@type": "WebSite", name: "Erti Eri", url: SITE_URL },
          },
          {
            "@type": "Service",
            name:
                lang === "en"
                    ? "Excursions in Georgia"
                    : lang === "ru"
                        ? "Экскурсии по Грузии"
                        : "ექსკურსიები საქართველოში",
            provider: { "@type": "TravelAgency", name: "Erti Eri", url: SITE_URL },
            areaServed: [{ "@type": "Country", name: "Georgia" }],
            serviceType: "Guided tours and excursions",
            url: pageUrl,
          },
        ],
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

          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.ogTitle} />
          <meta property="og:description" content={meta.ogDescription} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:image" content={`${SITE_URL}/og-excursions.jpg`} />
          <meta property="og:site_name" content="Erti Eri" />
          <meta property="og:locale" content={lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE"} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.ogTitle} />
          <meta name="twitter:description" content={meta.ogDescription} />
          <meta name="twitter:image" content={`${SITE_URL}/og-excursions.jpg`} />

          <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/ru/excursions`} />
          <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/excursions`} />
          <link rel="alternate" hrefLang="ka" href={`${SITE_URL}/ge/excursions`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en/excursions`} />

          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        <main className={classes.excursions}>
          <header className={classes.header}>
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </header>

          <motion.section
              className={classes.container}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={ui.ariaSections}
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
                      aria-label={clickable ? `${block.title}. ${ui.open}` : undefined}
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
                            <motion.button className={classes.ctaButton} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
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

          <AnimatePresence>
            {selectedBlock && (
                <>
                  <motion.div className={classes.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} />

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
                      <button className={classes.closeButton} onClick={closeModal} aria-label={ui.close} type="button">
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
                            {ui.book}
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

export default Excursions;
