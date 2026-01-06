import React, { useMemo, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Send,
  Clock,
} from "lucide-react";
import classes from "./Contact.module.css";

const SITE_URL = "https://ertieri.ge";
const normalizeLang = (lng) => (lng || "ru").split("-")[0];

// Мемоизированная карточка контакта
const ContactCard = memo(({ icon: Icon, label, value, href, external, ariaLabel }) => (
    <a
        className={classes.card}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
    >
      <div className={classes.icon}>
        <Icon size={20} />
      </div>
      <div className={classes.cardBody}>
        <div className={classes.cardTop}>
          <span className={classes.cardLabel}>{label}</span>
        </div>
        <div className={classes.cardValueRow}>
          <strong className={classes.cardValue}>{value}</strong>
          <span className={classes.cardAction}>
          <ArrowUpRight size={18} />
        </span>
        </div>
      </div>
    </a>
));

// Статичная карточка (без ссылки)
const InfoCard = memo(({ icon: Icon, label, value }) => (
    <div className={classes.card} role="group" aria-label={label}>
      <div className={classes.icon}>
        <Icon size={20} />
      </div>
      <div className={classes.cardBody}>
        <div className={classes.cardTop}>
          <span className={classes.cardLabel}>{label}</span>
        </div>
        <div className={classes.cardValueRow}>
          <strong className={classes.cardValue}>{value}</strong>
          <span className={classes.cardActionMuted} />
        </div>
      </div>
    </div>
));

