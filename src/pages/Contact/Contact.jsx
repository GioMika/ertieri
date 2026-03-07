import React, { memo, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, MapPin, ArrowUpRight, Send, Clock } from "lucide-react";
import classes from "./Contact.module.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgdqgrn";

const normalizeLang = (lng) => (lng || "ru").split("-")[0].toLowerCase();

/* ── Contact row card ── */
const ContactCard = memo(function ContactCard({ icon: Icon, label, value, href, external, ariaLabel }) {
  return (
      <a
          className={classes.card}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel || label}
      >
        <div className={classes.icon}><Icon size={18} /></div>
        <div className={classes.cardBody}>
          <div className={classes.cardTop}>
            <span className={classes.cardLabel}>{label}</span>
          </div>
          <div className={classes.cardValueRow}>
            <strong className={classes.cardValue}>{value}</strong>
            <span className={classes.cardAction}><ArrowUpRight size={15} /></span>
          </div>
        </div>
      </a>
  );
});

/* ── Info row (no link) ── */
const InfoCard = memo(function InfoCard({ icon: Icon, label, value }) {
  return (
      <div className={classes.card} role="group" aria-label={label}>
        <div className={classes.icon}><Icon size={18} /></div>
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

/* ── Address card with external map link ── */
const AddressCard = memo(function AddressCard({ value, mapsUrl, ariaLabel, ui }) {
  return (
      <div className={classes.card} role="group" aria-label={ui.office}>
        <div className={classes.icon}><MapPin size={18} /></div>
        <div className={classes.cardBody}>
          <div className={classes.cardTop}>
            <span className={classes.cardLabel}>{ui.office}</span>
          </div>
          <div className={classes.cardValueRow}>
            <strong className={classes.cardValue}>{value}</strong>
            <a
                className={classes.cardActionLink}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.route}
            >
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
  );
});

/* ── Validation ── */
const VALIDATION_MSGS = {
  ru: { name: "Введите имя", email: "Введите email", emailInvalid: "Неверный формат email", message: "Напишите сообщение" },
  en: { name: "Enter your name", email: "Enter your email", emailInvalid: "Invalid email format", message: "Write a message" },
  ge: { name: "შეიყვანეთ სახელი", email: "შეიყვანეთ ელ-ფოსტა", emailInvalid: "არასწორი ელ-ფოსტა", message: "დაწერეთ შეტყობინება" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = (formData, lang) => {
  const m = VALIDATION_MSGS[lang] || VALIDATION_MSGS.ru;
  const errors = {};
  if (!formData.name.trim())    errors.name    = m.name;
  if (!formData.email.trim())   errors.email   = m.email;
  else if (!EMAIL_RE.test(formData.email.trim())) errors.email = m.emailInvalid;
  if (!formData.message.trim()) errors.message = m.message;
  return errors;
};

/* ════════════════════════════
   MAIN COMPONENT
   ════════════════════════════ */
const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const lang = normalizeLang(i18n.resolvedLanguage || i18n.language);

  const whatsappNumber = "995XXXXXXXXX";
  const emailAddress   = "hello@ertieri.ge";

  const ui   = useMemo(() => t("ui",   { returnObjects: true }) || {}, [t]);
  const data = useMemo(() => t("data", { returnObjects: true }) || {}, [t]);

  const pageTitle    = t("pageTitle");
  const pageSubtitle = t("pageSubtitle");

  const googleMapsUrl = useMemo(() => {
    const dest = data.mapDestination || data.address || "Batumi, Bako St. 8";
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
  }, [data.mapDestination, data.address]);

  const embedMapSrc = data.embedMapSrc || "";

  /* ── Form state ── */
  const [formData, setFormData]       = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus]           = useState({ sent: false, ok: false, error: "" });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    /* clear error on typing */
    if (fieldErrors[name]) setFieldErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }, [fieldErrors]);

  const onBlur = useCallback((e) => {
    const { name, value } = e.target;
    const m = VALIDATION_MSGS[lang] || VALIDATION_MSGS.ru;
    if (!value.trim()) {
      const msg = { name: m.name, email: m.email, message: m.message }[name];
      if (msg) setFieldErrors((p) => ({ ...p, [name]: msg }));
    } else if (name === "email" && !EMAIL_RE.test(value.trim())) {
      setFieldErrors((p) => ({ ...p, email: m.emailInvalid }));
    }
  }, [lang]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validateForm(formData, lang);
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    if (isSubmitting) return;

    setSubmitting(true);
    setStatus({ sent: false, ok: false, error: "" });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `ErtiEri — заявка (${lang.toUpperCase()})`,
          language: lang,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.errors?.[0]?.message || json?.error || ui.error || "Error");

      setStatus({ sent: true, ok: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setFieldErrors({});
    } catch (err) {
      setStatus({ sent: true, ok: false, error: err?.message || ui.error || "Error" });
    } finally {
      setSubmitting(false);
    }
  }, [isSubmitting, formData, lang, ui.error]);

  return (
      <section className={classes.contact}>
        <div className={classes.bg} />

        <div className={classes.container}>

          {/* ── Header ── */}
          <header className={classes.header}>
            <h1 className={classes.title}>
              {pageTitle?.split(" ").slice(0, -1).join(" ")}{" "}
              <span className={classes.titleItalic}>
              {pageTitle?.split(" ").slice(-1)[0]}
            </span>
            </h1>
            {pageSubtitle && <p className={classes.subtitle}>{pageSubtitle}</p>}
          </header>

          {/* ── Grid ── */}
          <div className={classes.grid}>

            {/* LEFT */}
            <div className={classes.left}>

              {/* Contact cards */}
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
                <AddressCard
                    value={data.address}
                    mapsUrl={googleMapsUrl}
                    ui={ui}
                />
                <InfoCard
                    icon={Clock}
                    label={ui.schedule}
                    value={data.workTime}
                />
              </div>

              {/* Map */}
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
                    {ui.route} <ArrowUpRight size={14} />
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

            {/* RIGHT — Form */}
            <div className={classes.right}>
              <article className={classes.formCard}>
                <div className={classes.formHeader}>
                  <h2 className={classes.formTitle}>{ui.messageTitle}</h2>
                  {ui.hint && <p className={classes.formHint}>{ui.hint}</p>}
                </div>

                <form className={classes.form} onSubmit={onSubmit} noValidate>
                  {/* honeypot */}
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
                          className={`${classes.input} ${fieldErrors.name ? classes.inputErr : ""}`}
                          type="text"
                          name="name"
                          placeholder={ui.namePh}
                          value={formData.name}
                          onChange={onChange}
                          onBlur={onBlur}
                          autoComplete="name"
                          disabled={isSubmitting}
                      />
                      {fieldErrors.name && <span className={classes.fieldErr}>{fieldErrors.name}</span>}
                    </label>

                    <label className={classes.field}>
                      <span className={classes.label}>{ui.email}</span>
                      <input
                          className={`${classes.input} ${fieldErrors.email ? classes.inputErr : ""}`}
                          type="email"
                          name="email"
                          placeholder={ui.emailPh}
                          value={formData.email}
                          onChange={onChange}
                          onBlur={onBlur}
                          autoComplete="email"
                          disabled={isSubmitting}
                      />
                      {fieldErrors.email && <span className={classes.fieldErr}>{fieldErrors.email}</span>}
                    </label>
                  </div>

                  <label className={classes.field}>
                    <span className={classes.label}>{ui.message}</span>
                    <textarea
                        className={`${classes.textarea} ${fieldErrors.message ? classes.inputErr : ""}`}
                        name="message"
                        placeholder={ui.messagePh}
                        value={formData.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        rows={6}
                        disabled={isSubmitting}
                    />
                    {fieldErrors.message && <span className={classes.fieldErr}>{fieldErrors.message}</span>}
                  </label>

                  <button
                      type="submit"
                      className={classes.submit}
                      aria-label={ui.send}
                      disabled={isSubmitting}
                  >
                    <Send size={15} />
                    {isSubmitting ? (ui.sending || "Отправка...") : ui.send}
                  </button>

                  {status.sent && (
                      <div className={classes.formStatus} role="status" aria-live="polite">
                        {status.ok ? ui.success || "✓ Отправлено" : status.error || ui.error || "Ошибка"}
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