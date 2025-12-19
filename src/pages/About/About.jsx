import React from 'react';
import { Link } from 'react-router-dom';
import classes from './About.module.css';

const About = () => {
  const sections = [
    {
      title: "О нас",
      subtitle: "Ваш проводник в мир Грузии",
      text: "Компания Erti Eri — команда профессионалов, которые знают Грузию изнутри. Мы создаём путешествия, где всё выверено: маршрут, темп, впечатления и детали. Каждый тур — это история, в которой вы чувствуете страну, а не просто «смотрите места».",
    },
    {
      title: "Наша миссия",
      subtitle: "Показать настоящую Грузию",
      text: "Мы делаем поездки живыми: культура, природа, вкусы и атмосфера — всё в правильных пропорциях. Вы увидите знаковые точки и скрытые места, узнаете легенды и факты, попробуете настоящие локальные вкусы и почувствуете характер страны.",
    },
    {
      title: "Наш опыт",
      subtitle: "Более 10 лет в туризме",
      text: "За годы работы мы организовали тысячи поездок для гостей из разных стран. Мы знаем, где красиво, где вкусно, где безопасно и как собрать идеальную программу под ваш запрос — от короткого уикенда до большого путешествия по стране.",
    },
    {
      title: "Что мы делаем",
      subtitle: "Индивидуальный подход",
      text: "Экскурсии, море, горы, винные маршруты, событийные туры и особые поводы. Мы собираем поездку так, чтобы вы отдыхали, а не решали вопросы: транспорт, тайминг, локации, подсказки и сопровождение — всё продумано заранее.",
    },
    {
      title: "Начните путешествие",
      subtitle: "Грузия ждёт вас",
      text: "Напишите нам — и мы соберём маршрут под вас: с правильной логикой, хорошими остановками, комфортным темпом и вау-моментами. Откройте Грузию вместе с Erti Eri — красиво, спокойно и по-умному.",
      cta: true
    }
  ];

  return (
      <div className={classes.about}>
        {sections.map((section, index) => (
            <section key={index} className={classes.section}>
              <div className={classes.container}>
                <div className={classes.topRow}>
                  <span className={classes.number}>0{index + 1}</span>
                  <span className={classes.pill}>Erti Eri</span>
                </div>

                <h1 className={classes.title}>{section.title}</h1>
                <p className={classes.subtitle}>{section.subtitle}</p>
                <p className={classes.text}>{section.text}</p>

                {section.cta && (
                    <Link to="/contact" className={classes.linkWrapper}>
                      <button className={classes.ctaButton}>
                        Связаться с нами
                      </button>
                    </Link>
                )}
              </div>

              {index < sections.length - 1 && (
                  <div className={classes.scrollIndicator}>
                    <div className={classes.mouse}>
                      <div className={classes.wheel}></div>
                    </div>
                  </div>
              )}
            </section>
        ))}
      </div>
  );
};

export default About;
