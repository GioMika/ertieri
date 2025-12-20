import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./Blog.module.css";

import img1 from "./images/a-dramatic-mountain-landscape-in-svaneti-with-anci.png";
import img2 from "./images/a-still-life-composition-inside-an-ancient-wine-ce.png";
import img3 from "./images/a-sunrise-scene-on-a-calm-black-sea-shore-with-coa.png";
import img4 from "./images/a-panoramic-night-view-of-tbilisi-old-town-with-wa.png";
import img5 from "./images/foodgeorian.jpg";

// ✅ 5 фирменных градиентов (как About Us)
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

// ✅ "рандом", но стабильно: зависит от id (потом добавишь статьи — будут новые цвета)
const pickBgById = (id) => CARD_BACKGROUNDS[(Number(id) * 7 + 3) % CARD_BACKGROUNDS.length];

const Blog = () => {
  const [selected, setSelected] = useState(null);

  const articles = useMemo(
      () => [
        {
          id: 1,
          image: img4,
          category: "Путешествия",
          title: "Топ-10 мест в Тбилиси",
          excerpt:
              "Маршрут без спешки: старый город, бани, панорамы и точки, где Тбилиси ощущается по-настоящему.",
          date: "15 декабря 2024",
          readTime: "5 мин",
          content: [
            "Тбилиси — город контрастов: старые дворики и современный ритм, уютные улицы и большие панорамы.",
            "Начните со старого города и Абанотубани, затем — крепость Нарикала и виды на город. Вечером — винный бар или ужин с видом.",
            "Чтобы сделать поездку объемной: добавьте утренний рынок, дегустацию в марани и пару современных районов."
          ]
        },
        {
          id: 2,
          image: img2,
          category: "Культура",
          title: "Грузинское вино: 8000 лет традиций",
          excerpt:
              "Квеври, терруары, семейные винодельни и правильная дегустация — почему грузинское вино цепляет глубже обычного.",
          date: "12 декабря 2024",
          readTime: "7 мин",
          content: [
            "Грузия — один из центров мирового виноделия, и это не легенда.",
            "Квеври — глиняные сосуды, закопанные в землю: вкус получается глубоким и “живым”.",
            "Лучший формат знакомства — дегустация с хозяином: вино + история + атмосфера."
          ]
        },
        {
          id: 3,
          image: img5,
          category: "Гастрономия",
          title: "Гастрономический гид по Грузии",
          excerpt:
              "Что попробовать кроме очевидного: региональные отличия, сезонные блюда и как выбирать места без туристических ловушек.",
          date: "10 декабря 2024",
          readTime: "6 мин",
          content: [
            "Кухня в Грузии — это регионы, а не один список блюд.",
            "Хинкали, хачапури и лобио — база. Но настоящая магия в сезонных овощах, соусах и домашней подаче.",
            "Простой критерий: если туда ходят местные — почти всегда будет вкусно."
          ]
        },
        {
          id: 4,
          image: img1,
          category: "Приключения",
          title: "Треккинг в Сванетии",
          excerpt:
              "Башни, ледники и маршруты, которые выглядят как кино. Как подготовиться и что выбрать, если вы едете впервые.",
          date: "8 декабря 2024",
          readTime: "8 мин",
          content: [
            "Сванетия — эмоция: вершины, туманы, башни и масштаб, который трудно передать словами.",
            "Для первого раза выбирайте умеренные маршруты с гостевыми домами — комфортно и очень атмосферно.",
            "Погода меняется быстро: обувь, слойность и запас по времени — обязательны."
          ]
        },
        {
          id: 5,
          image: img3,
          category: "Советы",
          title: "Первый раз в Грузии",
          excerpt:
              "Как спланировать поездку без стресса: транспорт, деньги, связь и маленькие привычки, которые делают отдых комфортным.",
          date: "5 декабря 2024",
          readTime: "4 мин",
          content: [
            "Планируйте вокруг 2–3 базовых точек и одного сильного выезда (горы/вино/море).",
            "Между городами комфорт часто важнее экономии: поезд/трансфер решают.",
            "Не пытайтесь успеть всё — Грузия хороша тем, что здесь хочется жить, а не “галочки ставить”."
          ]
        }
      ],
      []
  );

  const openArticle = useCallback((article) => setSelected(article), []);
  const closeArticle = useCallback(() => setSelected(null), []);

  // ✅ LOCK BODY SCROLL + ESC
  useEffect(() => {
    if (!selected) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;

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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }
  };

  const metaText = (a) => `${a.category} · ${a.date} · ${a.readTime}`;

  return (
      <div className={classes.blog}>
        <div className={classes.header}>
          <motion.h1
              className={classes.pageTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
            Блог
          </motion.h1>
          <motion.p
              className={classes.pageSubtitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
          >
            Истории и идеи — минимально, красиво, по делу.
          </motion.p>
        </div>

        <motion.div className={classes.grid} variants={listVariants} initial="hidden" animate="visible">
          {articles.map((a) => (
              <motion.article
                  key={a.id}
                  className={classes.card}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openArticle(a)}
                  role="button"
                  tabIndex={0}
                  style={{ ["--card-bg"]: pickBgById(a.id) }}
              >
                <div className={classes.media}>
                  <img src={a.image} alt={a.title} className={classes.image} loading="lazy" />
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
                >
                  <button className={classes.close} onClick={closeArticle} aria-label="Закрыть" type="button">
                    ✕
                  </button>

                  <div className={classes.hero} style={{ ["--card-bg"]: pickBgById(selected.id) }}>
                    <img src={selected.image} alt={selected.title} className={classes.heroImg} />
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
      </div>
  );
};

export default Blog;