const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Здесь будет логика отправки формы
    console.log("Form submitted:", formData);

    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    // Опционально: очистка формы после отправки
    // setFormData({ name: "", email: "", message: "" });
  };

  // Контакты
  const whatsappNumber = "995XXXXXXXXX";
  const emailAddress = "hello@ertieri.ge";

  // Мемоизация текстов (предотвращает ре-рендеры)
  const meta = useMemo(() => t("meta", { returnObjects: true }) || {}, [t]);
  const ui = useMemo(() => t("ui", { returnObjects: true }) || {}, [t]);
  const data = useMemo(() => t("data", { returnObjects: true }) || {}, [t]);

  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const pathLang = lang === "ge" ? "ge" : lang === "en" ? "en" : "ru";
  const pageUrl = `${SITE_URL}/${pathLang}/contact`;

  const alternates = useMemo(() => ({
    ru: `${SITE_URL}/ru/contact`,
    en: `${SITE_URL}/en/contact`,
    ka: `${SITE_URL}/ge/contact`,
  }), []);

  const ogImage = `${SITE_URL}/og-contact.jpg`;
  const ogLocale = lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE";

  const googleMapsUrl = useMemo(() => {
    const dest = data.mapDestination || data.address || "Batumi, Bako St. 8";
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
  }, [data.mapDestination, data.address]);

  // JSON-LD
  const jsonLd = useMemo(
      () => ({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: meta.title,
        description: meta.description,
        url: pageUrl,
        inLanguage: lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "ka-GE",
        isPartOf: { "@type": "WebSite", name: "Erti Eri", url: SITE_URL },
        about: {
          "@type": "TravelAgency",
          name: "Erti Eri",
          url: SITE_URL,
          email: emailAddress,
          telephone: `+${whatsappNumber}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: data.streetAddress || "Bako St. 8",
            addressLocality: data.city || "Batumi",
            addressRegion: "Adjara",
            postalCode: "6000",
            addressCountry: "GE",
          },
          openingHours: data.openingHours || "Mo-Su 10:00-20:00",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: emailAddress,
            telephone: `+${whatsappNumber}`,
            availableLanguage: ["ru", "en", "ka"],
          },
        },
      }),
      [meta.title, meta.description, pageUrl, lang, data.streetAddress, data.city, data.openingHours]
  );

  return (
      <>

        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* hreflang */}
        <link rel="alternate" hrefLang="ru" href={alternates.ru} />
        <link rel="alternate" hrefLang="en" href={alternates.en} />
        <link rel="alternate" hrefLang="ka" href={alternates.ka} />
        <link rel="alternate" hrefLang="x-default" href={alternates.en} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle || meta.title} />
        <meta property="og:description" content={meta.ogDescription || meta.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Erti Eri" />
        <meta property="og:locale" content={ogLocale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle || meta.title} />
        <meta name="twitter:description" content={meta.ogDescription || meta.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        {/* Основной контент */}
        <section className={classes.contact}>
          <div className={classes.bg} />

          <div className={classes.container}>
            {/* HEADER */}
            <header className={classes.header}>
              <h1 className={classes.title}>{pageTitle}</h1>
              {pageSubtitle && <p className={classes.subtitle}>{pageSubtitle}</p>}
            </header>

            <div className={classes.grid}>
              {/* LEFT: cards + map */}
              <div className={classes.left}>
                <div className={classes.cards}>
                  <ContactCard
                      icon={Mail}
                      label="Email"
                      value={emailAddress}
                      href={`mailto:${emailAddress}`}
                      ariaLabel={ui.ctaEmail}
                  />

                  <ContactCard
                      icon={MessageCircle}
                      label="WhatsApp"
                      value={data.whatsappDisplay || `+${whatsappNumber}`}
                      href={`https://wa.me/${whatsappNumber}`}
                      external
                      ariaLabel={ui.ctaWhatsApp}
                  />

                  <div className={classes.card} role="group" aria-label={ui.office}>
                    <div className={classes.icon}>
                      <MapPin size={20} />
                    </div>
                    <div className={classes.cardBody}>
                      <div className={classes.cardTop}>
                        <span className={classes.cardLabel}>{ui.office}</span>
                      </div>
                      <div className={classes.cardValueRow}>
                        <strong className={classes.cardValue}>{data.address}</strong>
                        <a
                            className={classes.cardActionLink}
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={ui.route}
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <InfoCard
                      icon={Clock}
                      label={ui.schedule}
                      value={data.workTime}
                  />
                </div>

                {/* MAP */}
                <article className={classes.mapCard}>
                  <div className={classes.mapHeader}>
                    <div>
                      <h2 className={classes.mapTitle}>{ui.mapTitle}</h2>
                      <p className={classes.mapSubtitle}>{ui.mapSubtitle}</p>
                    </div>

                    <a
                        className={classes.mapBtn}
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      {ui.route} <ArrowUpRight size={18} />
                    </a>
                  </div>

                  <div className={classes.mapWrap}>
                    <iframe
                        src={data.embedMapSrc}
                        className={classes.map}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={ui.mapIframeTitle}
                    />
                  </div>
                </article>
              </div>

              {/* RIGHT: form */}
              <div className={classes.right}>
                <article className={classes.formCard}>
                  <div className={classes.formHeader}>
                    <h2 className={classes.formTitle}>{ui.messageTitle}</h2>
                    {ui.hint && <p className={classes.formHint}>{ui.hint}</p>}
                  </div>

                  <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.row}>
                      <label className={classes.field}>
                        <span className={classes.label}>{ui.name}</span>
                        <input
                            className={classes.input}
                            type="text"
                            name="name"
                            placeholder={ui.namePh}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            disabled={isSubmitting}
                        />
                      </label>

                      <label className={classes.field}>
                        <span className={classes.label}>{ui.email}</span>
                        <input
                            className={classes.input}
                            type="email"
                            name="email"
                            placeholder={ui.emailPh}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            disabled={isSubmitting}
                        />
                      </label>
                    </div>

                    <label className={classes.field}>
                      <span className={classes.label}>{ui.message}</span>
                      <textarea
                          className={classes.textarea}
                          name="message"
                          placeholder={ui.messagePh}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          disabled={isSubmitting}
                      />
                    </label>

                    <button
                        type="submit"
                        className={classes.submit}
                        aria-label={ui.send}
                        disabled={isSubmitting}
                    >
                      <Send size={18} />
                      {isSubmitting ? (ui.sending || "Отправка...") : ui.send}
                    </button>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default Contact;