import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./Projects.module.css";
import { propertiesData } from "./propertiesData";
import ContactModal from "../../widgets/ContactModal/ContactModal.jsx";

const formatSeaDistance = (meters) => {
  if (meters === null || meters === undefined) return "—";
  if (meters === 0) return "0 м";
  if (meters >= 1000) return `${meters / 1000} км`;
  return `${meters} м`;
};

const PropertyCard = ({ property, index, onOpen, ui }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // FIX: картинка изначально центрирована через marginTop: "-10%"
  // Параллакс ±10% — никогда не выходит за край
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const isEven = index % 2 === 0;

  return (
      <motion.article
          ref={ref}
          className={classes.card}
          onClick={() => onOpen(property)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(property);
            }
          }}
          aria-label={property.name}
          initial={{
            opacity: 0,
            x: isEven ? -60 : 60,
            y: 40,
            scale: 0.94,
          }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: (index % 2) * 0.12,
          }}
          whileHover={{
            y: -6,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
      >
        <div className={classes.imgWrap}>
          <motion.img
              src={property.images[0]}
              alt={property.name}
              className={classes.img}
              style={{
                y: imgY,
                marginTop: "-10%", // ← центрирует картинку, убирает белый зазор
              }}
          />
          <div className={classes.imgOverlay} />

          <div className={classes.imgBadges}>
            {property.typeLabel && (
                <span className={classes.badgeType}>{property.typeLabel}</span>
            )}
            {property.city && (
                <span className={classes.badgeCity}>{property.city}</span>
            )}
          </div>

          <div className={classes.imgPrice}>
            <span className={classes.priceFrom}>{ui.priceFrom}</span>
            <span className={classes.priceValue}>
            {property.priceFrom?.toLocaleString()} {ui.currency}
          </span>
          </div>
        </div>

        <motion.div
            className={classes.body}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: (index % 2) * 0.12 + 0.2,
            }}
        >
          <h2 className={classes.cardTitle}>{property.name}</h2>

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
            <motion.span
                className={classes.arrowCircle}
                aria-hidden="true"
                whileHover={{ x: 4, y: -4 }}
                transition={{ duration: 0.2 }}
            >↗</motion.span>
          </div>
        </motion.div>
      </motion.article>
  );
};

const Projects = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { t, ready } = useTranslation("estate", { useSuspense: false });

  const openModal = useCallback((property) => {
    setSelectedProperty(property);
    setSlideIndex(0);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProperty(null);
    setSlideIndex(0);
  }, []);

  const handleGetConsultation = useCallback((e) => {
    e.stopPropagation();
    setSelectedProperty(null);
    setSlideIndex(0);
    setTimeout(() => {
      setIsContactModalOpen(true);
    }, 350);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const prevSlide = useCallback((e, len) => {
    e.stopPropagation();
    setSlideIndex((i) => (i === 0 ? len - 1 : i - 1));
  }, []);

  const nextSlide = useCallback((e, len) => {
    e.stopPropagation();
    setSlideIndex((i) => (i === len - 1 ? 0 : i + 1));
  }, []);

  if (!ready) return null;

  const pageSubtitle = t("pageSubtitle");
  const ui = t("ui", { returnObjects: true });

  const visibleProperties = propertiesData.filter((p) => p.images?.length > 0);

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
          {visibleProperties.map((property, index) => (
              <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  onOpen={openModal}
                  ui={ui}
              />
          ))}
        </div>

        <AnimatePresence>
          {selectedProperty && (() => {
            const images = selectedProperty.images;
            const len = images.length;
            return (
                <>
                  <motion.div
                      className={classes.modalBackdrop}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={closeModal}
                  />

                  <motion.div
                      className={classes.modalWrapper}
                      initial={{ opacity: 0, y: 40, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 24, scale: 0.96 }}
                      transition={{ type: "spring", damping: 28, stiffness: 280 }}
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

                      <div className={classes.modalSlider}>
                        <AnimatePresence mode="wait">
                          <motion.img
                              key={slideIndex}
                              src={images[slideIndex]}
                              alt={`${selectedProperty.name} ${slideIndex + 1}`}
                              className={classes.modalSliderImg}
                              initial={{ opacity: 0, scale: 1.04, x: 20 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.97, x: -20 }}
                              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </AnimatePresence>

                        {len > 1 && (
                            <>
                              <button
                                  className={`${classes.sliderBtn} ${classes.sliderBtnPrev}`}
                                  onClick={(e) => prevSlide(e, len)}
                                  type="button"
                                  aria-label="prev"
                              >‹</button>
                              <button
                                  className={`${classes.sliderBtn} ${classes.sliderBtnNext}`}
                                  onClick={(e) => nextSlide(e, len)}
                                  type="button"
                                  aria-label="next"
                              >›</button>
                            </>
                        )}

                        <div className={classes.sliderDots}>
                          {images.map((_, i) => (
                              <button
                                  key={i}
                                  className={`${classes.dot} ${i === slideIndex ? classes.dotActive : ""}`}
                                  onClick={(e) => { e.stopPropagation(); setSlideIndex(i); }}
                                  type="button"
                                  aria-label={`${i + 1}`}
                              />
                          ))}
                        </div>

                        <div className={classes.slideCounter}>
                          {slideIndex + 1} / {len}
                        </div>
                      </div>

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

                        <button
                            className={classes.modalCtaButton}
                            type="button"
                            onClick={handleGetConsultation}
                        >
                          {ui.book}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
            );
          })()}
        </AnimatePresence>

        <ContactModal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
        />
      </main>
  );
};

export default Projects;