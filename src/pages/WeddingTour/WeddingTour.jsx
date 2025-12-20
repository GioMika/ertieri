import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './WeddingTour.module.css';

// Use the same images pack you already have everywhere
import img1 from './images/a-breathtaking-sunset-over-the-caucasus-mountains-.png';
import img2 from './images/a-rooftop-terrace-in-old-tbilisi-with-a-view-of-ti.png';
import img3 from './images/a-vineyard-terrace-overlooking-green-valleys-with-.png';
import img4 from './images/a-wedding-arch-on-a-black-sea-beach-at-sunset--whi.png';
import img5 from './images/a-wedding-ceremony-setup-inside-an-ancient-stone-f.png';


const WeddingTour = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const images = useMemo(
      () => [img1, img2, img3, img4, img5],
      []
  );

  const blocks = useMemo(
      () => [
        {
          id: 1,
          title: 'Свадебный тур',
          subtitle: 'Свадьба вашей мечты в Грузии',
          description:
              'Представьте церемонию на фоне заснеженных вершин Кавказа, у берега Черного моря или в древней крепости. Грузия — идеальное место для романтики и настоящего гостеприимства.',
          fullDescription:
              'Свадьба в Грузии — это эмоция, стиль и ощущение “это было по-настоящему”. Мы поможем выбрать концепцию: горы, море, виноградники или архитектура старого города. Подберём локацию, выстроим тайминг, организуем транспорт, декор, фото/видео и банкет. Вы наслаждаетесь моментом — мы держим контроль.',
          image: images[0]
        },
        {
          id: 2,
          title: 'Организация церемонии',
          subtitle: 'Официальная регистрация',
          description:
              'Помощь с документами и официальная регистрация брака в Грузии. Традиционный грузинский формат или европейская церемония — всё под ваш стиль.',
          fullDescription:
              'Мы берем на себя организационную часть: понятный список документов, сопровождение и запись, консультация по срокам и сценариям. Хотите камерную регистрацию, выездную церемонию или полноценный день с ведущим — соберём программу под вас, спокойно и уверенно.',
          image: images[1]
        },
        {
          id: 3,
          title: 'Красивейшие локации',
          subtitle: 'Незабываемые фотосессии',
          description:
              'Старый город Тбилиси, крепость Нарикала, горы Казбеги, побережье Батуми. Мы подберём локации и свет так, чтобы кадры выглядели дорого и живо.',
          fullDescription:
              'Мы знаем места, где “случайный кадр” выглядит как обложка. Подберем локации под вашу историю: городской романтизм, горный масштаб или море. Поможем со временем съемки, маршрутами, логистикой и атмосферой — чтобы всё было естественно, без суеты.',
          image: images[2]
        },
        {
          id: 4,
          title: 'Свадебный банкет',
          subtitle: 'Грузинское гостеприимство',
          description:
              'Ресторан с видом, традиционная кухня, легендарное вино из квеври. Тамада, живая музыка и танцы — праздник, который запомнят все.',
          fullDescription:
              'Банкет — это кульминация: правильная площадка, меню, вино, музыка и настроение. Мы поможем подобрать ресторан и формат: уютно и камерно или красиво и масштабно. Продумаем детали — от рассадки до финального тоста.',
          image: images[4]
        },
        {
          id: 5,
          title: 'Скажите “Да!” в Грузии',
          subtitle: 'Организуем вашу свадьбу',
          description:
              'Полная организация: документы, локации, фото/видео, декор, банкет, размещение гостей. Свяжитесь с нами — и мы соберем концепцию под вашу историю.',
          fullDescription:
              'Мы делаем свадьбы, которые выглядят “как кино”, но ощущаются легко. Напишите нам — и мы предложим несколько концепций, локаций и сценариев под ваш бюджет и настроение. Всё прозрачно: план, тайминг, сметы и ответственность.',
          image: images[3],
          cta: true
        }
      ],
      [images]
  );

  // ======= НЕ МЕНЯЮ: эффект появления блоков =======
  const getBlockVariants = (index) => {
    const angles = [0, 72, 144, 216, 288];
    const angle = angles[index] || 0;

    return {
      hidden: {
        opacity: 0,
        scale: 0.3,
        x: Math.cos((angle * Math.PI) / 180) * -50,
        y: Math.sin((angle * Math.PI) / 180) * -50
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 90,
          duration: 1,
          delay: blocks[index].delay
        }
      }
    };
  };
  // ==================================================

  // delays remain unique (as you had)
  blocks[0].delay = 0;
  blocks[1].delay = 0.1;
  blocks[2].delay = 0.2;
  blocks[3].delay = 0.3;
  blocks[4].delay = 0.4;

  const openModal = (block) => {
    if (!block.cta) setSelectedBlock(block);
  };
  const closeModal = () => setSelectedBlock(null);

  const layoutIdByBlock = (id) => `wedding-img-${id}`;

  return (
      <div className={classes.weddingTour}>
        <div className={classes.container}>
          {blocks.map((block, index) => (
              <motion.div
                  key={block.id}
                  className={`${classes.block} ${classes[`block${block.id}`]} ${block.cta ? classes.ctaBlock : ''}`}
                  variants={getBlockVariants(index)}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
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
                        Организовать свадьбу
                      </motion.button>
                    </Link>
                )}
              </motion.div>
          ))}
        </div>

        {/* Modal (same premium glass style) */}
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
                        <button className={classes.modalCtaButton}>Забронировать консультацию</button>
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

export default WeddingTour;
