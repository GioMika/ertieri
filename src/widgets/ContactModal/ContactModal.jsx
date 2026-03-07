import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import classes from "./ContactModal.module.css";

const FORMSPREE = "https://formspree.io/f/mlgdqgrn";

const I18N = {
  ru: {
    brand:        "INVESTOUR",
    labelName:    "Имя",
    labelLast:    "Фамилия",
    labelMsg:     "Сообщение",
    phName:       "Александр",
    phLast:       "Иванов",
    phMsg:        "Расскажите что вас интересует — объект, бюджет, сроки...",
    send:         "Отправить",
    sending:      "Отправка...",
    sent:         "Отправлено",
    successText:  "Мы получили вашу заявку и свяжемся в ближайшее время",
    error:        "Ошибка отправки. Попробуйте ещё раз.",
    errName:      "Введите имя",
    errLast:      "Введите фамилию",
    errMsg:       "Напишите сообщение",
  },
  en: {
    brand:        "INVESTOUR",
    labelName:    "First name",
    labelLast:    "Last name",
    labelMsg:     "Message",
    phName:       "Alexander",
    phLast:       "Smith",
    phMsg:        "Tell us what interests you — property, budget, timeline...",
    send:         "Send",
    sending:      "Sending...",
    sent:         "Sent",
    successText:  "We received your request and will get back to you shortly",
    error:        "Sending failed. Please try again.",
    errName:      "Enter your first name",
    errLast:      "Enter your last name",
    errMsg:       "Write a message",
  },
  ge: {
    brand:        "INVESTOUR",
    labelName:    "სახელი",
    labelLast:    "გვარი",
    labelMsg:     "შეტყობინება",
    phName:       "ალექსანდრე",
    phLast:       "ივანოვი",
    phMsg:        "მოგვიყევით რა გაინტერესებთ — ობიექტი, ბიუჯეტი, ვადები...",
    send:         "გაგზავნა",
    sending:      "იგზავნება...",
    sent:         "გაიგზავნა",
    successText:  "მივიღეთ თქვენი განაცხადი და მალე დაგიკავშირდებით",
    error:        "შეცდომა. სცადეთ თავიდან.",
    errName:      "შეიყვანეთ სახელი",
    errLast:      "შეიყვანეთ გვარი",
    errMsg:       "დაწერეთ შეტყობინება",
  },
};

const normalize = (lng) => (lng || "ru").split("-")[0].toLowerCase();

const bV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.20 } },
  exit:    { opacity: 0, transition: { duration: 0.28 } },
};
const mV = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", damping: 28, stiffness: 300, delay: 0.04 } },
  exit:    { opacity: 0, y: 12, scale: 0.98,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } },
};
const successV = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 260 } },
};

const validate = (form, tr) => {
  const errors = {};
  if (!form.name.trim())    errors.name    = tr.errName;
  if (!form.lastName.trim()) errors.lastName = tr.errLast;
  if (!form.message.trim()) errors.message  = tr.errMsg;
  return errors;
};

