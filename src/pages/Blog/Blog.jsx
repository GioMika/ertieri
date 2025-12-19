import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./Blog.module.css";

import img1 from "../../shared/images/imagesPages/img1.jpg";
import img2 from "../../shared/images/imagesPages/img2.jpg";
import img3 from "../../shared/images/imagesPages/img3.jpg";
import img4 from "../../shared/images/imagesPages/img4.jpeg";
import img5 from "../../shared/images/imagesPages/img5.jpeg";

const Blog = () => {
  const [selected, setSelected] = useState(null);

  const articles = useMemo(
      () => [
        {
          id: 1,
          image: img1,
          category: "Путешествия",
          title: "Топ-10 мест в Тбилиси",
          excerpt:
              "Маршрут без спешки: старый город, бани, панорамы, винные бары и точки, где Тбилиси ощущается по-настоящему.",
          author: "Анна Иванова",
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
          author: "Георгий Надирадзе",
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
          image: img3,
          category: "Гастрономия",
          title: "Гастрономический гид по Грузии",
          excerpt:
              "Что попробовать кроме очевидного: региональные отличия, сезонные блюда и как выбирать места без туристических ловушек.",
          author: "Мария Петрова",
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
          image: img4,
          category: "Приключения",
          title: "Треккинг в Сванетии",
          excerpt:
              "Башни, ледники и маршруты, которые выглядят как кино. Как подготовиться и что выбрать, если вы едете впервые.",
          author: "Давид Мчедлидзе",
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
          image: img5,
          category: "Советы",
          title: "Первый раз в Грузии",
          excerpt:
              "Как спланировать поездку без стресса: транспорт, деньги, связь и маленькие привычки, которые делают отдых комфортным.",
          author: "Елена Соколова",
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

  const openArticle = (article) => setSelected(article);
  const closeArticle = () => setSelected(null);

  // ✅ LOCK BODY SCROLL + ESC close (чтобы не дёргалось и не "уносило")
  useEffect(() => {
    if (!selected) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // компенсация скроллбара (на десктопе)
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
  }, [selected]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.10 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
      <div className={classes.blog}>
        <div className={classes.header}>
          <motion.h1
              className={classes.pageTitle}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
            Блог о путешествиях
          </motion.h1>
          <motion.p
              className={classes.pageSubtitle}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
          >
            Истории, советы и вдохновение — аккуратно, современно, без лишнего шума.
          </motion.p>
        </div>

        <motion.div className={classes.grid} variants={listVariants} initial="hidden" animate="visible">
          {articles.map((a) => (
              <motion.article
                  key={a.id}
                  className={classes.card}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openArticle(a)}
                  role="button"
                  tabIndex={0}
              >
                <div className={classes.media}>
                  <img src={a.image} alt={a.title} className={classes.image} loading="lazy" />
                  <div className={classes.mediaShade} />
                  <div className={classes.metaTop}>
                    <span className={classes.badge}>{a.category}</span>
                    <span className={classes.metaText}>
                  {a.date} · {a.readTime}
                </span>
                  </div>
                </div>

                <div className={classes.body}>
                  <h2 className={classes.title}>{a.title}</h2>
                  <p className={classes.excerpt}>{a.excerpt}</p>

                  <div className={classes.footer}>
                    <span className={classes.author}>{a.author}</span>
                    <span className={classes.read}>Читать →</span>
                  </div>
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

                  <div className={classes.hero}>
                    <img src={selected.image} alt={selected.title} className={classes.heroImg} />
                    <div className={classes.heroShade} />

                    <div className={classes.heroContent}>
                      <div className={classes.heroMeta}>
                        <span className={classes.badge}>{selected.category}</span>
                        <span className={classes.metaText}>
                      {selected.date} · {selected.readTime}
                    </span>
                      </div>
                      <h2 className={classes.heroTitle}>{selected.title}</h2>
                      <p className={classes.heroAuthor}>{selected.author}</p>
                    </div>
                  </div>

                  <div className={classes.content}>
                    <p className={classes.lead}>{selected.excerpt}</p>
                    {selected.content?.map((p, idx) => (
                        <p key={idx} className={classes.paragraph}>
                          {p}
                        </p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Blog;
