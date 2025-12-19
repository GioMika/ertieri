import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./Blog.module.css";

// Import images
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
            "Начните с старого города и Абанотубани, затем — крепость Нарикала и виды на город. Вечером — винный бар или ужин с видом.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }
  };

  const openArticle = (article) => setSelected(article);
  const closeArticle = () => setSelected(null);

  return (
      <div className={classes.blog}>
        <div className={classes.header}>
          <motion.h1
              className={classes.pageTitle}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
            Блог о путешествиях
          </motion.h1>
          <motion.p
              className={classes.pageSubtitle}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
          >
            Истории, советы и вдохновение — лаконично, красиво, по-премиуму.
          </motion.p>
        </div>

        <motion.div className={classes.container} variants={containerVariants} initial="hidden" animate="visible">
          {articles.map((article) => (
              <motion.article
                  key={article.id}
                  className={classes.card}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openArticle(article)}
              >
                <div className={classes.media}>
                  <img src={article.image} alt={article.title} className={classes.image} loading="lazy" />
                  <div className={classes.mediaShade} />
                  <div className={classes.pillRow}>
                    <span className={classes.pill}>{article.category}</span>
                    <span className={classes.pillMuted}>
                  {article.date} · {article.readTime}
                </span>
                  </div>
                </div>

                <div className={classes.content}>
                  <h2 className={classes.title}>{article.title}</h2>
                  <p className={classes.excerpt}>{article.excerpt}</p>

                  <div className={classes.bottomRow}>
                    <span className={classes.author}>{article.author}</span>
                    <span className={classes.arrow}>Читать →</span>
                  </div>
                </div>
              </motion.article>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected && (
              <>
                <motion.div
                    className={classes.modalBackdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeArticle}
                />

                <motion.div
                    className={classes.modalWrapper}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.98 }}
                    transition={{ type: "spring", damping: 26, stiffness: 320 }}
                    role="dialog"
                    aria-modal="true"
                >
                  <div className={classes.modal}>
                    <button
                        className={classes.closeButton}
                        onClick={closeArticle}
                        aria-label="Закрыть"
                        type="button"
                    >
                      ✕
                    </button>

                    <div className={classes.modalHero}>
                      <img src={selected.image} alt={selected.title} className={classes.modalHeroImg} />
                      <div className={classes.modalHeroShade} />
                      <div className={classes.modalHeroText}>
                        <div className={classes.modalPills}>
                          <span className={classes.modalPill}>{selected.category}</span>
                          <span className={classes.modalPillMuted}>
                        {selected.date} · {selected.readTime}
                      </span>
                        </div>

                        <h2 className={classes.modalTitle}>{selected.title}</h2>
                        <p className={classes.modalAuthor}>{selected.author}</p>
                      </div>
                    </div>

                    <div className={classes.modalBody}>
                      <p className={classes.modalLead}>{selected.excerpt}</p>

                      {selected.content?.map((p, idx) => (
                          <p key={idx} className={classes.modalParagraph}>
                            {p}
                          </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Blog;
