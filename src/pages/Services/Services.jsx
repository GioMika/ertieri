import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Services.module.css';

const Services = () => {
  const tours = [
    {
      title: 'Экскурсии',
      subtitle: 'Исследуйте историю и культуру',
      text: 'Погрузитесь в богатую историю и архитектуру: древние храмы и крепости, места ЮНЕСКО, легенды, гастрономия и винные традиции. Маршруты под ваш темп — от классики до hidden gems.',
      link: '/excursions'
    },
    {
      title: 'Отдых на море',
      subtitle: 'Черноморское побережье',
      text: 'Тёплое море, длинная набережная, пляжи и стильный ритм курортного города. Мы подберём отель, трансфер, лучшие локации и идеальный баланс отдыха и впечатлений.',
      link: '/beach-relax'
    },
    {
      title: 'Отдых в горах',
      subtitle: 'Величественный Кавказ',
      text: 'Кристальный воздух, панорамы, треккинг и уютные отели с видом на вершины. Зимой — горнолыжные курорты, летом — маршруты, каньоны, водопады и приключения без суеты.',
      link: '/mountain-relax'
    },
    {
      title: 'Казино тур',
      subtitle: 'Развлечения и атмосфера',
      text: 'Современные казино, отели и рестораны высокого уровня — для тех, кто любит вечерний город и яркие эмоции. Мы организуем всё под ключ: логистика, проживание и лучшие места.',
      link: '/casino-tour'
    },
    {
      title: 'Свадебный тур',
      subtitle: 'Свадьба вашей мечты',
      text: 'Локации “как кино”: горы, море, городская архитектура или виноградники. Организация церемонии, тайминг, декор, фото/видео и банкет — аккуратно, уверенно и со вкусом.',
      link: '/wedding-tour'
    }
  ];

  return (
      <div className={classes.services}>
        {tours.map((tour, index) => (
            <section key={index} className={classes.section}>
              <div className={classes.container}>
                <div className={classes.kicker}>Туры и впечатления</div>

                <h1 className={classes.title}>{tour.title}</h1>
                <p className={classes.subtitle}>{tour.subtitle}</p>
                <p className={classes.text}>{tour.text}</p>

                <Link to={tour.link} className={classes.linkWrapper}>
                  <button className={classes.ctaButton}>Узнать подробнее</button>
                </Link>
              </div>

              {index < tours.length - 1 && (
                  <div className={classes.scrollIndicator} aria-hidden="true">
                    <div className={classes.mouse}>
                      <div className={classes.wheel} />
                    </div>
                    <div className={classes.scrollHint}>Листайте</div>
                  </div>
              )}
            </section>
        ))}
      </div>
  );
};

export default Services;
