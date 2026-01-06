import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import classes from "./Blog.module.css";

import img1 from "./images/a-dramatic-mountain-landscape-in-svaneti-with-anci.png";
import img2 from "./images/a-still-life-composition-inside-an-ancient-wine-ce.png";
import img3 from "./images/a-sunrise-scene-on-a-calm-black-sea-shore-with-coa.png";
import img4 from "./images/a-panoramic-night-view-of-tbilisi-old-town-with-wa.png";
import img5 from "./images/foodgeorian.jpg";

const SITE_URL = "https://ertieri.ge";

const CARD_BACKGROUNDS = [
  `radial-gradient(900px 700px at 18% 12%, rgba(96,165,250,.22), transparent 60%),
   radial-gradient(850px 650px at 82% 18%, rgba(34,211,238,.14), transparent 58%),
   linear-gradient(135deg, #061726 0%, #081a2b 45%, #06121f 100%)`,
  `radial-gradient(900px 700px at 20% 20%, rgba(167,139,250,.18), transparent 60%),
   radial-gradient(900px 650px at 82% 22%, rgba(96,165,250,.14), transparent 58%),
   linear-gradient(135deg, #070a1a 0%, #0a1030 55%, #06081a 100%)`,
  `radial-gradient(900px 700px at 22% 18%, rgba(34,211,238,.16), transparent 60%),
   radial-gradient(900px 650px at 78% 24%, rgba(16,185,129,.12), transparent 58%),
   linear-gradient(135deg, #06141f 0%, #081f2b 55%, #050f18 100%)`,
  `radial-gradient(900px 700px at 20% 16%, rgba(96,165,250,.18), transparent 60%),
   radial-gradient(900px 650px at 78% 26%, rgba(244,114,182,.10), transparent 58%),
   linear-gradient(135deg, #071022 0%, #0a1530 55%, #060b18 100%)`,
  `radial-gradient(900px 700px at 18% 14%, rgba(167,139,250,.16), transparent 60%),
   radial-gradient(900px 650px at 80% 24%, rgba(34,211,238,.12), transparent 58%),
   linear-gradient(135deg, #06111e 0%, #0a1a2b 55%, #050a14 100%)`,
];

const pickBgById = (id) =>
    CARD_BACKGROUNDS[(Number(id) * 7 + 3) % CARD_BACKGROUNDS.length];

// аккуратный “слаг” для JSON-LD/якорей
const slugify = (s = "") =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9а-яё\s-]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const normalizeLang = (lng) => (lng || "ru").split("-")[0];

