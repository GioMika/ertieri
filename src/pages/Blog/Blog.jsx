import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./Blog.module.css";

import img1 from "./images/a-dramatic-mountain-landscape-in-svaneti-with-anci.png";
import img2 from "./images/a-still-life-composition-inside-an-ancient-wine-ce.png";
import img3 from "./images/a-sunrise-scene-on-a-calm-black-sea-shore-with-coa.png";
import img4 from "./images/a-panoramic-night-view-of-tbilisi-old-town-with-wa.png";
import img5 from "./images/foodgeorian.jpg";

const IMAGES = [img1, img2, img3, img4, img5];

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const Blog = () => {
  const { t, i18n } = useTranslation("blog");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);
  const [selected, setSelected] = useState(null);

  const articlesRaw = t("articles", { returnObjects: true });

  const articles = useMemo(() => {
    const arr = Array.isArray(articlesRaw) ? articlesRaw : [];
    return arr.map((a) => ({ ...a, image: IMAGES[a.imageIndex ?? 0] }));
  }, [articlesRaw]);

  const openArticle  = useCallback((a) => setSelected(a), []);
  const closeArticle = useCallback(() => setSelected(null), []);

  const pageTitle    = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");
  const ui           = t("ui", { returnObjects: true }) || {};

  // lock scroll when modal open
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    const onKey = (e) => { if (e.key === "Escape") closeArticle(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, closeArticle]);

  return (
      <main className={classes.blog}>

        <header className={classes.header}>
          <p className={classes.eyebrow}>Erti Eri</p>
          <h1 className={classes.pageTitle}>{pageTitle}</h1>
          {pageSubtitle && <p className={classes.pageSubtitle}>{pageSubtitle}</p>}
          <div className={classes.headerLine} />
        </header>

        <div className={classes.grid}>
          {articles.map((a) => (
              <motion.article
                  key={a.id}
                  className={classes.card}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openArticle(a)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openArticle(a);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={a.title}
              >
                {/* Фото */}
                <div className={classes.imgWrap}>
                  <img
                      src={a.image}
                      alt={a.imageAlt || a.title}
                      className={classes.img}
                      loading="lazy"
                  />
                  <div className={classes.imgOverlay} />

                  {/* Категория + время чтения поверх фото */}
                  <div className={classes.imgTop}>
                    {a.category && (
                        <span className={classes.category}>{a.category}</span>
                    )}
                    {a.readTime && (
                        <span className={classes.readTime}>{a.readTime}</span>
                    )}
                  </div>
                </div>

                {/* Тело карточки — под фото на белом */}
                <div className={classes.body}>
                  {a.date && <p className={classes.date}>{a.date}</p>}
                  <h2 className={classes.title}>{a.title}</h2>
                  <p className={classes.excerpt}>{a.excerpt}</p>

                  <div className={classes.cardFooter}>
                    <span className={classes.readMore}>{ui.readMore || "Read more"}</span>
                    <span className={classes.arrowCircle} aria-hidden="true">↗</span>
                  </div>
                </div>
              </motion.article>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
              <motion.div
                  className={classes.modalLayer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                <div className={classes.backdrop} onClick={closeArticle} />

                <motion.div
                    className={classes.modal}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.97 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selected.title}
                >
                  <button
                      className={classes.close}
                      onClick={closeArticle}
                      aria-label={ui.close || "Close"}
                      type="button"
                  >✕</button>

                  {/* Фото — левая колонка */}
                  <div className={classes.hero}>
                    <img
                        src={selected.image}
                        alt={selected.imageAlt || selected.title}
                        className={classes.heroImg}
                    />
                    <div className={classes.heroShade} />
                  </div>

                  {/* Контент — правая колонка */}
                  <div className={classes.modalContent}>
                    <p className={classes.modalMeta}>
                      {[selected.category, selected.date, selected.readTime]
                          .filter(Boolean)
                          .join(" · ")}
                    </p>
                    <h2 className={classes.modalTitle}>{selected.title}</h2>
                    <p className={classes.lead}>{selected.excerpt}</p>

                    {Array.isArray(selected.content) && (
                        <div className={classes.prose}>
                          {selected.content.map((p, idx) => (
                              <p key={idx} className={classes.paragraph}>{p}</p>
                          ))}
                        </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

      </main>
  );
};

export default Blog;