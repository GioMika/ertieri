import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./Estate.module.css";

import img  from "./images/est.jpeg";
import img1 from "./images/est1.jpeg";
import img2 from "./images/est2.jpeg";

const normalizeLang = (lng) => {
  if (!lng) return "ru";
  if (lng === "ka") return "ge";
  return lng;
};

const PLACEHOLDER_IMAGES = [img, img1, img2];

const formatSeaDistance = (meters) => {
  if (meters === null || meters === undefined) return "—";
  if (meters === 0) return "0 м";
  if (meters >= 1000) return `${meters / 1000} км`;
  return `${meters} м`;
};

const Estate = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const { t, i18n, ready } = useTranslation("estate", { useSuspense: false });

  const propertiesRaw = t("properties", { returnObjects: true });

  const properties = useMemo(() => {
    const list = Array.isArray(propertiesRaw) ? propertiesRaw : [];
    return list.map((p) => ({ ...p, images: PLACEHOLDER_IMAGES }));
  }, [propertiesRaw]);

  const openModal = useCallback((property) => {
    setSelectedProperty(property);
    setSlideIndex(0);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProperty(null);
    setSlideIndex(0);
  }, []);

  const prevSlide = useCallback((e) => {
    e.stopPropagation();
    setSlideIndex((i) => (i === 0 ? PLACEHOLDER_IMAGES.length - 1 : i - 1));
  }, []);

  const nextSlide = useCallback((e) => {
    e.stopPropagation();
    setSlideIndex((i) => (i === PLACEHOLDER_IMAGES.length - 1 ? 0 : i + 1));
  }, []);

  if (!ready) return null;

  const pageTitle    = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const ui           = t("ui", { returnObjects: true });

  return (
      <main className={classes.estate}>

        <header className={classes.header}>
          <div className={classes.headerLeft}>
            <h1 className={classes.pageTitle}>
              Premium <span className={classes.pageTitleItalic}>Real Estate</span>
              <br />in Georgia
            </h1>
          </div>
          {pageSubtitle && (
              <div className={classes.headerRight}>
                <p className={classes.pageSubtitle}>{pageSubtitle}</p>
              </div>
          )}
          <div className={classes.headerLine} />
        </header>

        <div className={classes.grid}>
          {properties.map((property, index) => (
              <motion.article
                  key={property.id}
                  className={classes.card}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: index % 2 === 1 ? 0.1 : 0 }}
                  onClick={() => openModal(property)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(property);
                    }
                  }}
                  aria-label={property.name}
              >
                {/* Фото */}
                <div className={classes.imgWrap}>
                  <img
                      src={property.images[0]}
                      alt={property.name}
                      className={classes.img}
                      loading="lazy"
                  />
                  <div className={classes.imgOverlay} />

                  {/* Бейджи поверх */}
                  <div className={classes.imgBadges}>
                    {property.typeLabel && (
                        <span className={classes.badgeType}>{property.typeLabel}</span>
                    )}
                    {property.city && (
                        <span className={classes.badgeCity}>{property.city}</span>
                    )}
                  </div>

                  {/* Цена снизу */}
                  <div className={classes.imgPrice}>
                    <span className={classes.priceFrom}>{ui.priceFrom}</span>
                    <span className={classes.priceValue}>
                  {property.priceFrom?.toLocaleString()} {ui.currency}
                </span>
                  </div>
                </div>

                {/* Тело */}
                <div className={classes.body}>
                  <div>
                    <h2 className={classes.cardTitle}>{property.name}</h2>

                  </div>

                  <div className={classes.specs}>
                    <div className={classes.spec}>
                      <span className={classes.specLabel}>{ui.completion}</span>
                      <span className={classes.specValue}>{property.completion}</span>
                    </div>
                    {property.seaDistance !== null && property.seaDistance !== undefined && (
                        <div className={classes.spec}>
                          <span className={classes.specLabel}>{ui.seaDistance}</span>
                          <span className={classes.specValue}>{formatSeaDistance(property.seaDistance)}</span>
                        </div>
                    )}
                    <div className={classes.spec}>
                      <span className={classes.specLabel}>{ui.area}</span>
                      <span className={classes.specValue}>
                    {property.areaMin === property.areaMax
                        ? `${property.areaMin} м²`
                        : `${property.areaMin}–${property.areaMax} м²`}
                  </span>
                    </div>
                    <div className={classes.spec}>
                      <span className={classes.specLabel}>{ui.layouts}</span>
                      <span className={classes.specValue}>{property.layouts?.join(", ")}</span>
                    </div>
                  </div>

                  {property.finishing?.length > 0 && (
                      <div className={classes.tags}>
                        {property.finishing.map((f) => (
                            <span key={f} className={classes.tag}>{f}</span>
                        ))}
                      </div>
                  )}

                  <div className={classes.cardFooter}>
                    <span className={classes.cardCta}>{ui.viewDetails || "View details"}</span>
                    <span className={classes.arrowCircle} aria-hidden="true">↗</span>
                  </div>
                </div>
              </motion.article>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProperty && (
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
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.97 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedProperty.name}
                >
                  <div className={classes.modal}>
                    <button
                        className={classes.closeButton}
                        onClick={closeModal}
                        aria-label={ui.close}
                        type="button"
                    >✕</button>

                    {/* Слайдер — левая колонка */}
                    <div className={classes.modalSlider}>
                      <AnimatePresence mode="wait">
                        <motion.img
                            key={slideIndex}
                            src={selectedProperty.images[slideIndex]}
                            alt={`${selectedProperty.name} ${slideIndex + 1}`}
                            className={classes.modalSliderImg}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.26, ease: "easeInOut" }}
                        />
                      </AnimatePresence>

                      <button className={`${classes.sliderBtn} ${classes.sliderBtnPrev}`} onClick={prevSlide} type="button" aria-label="prev">‹</button>
                      <button className={`${classes.sliderBtn} ${classes.sliderBtnNext}`} onClick={nextSlide} type="button" aria-label="next">›</button>

                      <div className={classes.sliderDots}>
                        {selectedProperty.images.map((_, i) => (
                            <button
                                key={i}
                                className={`${classes.dot} ${i === slideIndex ? classes.dotActive : ""}`}
                                onClick={(e) => { e.stopPropagation(); setSlideIndex(i); }}
                                type="button"
                                aria-label={`${i + 1}`}
                            />
                        ))}
                      </div>
                    </div>

                    {/* Контент — правая колонка */}
                    <div className={classes.modalContent}>

                      <div className={classes.modalHeader}>
                        <h2 className={classes.modalTitle}>{selectedProperty.name}</h2>

                      </div>

                      <div>
                        <p className={classes.modalPriceLabel}>{ui.priceFrom}</p>
                        <p className={classes.modalPrice}>
                          {selectedProperty.priceFrom?.toLocaleString()} {ui.currency}
                        </p>
                      </div>

                      <div className={classes.modalInfoGrid}>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.city}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.city}</span>
                        </div>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.propertyType}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.typeLabel}</span>
                        </div>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.completion}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.completion}</span>
                        </div>
                        {selectedProperty.seaDistance !== null && selectedProperty.seaDistance !== undefined && (
                            <div className={classes.modalInfoItem}>
                              <span className={classes.modalInfoLabel}>{ui.seaDistance}</span>
                              <span className={classes.modalInfoValue}>{formatSeaDistance(selectedProperty.seaDistance)}</span>
                            </div>
                        )}
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.floors}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.buildings}</span>
                        </div>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.area}</span>
                          <span className={classes.modalInfoValue}>
                        {selectedProperty.areaMin === selectedProperty.areaMax
                            ? `${selectedProperty.areaMin} м²`
                            : `${selectedProperty.areaMin}–${selectedProperty.areaMax} м²`}
                      </span>
                        </div>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.layouts}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.layouts?.join(", ")}</span>
                        </div>
                        <div className={classes.modalInfoItem}>
                          <span className={classes.modalInfoLabel}>{ui.address}</span>
                          <span className={classes.modalInfoValue}>{selectedProperty.address}</span>
                        </div>
                      </div>

                      {selectedProperty.finishing?.length > 0 && (
                          <div>
                            <p className={classes.modalFinishingLabel}>{ui.finishing}</p>
                            <div className={classes.modalTags}>
                              {selectedProperty.finishing.map((f) => (
                                  <span key={f} className={classes.tag}>{f}</span>
                              ))}
                            </div>
                          </div>
                      )}

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
  );
};

export default Estate;