const Blog = () => {
  const { t, i18n } = useTranslation("blog");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const [selected, setSelected] = useState(null);

  const images = useMemo(() => [img1, img2, img3, img4, img5], []);

  // ====== Тексты из JSON ======
  const meta = t("meta", { returnObjects: true }) || {};
  const ui = t("ui", { returnObjects: true }) || {};
  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const articlesRaw = t("articles", { returnObjects: true });
  const articles = useMemo(() => {
    const arr = Array.isArray(articlesRaw) ? articlesRaw : [];
    return arr.map((a) => ({
      ...a,
      image: images[a.imageIndex ?? 0],
    }));
  }, [articlesRaw, images]);

  const canonicalUrl =
      meta.canonical ||
      `${SITE_URL}/${lang === "en" ? "en" : lang === "ge" ? "ge" : "ru"}/blog`;

  const alternates = meta.alternates || {
    ru: `${SITE_URL}/ru/blog`,
    en: `${SITE_URL}/en/blog`,
    ka: `${SITE_URL}/ge/blog`,
  };

  const ogImage = meta.ogImage || `${SITE_URL}/og-blog.jpg`;

  // ====== SEO JSON-LD (Blog + BlogPosting) ======
  const jsonLd = useMemo(() => {
    const blogId = `${canonicalUrl}#blog`;

    const posts = (articles || []).map((a) => {
      const slug = slugify(a.title) || `article-${a.id}`;
      const url = `${canonicalUrl}#${slug}`;

      return {
        "@type": "BlogPosting",
        "@id": url,
        headline: a.title,
        description: a.excerpt,
        image: [ogImage],
        // ⚠️ у тебя даты текстовые — для SEO лучше ISO.
        // Ставим safe fallback, а если хочешь — добавишь datePublishedIso в JSON позже.
        datePublished: a.datePublishedIso || "2024-12-01",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Erti Eri" },
        publisher: { "@type": "Organization", name: "Erti Eri" },
      };
    });

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": blogId,
          name: meta.ogTitle || meta.title,
          description: meta.description,
          url: canonicalUrl,
          inLanguage: lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE",
          publisher: { "@type": "Organization", name: "Erti Eri" },
          blogPost: posts.map((p) => ({ "@id": p["@id"] })),
        },
        ...posts,
      ],
    };
  }, [articles, canonicalUrl, lang, meta.ogTitle, meta.title, meta.description, ogImage]);

  // ====== НЕ ТРОГАЮ: анимации ======
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const metaText = (a) => `${a.category} · ${a.date} · ${a.readTime}`;

  const openArticle = useCallback((article) => setSelected(article), []);
  const closeArticle = useCallback(() => setSelected(null), []);

  // LOCK BODY SCROLL + ESC (не трогаю)
  useEffect(() => {
    if (!selected) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0)
      document.body.style.paddingRight = `${scrollBarWidth}px`;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeArticle();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, closeArticle]);

  const onCardKeyDown = (e, a) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openArticle(a);
    }
  };

  return (
      <>
        <Helmet>
          <html lang={lang} />

          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonicalUrl} />

          {/* hreflang */}
          <link rel="alternate" hrefLang="ru" href={alternates.ru} />
          <link rel="alternate" hrefLang="en" href={alternates.en} />
          <link rel="alternate" hrefLang="ka" href={alternates.ka} />
          <link rel="alternate" hrefLang="x-default" href={alternates.en} />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.ogTitle || meta.title} />
          <meta property="og:description" content={meta.ogDescription || meta.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="Erti Eri" />
          <meta
              property="og:locale"
              content={meta.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE")}
          />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.ogTitle || meta.title} />
          <meta name="twitter:description" content={meta.ogDescription || meta.description} />
          <meta name="twitter:image" content={ogImage} />

          {/* JSON-LD */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        <main className={classes.blog}>
          <header className={classes.header}>
            <motion.h1
                className={classes.pageTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              {pageTitle}
            </motion.h1>

            <p className={classes.pageSubtitle}>{pageSubtitle}</p>
          </header>

          <motion.div
              className={classes.grid}
              variants={listVariants}
              initial="hidden"
              animate="visible"
          >
            {articles.map((a) => (
                <motion.article
                    key={a.id}
                    className={classes.card}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => openArticle(a)}
                    onKeyDown={(e) => onCardKeyDown(e, a)}
                    role="button"
                    tabIndex={0}
                    style={{ ["--card-bg"]: pickBgById(a.id) }}
                    aria-label={a.title}
                >
                  <div className={classes.media}>
                    <img
                        src={a.image}
                        alt={a.imageAlt || a.title}
                        className={classes.image}
                        loading="lazy"
                    />
                    <div className={classes.mediaShade} />
                  </div>

                  <div className={classes.body}>
                    <p className={classes.metaLine}>{metaText(a)}</p>
                    <h2 className={classes.title}>{a.title}</h2>
                    <p className={classes.excerpt}>{a.excerpt}</p>
                  </div>
                </motion.article>
            ))}
          </motion.div>

          <AnimatePresence>
            {selected && (
                <motion.div
                    className={classes.modalLayer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-hidden={false}
                >
                  <div className={classes.backdrop} onClick={closeArticle} />

                  <motion.div
                      className={classes.modal}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.98 }}
                      transition={{ type: "spring", damping: 28, stiffness: 320 }}
                      role="dialog"
                      aria-modal="true"
                      aria-label={selected.title}
                  >
                    <button
                        className={classes.close}
                        onClick={closeArticle}
                        aria-label={ui.close || "Close"}
                        type="button"
                    >
                      ✕
                    </button>

                    <div
                        className={classes.hero}
                        style={{ ["--card-bg"]: pickBgById(selected.id) }}
                    >
                      <img
                          src={selected.image}
                          alt={selected.imageAlt || selected.title}
                          className={classes.heroImg}
                      />
                      <div className={classes.heroShade} />
                    </div>

                    <div className={classes.modalContent}>
                      <p className={classes.modalMeta}>{metaText(selected)}</p>
                      <h2 className={classes.modalTitle}>{selected.title}</h2>
                      <p className={classes.lead}>{selected.excerpt}</p>

                      <div className={classes.prose}>
                        {selected.content?.map((p, idx) => (
                            <p key={idx} className={classes.paragraph}>
                              {p}
                            </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </main>
      </>
  );
};

export default Blog;
