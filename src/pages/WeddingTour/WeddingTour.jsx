import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import classes from "./WeddingTour.module.css";

// Images (тот же пак)
import img1 from "./images/a-breathtaking-sunset-over-the-caucasus-mountains-.png";
import img2 from "./images/a-rooftop-terrace-in-old-tbilisi-with-a-view-of-ti.png";
import img3 from "./images/a-vineyard-terrace-overlooking-green-valleys-with-.png";
import img4 from "./images/a-wedding-arch-on-a-black-sea-beach-at-sunset--whi.png";
import img5 from "./images/a-wedding-ceremony-setup-inside-an-ancient-stone-f.png";

const SITE_URL = "https://ertieri.ge";

const WeddingTour = ({ lang = "ru" }) => {
  const { t } = useTranslation("weddingTour");
  const [selectedBlock, setSelectedBlock] = useState(null);

  // ✅ синхронизируем язык i18next с prop lang
  useEffect(() => {
    const next = lang === "ge" ? "ge" : lang === "en" ? "en" : "ru";
    if (i18n.language !== next) i18n.changeLanguage(next);
  }, [lang]);

  const images = useMemo(() => [img1, img2, img3, img4, img5], []);

  // ✅ берём SEO и контент из i18n JSON
  const meta = t("meta", { returnObjects: true });
  const alternates = t("alternates", { returnObjects: true });
  const canonicalPath = t("canonical"); // типа "/ru/wedding-tour"
  const ui = t("ui", { returnObjects: true });
  const blocksRaw = t("blocks", { returnObjects: true });

  const canonical = `${SITE_URL}${canonicalPath}`;
  const altRu = `${SITE_URL}${alternates?.ru || "/ru/wedding-tour"}`;
  const altEn = `${SITE_URL}${alternates?.en || "/en/wedding-tour"}`;
  const altKa = `${SITE_URL}${alternates?.ka || "/ge/wedding-tour"}`;

  const locale =
      lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE";

  // ✅ приклеиваем изображения к блокам по id (1..5)
  const blocks = useMemo(() => {
    const safe = Array.isArray(blocksRaw) ? blocksRaw : [];
    return safe.map((b) => {
      const id = Number(b.id);
      const img = images[id - 1] || images[0];
      const isCta = id === 5; // или сделай флаг cta в json если хочешь
      return {
        ...b,
        id,
        image: img,
        cta: isCta,
      };
    });
  }, [blocksRaw, images]);

  const jsonLd = useMemo(
      () => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name:
            lang === "ru"
                ? "Организация свадьбы в Грузии"
                : lang === "en"
                    ? "Wedding planning in Georgia"
                    : "ქორწილის ორგანიზება საქართველოში",
        serviceType: "Wedding planning / Wedding tour",
        description: meta?.description,
        provider: {
          "@type": "TravelAgency",
          name: "Erti Eri",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "Georgia" },
        url: canonical,
      }),
      [meta?.description, canonical, lang]
  );

  // ======= НЕ МЕНЯЮ: эффект появления блоков =======
  const getBlockVariants = useCallback(
      (index) => {
        const angles = [0, 72, 144, 216, 288];
        const angle = angles[index] || 0;
        const delay = index * 0.1;

        return {
          hidden: {
            opacity: 0,
            scale: 0.3,
            x: Math.cos((angle * Math.PI) / 180) * -50,
            y: Math.sin((angle * Math.PI) / 180) * -50,
          },
          visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 90,
              duration: 1,
              delay,
            },
          },
        };
      },
      []
  );
  // ==================================================

  const openModal = (block) => {
    if (!block?.cta) setSelectedBlock(block);
  };
  const closeModal = () => setSelectedBlock(null);

  const layoutIdByBlock = (id) => `wedding-img-${id}`;

  return (
      <>
        <Helmet>
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <meta name="keywords" content={meta?.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonical} />

          <link rel="alternate" hrefLang="ru" href={altRu} />
          <link rel="alternate" hrefLang="en" href={altEn} />
          <link rel="alternate" hrefLang="ka" href={altKa} />
          <link rel="alternate" hrefLang="x-default" href={altEn} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta?.ogTitle} />
          <meta property="og:description" content={meta?.ogDescription} />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={`${SITE_URL}/og-wedding-tour.jpg`} />
          <meta property="og:site_name" content="Erti Eri" />
          <meta property="og:locale" content={locale} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta?.ogTitle} />
          <meta name="twitter:description" content={meta?.ogDescription} />
          <meta name="twitter:image" content={`${SITE_URL}/og-wedding-tour.jpg`} />

          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        <div className={classes.weddingTour}>
          <div className={classes.container}>
            {blocks.map((block, index) => (
                <motion.div
                    key={block.id}
                    className={`${classes.block} ${classes[`block${block.id}`]} ${
                        block.cta ? classes.ctaBlock : ""
                    }`}
                    variants={getBlockVariants(index)}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => openModal(block)}
                    role={!block.cta ? "button" : undefined}
                    tabIndex={!block.cta ? 0 : -1}
                >
                  <div className={classes.imageWrapper}>
                    <motion.img
                        src={block.image}
                        alt={block.title}
                        className={classes.blockImage}
                        layoutId={layoutIdByBlock(block.id)}
                    />
                  </div>

                  <h2 className={classes.title}>{block.title}</h2>
                  <p className={classes.subtitle}>{block.subtitle}</p>
                  <p className={classes.description}>{block.description}</p>

                  {block.cta && (
                      <Link to="/contact" className={classes.ctaLink}>
                        <motion.button
                            className={classes.ctaButton}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.97 }}
                        >
                          {ui?.ctaMain || "Book"}
                        </motion.button>
                      </Link>
                  )}
                </motion.div>
            ))}
          </div>

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
                  >
                    <div className={classes.modal}>
                      <button
                          className={classes.closeButton}
                          onClick={closeModal}
                          aria-label={ui?.close || "Close"}
                      >
                        ✕
                      </button>

                      <div className={classes.modalHero}>
                        <motion.img
                            src={selectedBlock.image}
                            alt={selectedBlock.title}
                            className={classes.modalHeroImg}
                            layoutId={layoutIdByBlock(selectedBlock.id)}
                        />
                      </div>

                      <div className={classes.modalContent}>
                        <h2 className={classes.modalTitle}>{selectedBlock.title}</h2>
                        <p className={classes.modalSubtitle}>{selectedBlock.subtitle}</p>
                        <p className={classes.modalDescription}>
                          {selectedBlock.fullDescription}
                        </p>

                        <Link
                            to="/contact"
                            className={classes.modalCtaLink}
                            onClick={closeModal}
                        >
                          <button className={classes.modalCtaButton}>
                            {ui?.ctaModal || "Book"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </>
            )}
          </AnimatePresence>
        </div>
      </>
  );
};

export default WeddingTour;
