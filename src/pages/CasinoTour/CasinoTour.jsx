import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './CasinoTour.module.css';

// Use same shared images pack
import img1 from './images/a-high-end-casino-vip-gaming-hall-with-polished-bl.png';
import img2 from './images/a-premium-rooftop-lounge-pool-at-night--overlookin.png';
import img3 from './images/deep-shadows--subtle-sparkles--dark-background-fad.png';
import img4 from './images/a-stylish-night-entertainment-scene-with-a-premium.png';
import img5 from './images/a-luxurious-nighttime-coastal-city-scene-with-a-wi.png';


const CasinoTour = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = useMemo(
      () => [img1, img2, img3, img4, img5],
      []
  );

  const blocks = useMemo(
      () => [
        {
          id: 1,
          title: 'Казино тур',
          subtitle: 'Роскошь и азарт',
          description:
              'Грузия становится новой игорной точкой региона: современные казино мирового уровня, деликатная роскошь, сервис и атмосфера, которую хочется прожить хотя бы раз.',
          fullDescription:
              'Казино-тур — это не про “шумно и ярко”, а про стиль и ощущение уровня: правильные локации, грамотный тайминг, комфортный транспорт и лучшие залы. Мы собираем программу под вас: где играть, где ужинать, где провести вечер — и всё это без суеты. Вы отдыхаете, мы держим контроль.',
          image: images[0]
        },
        {
          id: 2,
          title: 'Премиум казино',
          subtitle: 'Лучшие игровые залы',
          description:
              'Casino Adjara, Shangri La, OrientExpress — рулетка, покер, блэкджек, слоты. VIP-зоны и спокойная подача без “показухи”.',
          fullDescription:
              'Мы подберём залы и формат под ваш стиль: классика (рулетка/блэкджек), покерные столы или аккуратные игровые автоматы. Поможем с VIP-входом, приоритетом по столам и рекомендациями по лучшим часам. Важно: всё легально, безопасно и с уважением к вашему приватному отдыху.',
          image: images[1]
        },
        {
          id: 3,
          title: 'Развлечения',
          subtitle: 'Не только игры',
          description:
              'Рестораны, бары, шоу, ночные локации и спокойные места для восстановления: SPA, бассейн, поздний завтрак. Тур строится вокруг удовольствия.',
          fullDescription:
              'Казино-тур — это целая ночь красивых деталей. Мы добавим “вкус”: правильный ресторан, хороший бар, музыку, виды, и обязательно — комфорт на следующий день. Хотите вечер “тихо и статусно” или “с эмоцией” — сделаем, но без лишнего шума.',
          image: images[4]
        },
        {
          id: 4,
          title: 'VIP-сервис',
          subtitle: 'Эксклюзивное обслуживание',
          description:
              'Трансфер на премиум авто, лучшие номера, персональный хост, гибкий маршрут. Вы чувствуете контроль и лёгкость — всё идет по плану.',
          fullDescription:
              'Мы организуем логистику и детали так, чтобы всё выглядело естественно и уверенно: время, маршруты, входы, размещение, приватность. По запросу — персональный менеджер на связи, индивидуальные программы и аккуратные VIP-решения без излишнего блеска.',
          image: images[3]
        },
        {
          id: 5,
          title: 'Испытайте удачу',
          subtitle: 'Забронируйте казино тур',
          description:
              'Полная организация поездки: транспорт, размещение, сопровождение и комфортный сценарий вечера. Безопасно, легально и премиально.',
          fullDescription:
              'Напишите нам — и мы соберём программу под ваш вкус. Можно сделать короткий “вечерний” формат или полноценный тур на несколько дней с отдыхом, кухней и лучшими локациями. Вы получаете стильную поездку, а не набор случайных решений.',
          image: images[2],
          cta: true
        }
      ],
      [images]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
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

  const layoutIdByBlock = (id) => `casino-img-${id}`;

  const openModal = (block) => {
    if (!block.cta) setSelectedBlock(block);
  };

  const closeModal = () => setSelectedBlock(null);

  return (
      <div className={classes.casinoTour}>
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
                  role={!block.cta ? 'button' : undefined}
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
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
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

export default CasinoTour;
