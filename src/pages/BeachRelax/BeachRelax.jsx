import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './BeachRelax.module.css';

// Import all images
import img1 from './images/a-cinematic-black-sea-coast-near-batumi-with-cryst.png';
import img2 from './images/a-long-pebble-and-sand-beach-with-gradients-of-dee.png';
import img3 from './images/a-luxury-seaside-hotel-with-glass-facades-reflecti.png';
import img4 from './images/batumi-nightlife-along-the-coast-with-neon-turquoi.png';
import img5 from './images/early-sunrise-over-the-black-sea-with-pastel-turqu.png';


const BeachRelax = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = [img1, img2, img3, img4, img5];

  const blocks = [
    {
      id: 1,
      title: 'Отдых на море',
      subtitle: 'Черноморское побережье Батуми',
      description: 'Погрузитесь в атмосферу роскошного пляжного отдыха на берегу Черного моря. Батуми — жемчужина грузинского побережья с современной инфраструктурой и бесконечными возможностями для отдыха.',
      fullDescription: 'Батуми — это настоящая жемчужина Черноморского побережья Грузии. Город сочетает в себе современную инфраструктуру, богатую историю и уникальную природу. Здесь вы найдете все для идеального отдыха: чистые пляжи, роскошные отели, рестораны с национальной кухней, живописную набережную и множество развлечений. Мягкий субтропический климат позволяет наслаждаться морем с мая по октябрь.',
      image: images[4]
    },
    {
      id: 2,
      title: 'Пляжи и набережная',
      subtitle: 'Километры чистых пляжей',
      description: 'Галечные и песчаные пляжи протянулись вдоль всего побережья. Знаменитый Батумский бульвар длиной 7 километров — идеальное место для вечерних прогулок с видом на море.',
      fullDescription: 'Батумское побережье славится своими ухоженными пляжами и знаменитым бульваром. 7-километровая набережная оснащена велосипедными дорожками, кафе, фонтанами и современными арт-объектами. Пляжи оборудованы лежаками, зонтиками и душевыми. Вечером набережная превращается в оживленное место встреч с уличными музыкантами и художниками.',
      image: images[1]
    },
    {
      id: 3,
      title: 'Развлечения',
      subtitle: 'Море активностей',
      description: 'Аквапарк, дельфинарий, канатная дорога Арго, Ботанический сад, современные рестораны, ночные клубы и казино. В Батуми скучать не придется!',
      fullDescription: 'Батуми предлагает развлечения на любой вкус. Посетите современный аквапарк с экстремальными горками, дельфинарий с увлекательными шоу, поднимитесь на канатной дороге Арго на высоту 250 метров для панорамного вида на город. Прогуляйтесь по Ботаническому саду с уникальной коллекцией растений. Вечером город оживает — работают многочисленные рестораны, бары, ночные клубы и казино мирового класса.',
      image: images[3]
    },
    {
      id: 4,
      title: 'Отели премиум-класса',
      subtitle: 'Комфорт на высшем уровне',
      description: 'Роскошные отели с видом на море, SPA-центры, бассейны, рестораны. Мы подберем идеальное размещение под ваш бюджет — от уютных гестхаусов до 5-звездочных отелей.',
      fullDescription: 'В Батуми представлен широкий выбор отелей на любой вкус и бюджет. Роскошные 5-звездочные отели предлагают номера с видом на море, SPA-центры мирового уровня, бассейны на крыше, рестораны высокой кухни и персональное обслуживание. Для тех, кто ищет более бюджетный вариант, доступны уютные гестхаусы и апартаменты с домашней атмосферой. Мы поможем подобрать идеальное размещение именно для вас.',
      image: images[2]
    },
    {
      id: 5,
      title: 'Готовы к отдыху?',
      subtitle: 'Свяжитесь с нами сейчас!',
      description: 'Мы организуем ваш идеальный пляжный отдых в Батуми. Трансфер из аэропорта, бронирование отеля, экскурсии — всё включено. Оставьте заявку прямо сейчас!',
      fullDescription: 'Доверьте организацию вашего отдыха профессионалам! Мы предлагаем полный пакет услуг: встреча в аэропорту и трансфер до отеля, бронирование лучших отелей по специальным ценам, организация экскурсий по Батуми и окрестностям, помощь с арендой автомобиля, рекомендации по ресторанам и развлечениям. Работаем 24/7, всегда на связи. Свяжитесь с нами прямо сейчас и получите индивидуальное предложение!',
      image: images[4],
      cta: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const blockVariants = {
    hidden: { y: -150, opacity: 0, scale: 0.7, rotate: -8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", damping: 15, stiffness: 120, duration: 0.9 }
    }
  };

  const handleBlockClick = (block) => {
    if (!block.cta) setSelectedBlock(block);
  };

  const closeModal = () => setSelectedBlock(null);

  // For shared layout animation
  const layoutIdByBlock = (id) => `beach-img-${id}`;

  return (
      <div className={classes.beachRelax}>
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
                  variants={blockVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
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
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.96 }}
                      >
                        Забронировать тур
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

                    {/* Centered hero image (shared layout => perfect centering) */}
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
                        <button className={classes.modalCtaButton}>
                          Забронировать
                        </button>
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

export default BeachRelax;
