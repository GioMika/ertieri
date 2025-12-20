import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './MountainRelax.module.css';

// Use same shared images pack
import img1 from './images/a-climber-standing-near-a-summit-ridge-with-clouds.png';
import img2 from './images/a-cozy-mountain-hotel-terrace-overlooking-a-dramat.png';
import img3 from './images/a-dynamic-winter-ski-resort-scene-with-fresh-powde.png';
import img4 from './images/a-hiker-walking-along-a-narrow-mountain-trail-surr.png';
import img5 from './images/a-panoramic-view-of-the-caucasus-mountains-in-geor.png';


const MountainRelax = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = useMemo(
      () => [img1, img2, img3, img4, img5],
      []
  );

  const blocks = useMemo(
      () => [
        {
          id: 1,
          title: 'Отдых в горах',
          subtitle: 'Величие Кавказа',
          description:
              'Откройте для себя отдых в грузинских горах: чистый воздух, снежные вершины Кавказа, альпийские луга и виды, которые хочется оставить в памяти навсегда.',
          fullDescription:
              'Горная Грузия — это другой ритм. Здесь утро начинается с прозрачного воздуха и тишины, а день — с дорог, которые ведут к панорамам, как из кино. Мы подберем маршрут под ваш темп: комфортный, активный или смешанный. Вас ждут смотровые площадки, горные деревни, тёплые гостевые дома, локальная кухня и ощущение свободы, которое дают только горы.',
          image: images[4]
        },
        {
          id: 2,
          title: 'Горнолыжные курорты',
          subtitle: 'Гудаури и Бакуриани',
          description:
              'Трассы разного уровня, надежный снег в сезон, прокат, инструкторы и комфортная инфраструктура. Зима в Грузии — это красиво, безопасно и по-настоящему драйвово.',
          fullDescription:
              'Гудаури — идеален для тех, кто любит простор и виды. Бакуриани — более семейный и спокойный, с уютной атмосферой. Мы организуем всё “под ключ”: трансфер, жильё, ски-пассы, оборудование, инструктора при необходимости. Хотите кататься или просто наслаждаться зимними видами у камина — сделаем так, чтобы вы отдыхали, а не решали логистику.',
          image: images[2]
        },
        {
          id: 3,
          title: 'Треккинг и хайкинг',
          subtitle: 'Маршруты для всех',
          description:
              'Сванетия, Казбеги, Тушетия — от лёгких прогулок до серьёзных маршрутов. Опытные гиды, правильный тайминг, красивые точки и ощущение настоящего приключения.',
          fullDescription:
              'Мы делаем треккинг комфортным: подбираем сложность, темп и продолжительность, планируем остановки, видовые точки и время на фото. Можно выбрать однодневные маршруты или несколько дней с ночёвками. По запросу — кемпинг, пикник, фотосопровождение. Важно одно: вы видите лучшее и не устаете “в ноль”.',
          image: images[3]
        },
        {
          id: 4,
          title: 'Горные отели',
          subtitle: 'Комфорт на высоте',
          description:
              'От уютных гестхаусов с домашней кухней до современных отелей с панорамными окнами. Тёплый свет, камин, веранда и вид, ради которого хочется вставать рано.',
          fullDescription:
              'Мы рекомендуем места, где действительно приятно жить: хороший сон, чистота, атмосфера, сервис и виды. Подберём варианты под стиль вашей поездки — романтика, семья, друзья, “тихо и красиво”. Плюс — помощь с бронированием, заездом, трансфером и всей связанной логистикой.',
          image: images[1]
        },
        {
          id: 5,
          title: 'Покорите вершины',
          subtitle: 'Начните приключение',
          description:
              'Организуем горный отдых под ключ: маршрут, транспорт, размещение, гиды и активности. Зима или лето — вы получаете путешествие, которое хочется повторить.',
          fullDescription:
              'Напишите нам — и мы соберём программу под ваши даты и пожелания. Хотите больше природы, меньше людей, больше комфорта или больше активности — всё возможно. Мы держим контроль за таймингом, маршрутами и сервисом, чтобы вы наслаждались горами без лишней суеты.',
          image: images[0],
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

  const layoutIdByBlock = (id) => `mountain-img-${id}`;

  const openModal = (block) => {
    if (!block.cta) setSelectedBlock(block);
  };

  const closeModal = () => setSelectedBlock(null);

  return (
      <div className={classes.mountainRelax}>
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
                  onClick={() => openModal(block)}
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
                        Забронировать тур
                      </motion.button>
                    </Link>
                )}
              </motion.div>
          ))}
        </motion.div>

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

export default MountainRelax;
