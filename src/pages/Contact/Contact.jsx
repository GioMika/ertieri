import React, { memo, useEffect, useMemo, useState } from "react";
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
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgdqgrn";

const normalizeLang = (lng) => (lng || "ru").split("-")[0].toLowerCase();
const langToPath = (lng) => (lng === "ge" ? "ge" : lng === "en" ? "en" : "ru");
const langToHtml = (lng) => (lng === "ge" ? "ka" : lng === "en" ? "en" : "ru");

function upsertMetaByName(name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel, href, extraAttrs = {}) {
  if (!href) return;
  const selectorParts = [`link[rel="${rel}"]`];
  if (extraAttrs.hrefLang) selectorParts.push(`[hreflang="${extraAttrs.hrefLang}"]`);
  let link = document.head.querySelector(selectorParts.join(""));
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    if (extraAttrs.hrefLang) link.setAttribute("hreflang", extraAttrs.hrefLang);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function upsertJsonLd(id, json) {
  const scriptId = `ld-${id}`;
  let script = document.head.querySelector(`script#${scriptId}`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(json);
}

const ContactCard = memo(function ContactCard({
                                                icon: Icon,
                                                label,
                                                value,
                                                href,
                                                external,
                                                ariaLabel,
                                              }) {
  return (
      <a
          className={classes.card}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel || label}
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
  );
});

const InfoCard = memo(function InfoCard({ icon: Icon, label, value }) {
  return (
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
  );
});

const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);
  const pathLang = langToPath(lang);
  const htmlLang = langToHtml(lang);

  // контакты (замени на реальные)
  const whatsappNumber = "995XXXXXXXXX";
  const emailAddress = "hello@ertieri.ge";

  // тексты из переводов
  const meta = useMemo(() => t("meta", { returnObjects: true }) || {}, [t]);
  const ui = useMemo(() => t("ui", { returnObjects: true }) || {}, [t]);
  const data = useMemo(() => t("data", { returnObjects: true }) || {}, [t]);

  const pageTitle = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const pageUrl = useMemo(
      () => `${SITE_URL}/${pathLang}/contact`,
      [pathLang]
  );

  const alternates = useMemo(
      () => ({
        ru: `${SITE_URL}/ru/contact`,
        en: `${SITE_URL}/en/contact`,
        ka: `${SITE_URL}/ge/contact`,
        xDefault: `${SITE_URL}/en/contact`,
      }),
      []
  );

  const ogImage = `${SITE_URL}/og-contact.jpg`;
  const ogLocale = lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "ka_GE";

  const googleMapsUrl = useMemo(() => {
    const dest =
        data.mapDestination ||
        data.address ||
        (lang === "ru" ? "Батуми, ул. Бако 8" : "Batumi, Bako St. 8");
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        dest
    )}`;
  }, [data.mapDestination, data.address, lang]);

  const embedMapSrc = data.embedMapSrc || ""; // лучше положи в contact.json

  // JSON-LD
  const jsonLd = useMemo(
      () => ({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: meta.title || pageTitle,
        description: meta.description || pageSubtitle,
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
        pageTitle,
        pageSubtitle,
        pageUrl,
        lang,
        data.streetAddress,
        data.city,
        data.openingHours,
        emailAddress,
        whatsappNumber,
      ]
  );

  // ✅ SEO в head (без Helmet)
  useEffect(() => {
    document.documentElement.setAttribute("lang", htmlLang);

    // title
    document.title = meta.title || pageTitle || "Erti Eri";

    // basic meta
    upsertMetaByName("description", meta.description || "");
    upsertMetaByName("keywords", meta.keywords || "");
    upsertMetaByName("robots", "index, follow");

    // canonical + hreflang
    upsertLink("canonical", pageUrl);
    upsertLink("alternate", alternates.ru, { hrefLang: "ru" });
    upsertLink("alternate", alternates.en, { hrefLang: "en" });
    upsertLink("alternate", alternates.ka, { hrefLang: "ka" });
    upsertLink("alternate", alternates.xDefault, { hrefLang: "x-default" });

    // Open Graph
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:title", meta.ogTitle || meta.title || "");
    upsertMetaByProperty("og:description", meta.ogDescription || meta.description || "");
    upsertMetaByProperty("og:url", pageUrl);
    upsertMetaByProperty("og:image", ogImage);
    upsertMetaByProperty("og:site_name", "Erti Eri");
    upsertMetaByProperty("og:locale", ogLocale);

    // Twitter
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", meta.ogTitle || meta.title || "");
    upsertMetaByName("twitter:description", meta.ogDescription || meta.description || "");
    upsertMetaByName("twitter:image", ogImage);

    // JSON-LD
    upsertJsonLd("contact", jsonLd);
  }, [meta, pageTitle, pageUrl, alternates, ogImage, ogLocale, jsonLd, htmlLang]);

  // ======= form =======
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ sent: false, ok: false, error: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ sent: false, ok: false, error: "" });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,

        _subject: `ErtiEri — новая заявка (${lang.toUpperCase()})`,
        language: lang,
        page: pageUrl,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const dataRes = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
            dataRes?.errors?.[0]?.message ||
            dataRes?.error ||
            ui.error ||
            "Ошибка отправки";
        throw new Error(msg);
      }

      setStatus({ sent: true, ok: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        sent: true,
        ok: false,
        error: err?.message || ui.error || "Ошибка отправки",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section className={classes.contact}>
        <div className={classes.bg} />

        <div className={classes.container}>
          {/* HEADER */}
          <header className={classes.header}>
            <h1 className={classes.title}>{pageTitle}</h1>
            {pageSubtitle ? <p className={classes.subtitle}>{pageSubtitle}</p> : null}
          </header>

          <div className={classes.grid}>
            {/* LEFT */}
            <div className={classes.left}>
              <div className={classes.cards}>
                <ContactCard
                    icon={Mail}
                    label={ui.emailLabel || "Email"}
                    value={emailAddress}
                    href={`mailto:${emailAddress}`}
                    ariaLabel={ui.ctaEmail}
                />

                <ContactCard
                    icon={MessageCircle}
                    label={ui.whatsappLabel || "WhatsApp"}
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

                <InfoCard icon={Clock} label={ui.schedule} value={data.workTime} />
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
                  {embedMapSrc ? (
                      <iframe
                          src={embedMapSrc}
                          className={classes.map}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={ui.mapIframeTitle || "Map"}
                      />
                  ) : (
                      <div className={classes.mapFallback}>
                        {ui.mapFallback || "Добавьте embedMapSrc в contact.json"}
                      </div>
                  )}
                </div>
              </article>
            </div>

            {/* RIGHT */}
            <div className={classes.right}>
              <article className={classes.formCard}>
                <div className={classes.formHeader}>
                  <h2 className={classes.formTitle}>{ui.messageTitle}</h2>
                  {ui.hint ? <p className={classes.formHint}>{ui.hint}</p> : null}
                </div>

                <form className={classes.form} onSubmit={onSubmit}>
                  {/* anti-spam honeypot */}
                  <input
                      type="text"
                      name="_gotcha"
                      tabIndex="-1"
                      autoComplete="off"
                      style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
                  />

                  <div className={classes.row}>
                    <label className={classes.field}>
                      <span className={classes.label}>{ui.name}</span>
                      <input
                          className={classes.input}
                          type="text"
                          name="name"
                          placeholder={ui.namePh}
                          value={formData.name}
                          onChange={onChange}
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
                          onChange={onChange}
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
                        onChange={onChange}
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

                  {status.sent && (
                      <div
                          className={classes.formStatus}
                          role="status"
                          aria-live="polite"
                          style={{ marginTop: 12, fontSize: 14 }}
                      >
                        {status.ok
                            ? ui.success || "Сообщение отправлено ✅"
                            : status.error || ui.error || "Ошибка отправки ❌"}
                      </div>
                  )}
                </form>
              </article>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;