const ContactModal = ({ isOpen, onClose, title, subtitle, subject }) => {
  const { i18n } = useTranslation();
  const lang = normalize(i18n.resolvedLanguage || i18n.language);
  const tr = useMemo(() => I18N[lang] || I18N.ru, [lang]);

  const [form,   setForm]   = useState({ name: "", lastName: "", message: "" });
  const [errors, setErrors] = useState({});
  const [busy,   setBusy]   = useState(false);
  const [done,   setDone]   = useState(false);
  const [apiErr, setApiErr] = useState("");
  const ref = useRef(null);

  /* reset on open */
  useEffect(() => {
    if (!isOpen) return;
    setForm({ name: "", lastName: "", message: "" });
    setErrors({});
    setBusy(false);
    setDone(false);
    setApiErr("");
    setTimeout(() => ref.current?.focus(), 90);
  }, [isOpen]);

  /* auto-close after success */
  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => onClose(), 2200);
    return () => clearTimeout(id);
  }, [done, onClose]);

  /* scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const ov = document.body.style.overflow;
    const pr = document.body.style.paddingRight;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = sw + "px";
    return () => {
      document.body.style.overflow = ov;
      document.body.style.paddingRight = pr;
    };
  }, [isOpen]);

  /* escape */
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => { if (e.key === "Escape" && !busy) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, busy, onClose]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    /* clear error for this field as user types */
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }, [errors]);

  const onBlur = useCallback((e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      const fieldErr = { name: tr.errName, lastName: tr.errLast, message: tr.errMsg }[name];
      if (fieldErr) setErrors((p) => ({ ...p, [name]: fieldErr }));
    }
  }, [tr]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate(form, tr);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (busy) return;
    setBusy(true);
    setApiErr("");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:     (form.name + " " + form.lastName).trim(),
          message:  form.message,
          _subject: subject || "Заявка — INVESTOUR",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.errors?.[0]?.message || json?.error || tr.error);
      setDone(true);
    } catch (err) {
      setApiErr(err?.message || tr.error);
    } finally {
      setBusy(false);
    }
  }, [busy, form, tr, subject]);

  return (
      <AnimatePresence>
        {isOpen && (
            <>
              <motion.div
                  className={classes.backdrop}
                  variants={bV} initial="hidden" animate="visible" exit="exit"
                  onClick={() => !busy && onClose()}
                  aria-hidden="true"
              />

              <div
                  className={classes.wrapper}
                  role="dialog" aria-modal="true"
                  onClick={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}
              >
                <motion.div
                    className={classes.modal}
                    variants={mV} initial="hidden" animate="visible" exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                  <button
                      className={classes.close}
                      onClick={onClose}
                      disabled={busy}
                      type="button"
                      aria-label="Close"
                  >
                    <X size={14} />
                  </button>

                  <AnimatePresence mode="wait">
                    {done ? (
                        <motion.div
                            className={classes.success}
                            variants={successV} initial="hidden" animate="visible"
                            key="success"
                        >
                          <div className={classes.successIcon}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                              <motion.path
                                  d="M4 11.5L9 16.5L18 6"
                                  stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.45, delay: 0.1 }}
                              />
                            </svg>
                          </div>
                          <p className={classes.successTitle}>{tr.sent}</p>
                          <p className={classes.successText}>{tr.successText}</p>
                        </motion.div>
                    ) : (
                        <motion.div key="form" exit={{ opacity: 0, transition: { duration: 0.16 } }}>

                          <div className={classes.head}>
                            <span className={classes.brand}>{tr.brand}</span>
                            <h2 className={classes.title}>
                              {title
                                  ? <>{title.split(" ").slice(0,-1).join(" ")}{" "}<em>{title.split(" ").slice(-1)[0]}</em></>
                                  : lang === "en" ? <>Get in <em>touch</em></>
                                      : lang === "ge" ? <>დაგვიკავშირდით</>
                                          : <>Свяжитесь <em>с нами</em></>
                              }
                            </h2>
                            {subtitle && <p className={classes.sub}>{subtitle}</p>}
                          </div>

                          <div className={classes.line} />

                          <form className={classes.form} onSubmit={onSubmit} noValidate>
                            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off"
                                   style={{ position:"absolute", left:"-9999px", height:0, width:0 }} />

                            <div className={classes.row}>
                              <label className={classes.field}>
                                <span className={classes.label}>{tr.labelName}</span>
                                <input
                                    ref={ref}
                                    className={`${classes.input} ${errors.name ? classes.inputErr : ""}`}
                                    type="text" name="name"
                                    placeholder={tr.phName}
                                    value={form.name}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    autoComplete="given-name"
                                    disabled={busy}
                                />
                                <AnimatePresence>
                                  {errors.name && (
                                      <motion.span
                                          className={classes.fieldErr}
                                          initial={{ opacity: 0, y: -4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -4 }}
                                          transition={{ duration: 0.16 }}
                                      >
                                        {errors.name}
                                      </motion.span>
                                  )}
                                </AnimatePresence>
                              </label>

                              <label className={classes.field}>
                                <span className={classes.label}>{tr.labelLast}</span>
                                <input
                                    className={`${classes.input} ${errors.lastName ? classes.inputErr : ""}`}
                                    type="text" name="lastName"
                                    placeholder={tr.phLast}
                                    value={form.lastName}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    autoComplete="family-name"
                                    disabled={busy}
                                />
                                <AnimatePresence>
                                  {errors.lastName && (
                                      <motion.span
                                          className={classes.fieldErr}
                                          initial={{ opacity: 0, y: -4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -4 }}
                                          transition={{ duration: 0.16 }}
                                      >
                                        {errors.lastName}
                                      </motion.span>
                                  )}
                                </AnimatePresence>
                              </label>
                            </div>

                            <label className={classes.field}>
                              <span className={classes.label}>{tr.labelMsg}</span>
                              <textarea
                                  className={`${classes.textarea} ${errors.message ? classes.inputErr : ""}`}
                                  name="message"
                                  placeholder={tr.phMsg}
                                  value={form.message}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  rows={4}
                                  disabled={busy}
                              />
                              <AnimatePresence>
                                {errors.message && (
                                    <motion.span
                                        className={classes.fieldErr}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.16 }}
                                    >
                                      {errors.message}
                                    </motion.span>
                                )}
                              </AnimatePresence>
                            </label>

                            {apiErr && (
                                <p className={classes.apiErr} role="alert">{apiErr}</p>
                            )}

                            <button type="submit" className={classes.submit} disabled={busy}>
                              {busy
                                  ? <><span className={classes.spinner} />{tr.sending}</>
                                  : <><Send size={14} />{tr.send}</>
                              }
                            </button>
                          </form>

                        </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </>
        )}
      </AnimatePresence>
  );
};

export default ContactModal;