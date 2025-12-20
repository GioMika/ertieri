import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Excursions.module.css';

// Import all images
import img1 from './images/a-close-up-view-inside-a-vineyard-in-odessa--with-.png';
import img2 from './images/an-ancient-georgian-monastery-overlooking-the-conf.jpg';
import img3 from './images/medieval-svaneti-stone-towers-in-mestia-surrounded.jpg';
import img4 from './images/gonio-fortress-by-the-black-sea--subtropical-palm-.jpg';
import img5 from './images/night-panorama-of-tbilisi-with-narikala-fortress--.jpg';
import img6 from './images/majestic-mount-kazbegi-with-the-gergeti-trinity-ch.jpg';


const Excursions = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = useMemo(
      () => [img1, img2, img3, img4, img5, img6],
      []
  );

  const blocks = useMemo(
      () => [
        {
          id: 1,
          title: 'Экскурсии по Грузии',
          subtitle: 'Откройте древнюю историю',
          description:
              'Погрузитесь в богатейшую историю Грузии — страны с 3000-летней культурой. Посетите древние храмы, крепости и пещерные города, внесенные в список ЮНЕСКО.',
          fullDescription:
              'Грузия — это музей под открытым небом с 3000-летней историей. Здесь христианство было принято в 4 веке, задолго до Руси. Древние храмы Мцхеты, пещерные города Вардзия и Уплисцихе, горные крепости Ананури и Рабати — каждый камень здесь дышит историей. Наши экскурсии познакомят вас с уникальной культурой, традициями виноделия (8000 лет!), национальной кухней и легендарным грузинским гостеприимством.',
          image: images[0]
        },
        {
          id: 2,
          title: 'Тбилиси и окрестности',
          subtitle: 'Столица с душой',
          description:
              'Старый город с узкими улочками, серные бани, крепость Нарикала, современный район Вера. Дегустация вина в погребах и ужин в аутентичных ресторанах.',
          fullDescription:
              'Тбилиси — город с душой, где древность органично сплетается с современностью. Прогуляйтесь по старому городу с разноцветными домами на балконах, посетите знаменитые серные бани (где купался сам Пушкин!), поднимитесь по канатной дороге к крепости Нарикала для панорамного вида. Посетите современный район Вера с модными кафе. Вечером — дегустация грузинских вин в традиционном марани и ужин в аутентичном ресторане с живой музыкой.',
          image: images[4]
        },
        {
          id: 3,
          title: 'Мцхета — древняя столица',
          subtitle: 'Сердце христианства',
          description:
              'Храм Джвари (6 век), монастырь Светицховели — место крещения Грузии. Слияние двух рек Арагви и Куры. Винодельня с дегустацией в квеври.',
          fullDescription:
              'Мцхета — древняя столица Грузии и священный город, где крестилась вся страна в 337 году. Храм Джвари (6 век) на вершине горы — шедевр архитектуры, воспетый Лермонтовым в "Мцыри". Кафедральный собор Светицховели хранит хитон Господень. Здесь же сливаются две реки — Арагви и Кура, создавая удивительное зрелище. Завершим день посещением традиционной винодельни с дегустацией вин, выдержанных в квеври — глиняных сосудах, закопанных в землю.',
          image: images[1]
        },
        {
          id: 4,
          title: 'Казбеги и горы',
          subtitle: 'Величие Кавказа',
          description:
              'Военно-Грузинская дорога, церковь Гергети на высоте 2170м с видом на гору Казбек (5047м). Захватывающие пейзажи, горные реки и водопады.',
          fullDescription:
              'Казбеги — это высокогорная Грузия во всей красе. Поездка по знаменитой Военно-Грузинской дороге через Крестовый перевал (2395м) подарит незабываемые виды. Главная цель — церковь Святой Троицы в Гергети на высоте 2170 метров, откуда открывается вид на величественный Казбек (5047м). По пути — захватывающие водопады, бурные горные реки, древние крепости. Возможен подъем на джипах или пеший трекинг. Обед в горном ресторане с видом на вершины.',
          image: images[5]
        },
        {
          id: 5,
          title: 'Начните путешествие',
          subtitle: 'Забронируйте экскурсию',
          description:
              'Профессиональные гиды, комфортный транспорт, индивидуальные маршруты. Мы покажем вам Грузию, которую вы полюбите навсегда!',
          fullDescription:
              'Доверьте свое путешествие профессионалам! Наши русскоязычные гиды — настоящие знатоки истории и культуры Грузии, которые сделают экскурсию живой и увлекательной. Комфортабельный транспорт с кондиционером, гибкие маршруты под ваши интересы, помощь с бронированием ресторанов. Предлагаем как групповые, так и индивидуальные туры. Работаем 24/7. Свяжитесь с нами прямо сейчас!',
          image: images[2],
          cta: true
        }
      ],
      [images]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 140 }
    }
  };

  const handleBlockClick = (block) => {
    if (!block.cta) setSelectedBlock(block);
  };

  const closeModal = () => setSelectedBlock(null);

  const layoutIdByBlock = (id) => `excursion-img-${id}`;

  return (
      <div className={classes.excursions}>
        <motion.div
            className={classes.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {blocks.map((block) => (
              <motion.div
                  key={block.id}
                  className={`${classes.block} ${classes[`block${block.id}`]}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.25 } }}
                  onClick={() => handleBlockClick(block)}
                  role={!block.cta ? "button" : undefined}
                  tabIndex={!block.cta ? 0 : -1}
              >
                <div className={classes.imageWrapper}>
                  <motion.img
                      src={block.image}
                      alt={block.title}
                      className={classes.blockImage}
                      layoutId={layoutIdByBlock(block.id)}
                  />
                </div>

                <h2 className={classes.title}>{block.title}</h2>
                <p className={classes.subtitle}>{block.subtitle}</p>
                <p className={classes.description}>{block.description}</p>

                {block.cta && (
                    <Link to="/contact" className={classes.ctaLink}>
                      <motion.button
                          className={classes.ctaButton}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.97 }}
                      >
                        Забронировать экскурсию
                      </motion.button>
                    </Link>
                )}
              </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedBlock && (
              <>
                <motion.div
                    className={classes.modalBackdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                />

                <motion.div
                    className={classes.modalWrapper}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    role="dialog"
                    aria-modal="true"
                >
                  <div className={classes.modal}>
                    <button className={classes.closeButton} onClick={closeModal} aria-label="Закрыть">
                      ✕
                    </button>

                    <div className={classes.modalHero}>
                      <motion.img
                          src={selectedBlock.image}
                          alt={selectedBlock.title}
                          className={classes.modalHeroImg}
                          layoutId={layoutIdByBlock(selectedBlock.id)}
                      />
                    </div>

                    <div className={classes.modalContent}>
                      <h2 className={classes.modalTitle}>{selectedBlock.title}</h2>
                      <p className={classes.modalSubtitle}>{selectedBlock.subtitle}</p>
                      <p className={classes.modalDescription}>{selectedBlock.fullDescription}</p>

                      <Link to="/contact" className={classes.modalCtaLink} onClick={closeModal}>
                        <button className={classes.modalCtaButton}>Забронировать</button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Excursions;
