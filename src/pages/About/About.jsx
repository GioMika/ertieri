import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./About.module.css";

const About = () => {
  const navigate = useNavigate();

  const sections = useMemo(
      () => [
        {
          title: "О нас",
          subtitle: "Ваш проводник в мир Грузии",
          text: "Компания Erti Eri — команда профессионалов, которые знают Грузию изнутри. Мы создаём путешествия, где всё выверено: маршрут, темп, впечатления и детали. Каждый тур — это история, в которой вы чувствуете страну, а не просто «смотрите места».",
          // ✅ логично: это про компанию → можно на услуги
          to: "/services",
        },
        {
          title: "Наша миссия",
          subtitle: "Показать настоящую Грузию",
          text: "Мы делаем поездки живыми: культура, природа, вкусы и атмосфера — всё в правильных пропорциях. Вы увидите знаковые точки и скрытые места, узнаете легенды и факты, попробуете настоящие локальные вкусы и почувствуете характер страны.",
          to: "/services",
        },
        {
          title: "Наш опыт",
          subtitle: "Более 10 лет в туризме",
          text: "За годы работы мы организовали тысячи поездок для гостей из разных стран. Мы знаем, где красиво, где вкусно, где безопасно и как собрать идеальную программу под ваш запрос — от короткого уикенда до большого путешествия по стране.",
          // ✅ можно на блог (доверие/соц.доказательства), или тоже на services
          to: "/blog",
        },
        {
          title: "Что мы делаем",
          subtitle: "Индивидуальный подход",
          text: "Экскурсии, море, горы, винные маршруты, событийные туры и особые поводы. Мы собираем поездку так, чтобы вы отдыхали, а не решали вопросы: транспорт, тайминг, локации, подсказки и сопровождение — всё продумано заранее.",
          to: "/services",
        },
        {
          title: "Начните путешествие",
          subtitle: "Грузия ждёт вас",
          text: "Напишите нам — и мы соберём маршрут под вас: с правильной логикой, хорошими остановками, комфортным темпом и вау-моментами. Откройте Грузию вместе с Erti Eri — красиво, спокойно и по-умному.",
          cta: true,
          // ✅ CTA → контакт
          to: "/contact",
        },
      ],
      []
  );

  const cardBackgrounds = useMemo(
      () => [
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
      ],
      []
  );

  const go = (to) => {
    if (!to) return;
    navigate(to);
  };

  const onCardKeyDown = (e, to) => {
    if (!to) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
      <div className={classes.about}>
        <header className={classes.header}>
          <div className={classes.brandPill}>Erti Eri</div>
          <h1 className={classes.pageTitle}>О Нашей компании </h1>
          {/*<p className={classes.pageSubtitle}>*/}
          {/*  Минимализм, премиум-подача и смысл — без перегруза.*/}
          {/*</p>*/}
        </header>

        <div className={classes.grid}>
          {sections.map((s, i) => {
            const isCta = Boolean(s.cta);
            const clickable = Boolean(s.to);

            return (
                <article
                    key={i}
                    className={`${classes.card} ${classes[`card${i + 1}`]} ${
                        isCta ? classes.ctaCard : ""
                    } ${clickable ? classes.clickable : ""}`}
                    style={{ ["--card-bg"]: cardBackgrounds[i] }}
                    onClick={() => go(s.to)}
                    role={clickable ? "link" : undefined}
                    tabIndex={clickable ? 0 : -1}
                    onKeyDown={(e) => onCardKeyDown(e, s.to)}
                    aria-label={clickable ? `${s.title}. Перейти` : undefined}
                >
                  <div className={classes.cardTop}>
                    <div className={classes.meta}>
                      <span className={classes.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={classes.dot} />
                      <span className={classes.tag}>{s.subtitle}</span>
                    </div>

                    <div className={classes.arrow} aria-hidden="true">
                      ↗
                    </div>
                  </div>

                  <h2 className={classes.title}>{s.title}</h2>
                  <p className={classes.text}>{s.text}</p>

                  {isCta && (
                      <div className={classes.ctaRow} onClick={(e) => e.stopPropagation()}>
                        <Link to="/contact" className={classes.linkWrapper}>
                          <button className={classes.ctaButton}>Связаться с нами</button>
                        </Link>
                        <div className={classes.ctaHint}>Ответим быстро. Поможем собрать маршрут.</div>
                      </div>
                  )}
                </article>
            );
          })}
        </div>
      </div>
  );
};

export default About;
