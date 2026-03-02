import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "../styles.module.css";

import img1 from "./images/a-breathtaking-sunset-over-the-caucasus-mountains-.png";
import img2 from "./images/a-rooftop-terrace-in-old-tbilisi-with-a-view-of-ti.png";
import img3 from "./images/a-vineyard-terrace-overlooking-green-valleys-with-.png";
import img4 from "./images/a-wedding-arch-on-a-black-sea-beach-at-sunset--whi.png";
import img5 from "./images/a-wedding-ceremony-setup-inside-an-ancient-stone-f.png";

const IMAGES = [img1, img2, img3, img4, img5];

const WeddingTour = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const { t, ready } = useTranslation("weddingTour", { useSuspense: false });

  const blocksRaw = t("blocks", { returnObjects: true });

  const sections = useMemo(() => {
    const arr = Array.isArray(blocksRaw) ? blocksRaw : [];
    return arr.map((b) => ({
      ...b,
      image: IMAGES[Number(b.id) - 1] || IMAGES[0],
      cta: Number(b.id) === 5,
    }));
  }, [blocksRaw]);

  const openModal  = useCallback((block) => { if (!block?.cta) setSelectedBlock(block); }, []);
  const closeModal = useCallback(() => setSelectedBlock(null), []);

  if (!ready) return null;

  const pageTitle    = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const ui           = t("ui", { returnObjects: true });

  return (
      <main className={classes.excursions}>

        <header className={classes.header}>
          <p className={classes.eyebrow}>Erti Eri</p>
          <h1 className={classes.pageTitle}>{pageTitle}</h1>
          {pageSubtitle && <p className={classes.pageSubtitle}>{pageSubtitle}</p>}
          <div className={classes.headerLine} />
        </header>

        <div className={classes.grid}>
          {sections.map((block) => {
            const isCta = Boolean(block.cta);

            return (
                <motion.article
                    key={block.id}
                    className={`${classes.card} ${isCta ? classes.cardCta : ""}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => !isCta && openModal(block)}
                    role={!isCta ? "button" : undefined}
                    tabIndex={!isCta ? 0 : -1}
                    onKeyDown={(e) => {
                      if (!isCta && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        openModal(block);
                      }
                    }}
                    aria-label={!isCta ? block.title : undefined}
                >
                  <div className={classes.imgWrap}>
                    <img
                        src={block.image}
                        alt={block.title}
                        className={classes.img}
                        loading="lazy"
                    />
                    <div className={classes.imgOverlay} />

                    <div className={classes.imgContent}>
                      <div className={classes.cardMeta}>
                        {block.subtitle && (
                            <span className={classes.cardTag}>{block.subtitle}</span>
                        )}
                        {!isCta && (
                            <span className={classes.cardArrow} aria-hidden="true">↗</span>
                        )}
                      </div>

                      <h2 className={classes.cardTitle}>{block.title}</h2>
                      <p className={classes.cardText}>{block.description}</p>

                      {isCta && (
                          <div
                              className={classes.ctaArea}
                              onClick={(e) => e.stopPropagation()}
                          >
                            <Link to="/contact" className={classes.ctaLink}>
                              <button className={classes.ctaButton} type="button">
                                {ui?.ctaMain || ui?.book || "Book"}
                              </button>
                            </Link>
                            {block.ctaHint && (
                                <p className={classes.ctaHint}>{block.ctaHint}</p>
                            )}
                          </div>
                      )}
                    </div>
                  </div>
                </motion.article>
            );
          })}
        </div>

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
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.97 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedBlock.title}
                >
                  <div className={classes.modal}>
                    <button
                        className={classes.closeButton}
                        onClick={closeModal}
                        aria-label={ui?.close}
                        type="button"
                    >✕</button>

                    <div className={classes.modalImgWrap}>
                      <img
                          src={selectedBlock.image}
                          alt={selectedBlock.title}
                          className={classes.modalImg}
                      />
                      <div className={classes.modalImgOverlay} />
                    </div>

                    <div className={classes.modalContent}>
                      {selectedBlock.subtitle && (
                          <p className={classes.modalTag}>{selectedBlock.subtitle}</p>
                      )}
                      <h2 className={classes.modalTitle}>{selectedBlock.title}</h2>
                      <p className={classes.modalDescription}>
                        {selectedBlock.fullDescription || selectedBlock.description}
                      </p>
                      <Link to="/contact" className={classes.modalCtaLink} onClick={closeModal}>
                        <button className={classes.modalCtaButton} type="button">
                          {ui?.ctaModal || ui?.book || "Book"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>

      </main>
  );
};

export default WeddingTour;