import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Services.module.css';

const Services = () => {
  const tours = [
    {
      title: 'Экскурсии',
      subtitle: 'Исследуйте историю и культуру',
      text: 'Погрузитесь в богатую историю и архитектуру: древние храмы и крепости, места ЮНЕСКО, легенды, гастрономия и винные традиции. Маршруты под ваш темп — от классики до hidden gems.',
      link: '/excursions',
      pill: 'Tours'
    },
    {
      title: 'Отдых на море',
      subtitle: 'Черноморское побережье',
      text: 'Тёплое море, длинная набережная, пляжи и стильный ритм курортного города. Мы подберём отель, трансфер, лучшие локации и идеальный баланс отдыха и впечатлений.',
      link: '/beach-relax',
      pill: 'Sea'
    },
    {
      title: 'Отдых в горах',
      subtitle: 'Величественный Кавказ',
      text: 'Кристальный воздух, панорамы, треккинг и уютные отели с видом на вершины. Зимой — горнолыжные курорты, летом — маршруты, каньоны, водопады и приключения без суеты.',
      link: '/mountain-relax',
      pill: 'Mountains'
    },
    {
      title: 'Казино тур',
      subtitle: 'Развлечения и атмосфера',
      text: 'Современные казино, отели и рестораны высокого уровня — для тех, кто любит вечерний город и яркие эмоции. Мы организуем всё под ключ: логистика, проживание и лучшие места.',
      link: '/casino-tour',
      pill: 'Night'
    },
    {
      title: 'Свадебный тур',
      subtitle: 'Свадьба вашей мечты',
      text: 'Локации “как кино”: горы, море, городская архитектура или виноградники. Организация церемонии, тайминг, декор, фото/видео и банкет — аккуратно, уверенно и со вкусом.',
      link: '/wedding-tour',
      pill: 'Wedding'
    }
  ];

  return (
      <section className={classes.services}>
        <div className={classes.shell}>
          <header className={classes.header}>
            <h1 className={classes.h1}>Сервис, который собирает Эмоции</h1>
          </header>

          <div className={classes.grid}>
            {tours.map((t, idx) => (
                <Link
                    key={t.link}
                    to={t.link}
                    className={classes.cardLink}
                    aria-label={`${t.title}. Открыть`}
                >
                  <article className={classes.card}>
                    <div className={classes.cardTop}>
                      <div className={classes.num}>{String(idx + 1).padStart(2, '0')}</div>
                      <div className={classes.pill}>{t.pill}</div>
                    </div>

                    <h2 className={classes.title}>{t.title}</h2>
                    <div className={classes.subtitle}>{t.subtitle}</div>

                    <p className={classes.text}>{t.text}</p>

                    <div className={classes.footer}>
                      <span className={classes.more}>Подробнее</span>
                      <span className={classes.arrow} aria-hidden="true">→</span>
                    </div>
                  </article>
                </Link>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Services;
