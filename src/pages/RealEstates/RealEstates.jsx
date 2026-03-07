import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./RealEstates.module.css";
import ContactModal from "../../widgets/ContactModal/ContactModal.jsx";
import video from "./video/video.MP4";

/* ── Inline translations — no external JSON files needed ── */
const TRANSLATIONS = {
  ru: {
    eyebrow:     "INVESTOUR ESTATE",
    titleMain:   "Недвижимость",
    titleItalic: "в Грузии",
    subtitle:    "Апартаменты у моря, виллы в горах, инвестиционные объекты — мы подбираем недвижимость под ваш запрос и сопровождаем на каждом этапе сделки.",
    stat1Num:    "200+",
    stat1Label:  "объектов в базе",
    stat2Num:    "5 лет",
    stat2Label:  "на рынке Грузии",
    stat3Num:    "от $60K",
    stat3Label:  "стартовая цена",
    btnPrimary:  "Подобрать недвижимость",
    btnSecondary:"Смотреть каталог",
    modalTitle:  "Подобрать недвижимость",
    modalSub:    "Расскажите о своих пожеланиях — бюджет, локация, формат. Мы подберём варианты и свяжемся с вами.",
    modalSubject:"Подбор недвижимости — Erti Eri Estate",
  },
  en: {
    eyebrow:     "INVESTOUR ESTATE",
    titleMain:   "Real Estate",
    titleItalic: "in Georgia",
    subtitle:    "Sea-view apartments, mountain villas, investment properties — we find the right match for your request and guide you through every step of the deal.",
    stat1Num:    "200+",
    stat1Label:  "properties listed",
    stat2Num:    "5 years",
    stat2Label:  "on the Georgian market",
    stat3Num:    "from $60K",
    stat3Label:  "starting price",
    btnPrimary:  "Find a property",
    btnSecondary:"View catalogue",
    modalTitle:  "Find a property",
    modalSub:    "Tell us your preferences — budget, location, type. We will select options and get back to you.",
    modalSubject:"Property request — Erti Eri Estate",
  },
  ge: {
    eyebrow:     "INVESTOUR ESTATE",
    titleMain:   "უძრავი ქონება",
    titleItalic: "საქართველოში",
    subtitle:    "ბინები ზღვასთან, ვილები მთებში, საინვესტიციო ობიექტები — ვარჩევთ თქვენი მოთხოვნის მიხედვით და გვერდით ვდგავართ გარიგების ყველა ეტაპზე.",
    stat1Num:    "200+",
    stat1Label:  "ობიექტი ბაზაში",
    stat2Num:    "5 წელი",
    stat2Label:  "საქართველოს ბაზარზე",
    stat3Num:    "$60K-დან",
    stat3Label:  "საწყისი ფასი",
    btnPrimary:  "ქონების შერჩევა",
    btnSecondary:"კატალოგის ნახვა",
    modalTitle:  "ქონების შერჩევა",
    modalSub:    "მოგვიყევით თქვენი სურვილების შესახებ — ბიუჯეტი, ლოკაცია, ტიპი. შევარჩევთ ვარიანტებს და დაგიკავშირდებით.",
    modalSubject:"ქონების მოთხოვნა — Erti Eri Estate",
  },
};

const normalize = (lng) => (lng || "ru").split("-")[0].toLowerCase();

const RealEstates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { i18n } = useTranslation();

  const lang = normalize(i18n.resolvedLanguage || i18n.language);
  const t = useMemo(
      () => TRANSLATIONS[lang] || TRANSLATIONS.ru,
      [lang]
  );

  return (
      <div className={styles.page}>

        {/* ── Video background ── */}
        <div className={styles.videoBg}>
          <video
              className={styles.video}
              src={video}
              autoPlay muted loop playsInline
          />
          <div className={styles.videoOverlay} />
        </div>

        {/* ── Content ── */}
        <div className={styles.content}>
          <motion.div
              className={styles.center}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.eyebrow}>{t.eyebrow}</p>

            <h1 className={styles.title}>
              {t.titleMain}{" "}
              <span className={styles.titleItalic}>{t.titleItalic}</span>
            </h1>

            <p className={styles.subtitle}>{t.subtitle}</p>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>{t.stat1Num}</span>
                <span className={styles.statLabel}>{t.stat1Label}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>{t.stat2Num}</span>
                <span className={styles.statLabel}>{t.stat2Label}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>{t.stat3Num}</span>
                <span className={styles.statLabel}>{t.stat3Label}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button
                  className={styles.btnPrimary}
                  onClick={() => setModalOpen(true)}
              >
                <Building2 size={16} />
                {t.btnPrimary}
              </button>

              <Link to="/projects" className={styles.btnSecondary}>
                {t.btnSecondary}
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Modal ── */}
        <ContactModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={t.modalTitle}
            subtitle={t.modalSub}
            subject={t.modalSubject}
        />
      </div>
  );
};

export default RealEstates;