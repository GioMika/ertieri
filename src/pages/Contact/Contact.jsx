import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
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

const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
      setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Контакты (можно потом вынести в env/config)
  const whatsappNumber = "995XXXXXXXXX";
  const emailAddress = "hello@ertieri.com";

  // Тексты
  const meta = t("meta", { returnObjects: true }) || {};
  const ui = t("ui", { returnObjects: true }) || {};
  const data = t("data", { returnObjects: true }) || {};

  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const pathLang = lang === "ge" ? "ge" : lang === "en" ? "en" : "ru";
  const pageUrl = `${SITE_URL}/${pathLang}/contact`;

  const alternates = meta.alternates || {
    ru: `${SITE_URL}/ru/contact`,
    en: `${SITE_URL}/en/contact`,
    ka: `${SITE_URL}/ge/contact`,
  };

  const ogImage = meta.ogImage || `${SITE_URL}/og-contact.jpg`;
  const ogLocale = meta.locale || (lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE");

  const googleMapsUrl = useMemo(() => {
    const dest = data.mapDestination || data.address || "Batumi, Bako St. 8";
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
  }, [data.mapDestination, data.address]);

  // JSON-LD: ContactPage + TravelAgency
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
            streetAddress: data.streetAddress || "",
            addressLocality: data.city || "",
            addressCountry: "GE",
          },
          openingHours: data.openingHours || "Mo-Su 10:00-20:00",
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: emailAddress,
              telephone: `+${whatsappNumber}`,
              availableLanguage: ["ru", "en", "ka"],
            },
          ],
        },
      }),
      [
        meta.title,
        meta.description,
        pageUrl,
        lang,
        data.streetAddress,
        data.city,
        data.openingHours,
        emailAddress,
        whatsappNumber,
      ]
  );

  return (
      <>
        <Helmet>
          <html lang={lang} />

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

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.ogTitle || meta.title} />
          <meta name="twitter:description" content={meta.ogDescription || meta.description} />
          <meta name="twitter:image" content={ogImage} />

          {/* JSON-LD */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        <section className={classes.contact}>
          <div className={classes.bg} />

          <div className={classes.container}>
            {/* HEADER */}
            <header className={classes.header}>
              <span className={classes.kicker}>{ui.kicker}</span>
              <h1 className={classes.title}>{pageTitle}</h1>
              <p className={classes.subtitle}>{pageSubtitle}</p>
            </header>

            <div className={classes.grid}>
              {/* LEFT: cards + map */}
              <div className={classes.left}>
                <div className={classes.cards}>
                  <a
                      className={classes.card}
                      href={`mailto:${emailAddress}`}
                      aria-label={ui.ctaEmail}
                  >
                    <div className={classes.icon}>
                      <Mail size={20} />
                    </div>

                    <div className={classes.cardBody}>
                      <div className={classes.cardTop}>
                        <span className={classes.cardLabel}>Email</span>
                      </div>
                      <div className={classes.cardValueRow}>
                        <strong className={classes.cardValue}>{emailAddress}</strong>
                        <span className={classes.cardAction}>
                        <ArrowUpRight size={18} />
                      </span>
                      </div>
                    </div>
                  </a>

                  <a
                      className={classes.card}
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ui.ctaWhatsApp}
                  >
                    <div className={classes.icon}>
                      <MessageCircle size={20} />
                    </div>

                    <div className={classes.cardBody}>
                      <div className={classes.cardTop}>
                        <span className={classes.cardLabel}>WhatsApp</span>
                      </div>
                      <div className={classes.cardValueRow}>
                        <strong className={classes.cardValue}>
                          {data.whatsappDisplay || `+${whatsappNumber}`}
                        </strong>
                        <span className={classes.cardAction}>
                        <ArrowUpRight size={18} />
                      </span>
                      </div>
                    </div>
                  </a>

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

                  <div className={classes.card} role="group" aria-label={ui.schedule}>
                    <div className={classes.icon}>
                      <Clock size={20} />
                    </div>

                    <div className={classes.cardBody}>
                      <div className={classes.cardTop}>
                        <span className={classes.cardLabel}>{ui.schedule}</span>
                      </div>
                      <div className={classes.cardValueRow}>
                        <strong className={classes.cardValue}>{data.workTime}</strong>
                        <span className={classes.cardActionMuted} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.mapCard}>
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
                </div>
              </div>

              {/* RIGHT: form */}
              <div className={classes.right}>
                <div className={classes.formCard}>
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
                      />
                    </label>

                    <button type="submit" className={classes.submit} aria-label={ui.send}>
                      <Send size={18} />
                      {ui.send}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default Contact;
