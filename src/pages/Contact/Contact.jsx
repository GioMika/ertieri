import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Send,
  Clock,
} from "lucide-react";
import classes from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
      setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const whatsappNumber = "995XXXXXXXXX";
  const emailAddress = "hello@ertieri.com";
  const address = "Батуми, ул. Бако 8";
  const workTime = "Ежедневно 10:00–20:00";
  const googleMapsUrl =
      "https://www.google.com/maps/dir/?api=1&destination=Батуми,+ул.+Бако+8";

  return (
      <section className={classes.contact}>
        <div className={classes.bg} />

        <div className={classes.container}>
          {/* HEADER */}
          <header className={classes.header}>
            <span className={classes.kicker}>Контакты</span>
            <h1 className={classes.title}>Свяжитесь с нами</h1>
          </header>

          <div className={classes.grid}>
            {/* LEFT: cards + map */}
            <div className={classes.left}>
              <div className={classes.cards}>
                <a
                    className={classes.card}
                    href={`mailto:${emailAddress}`}
                    aria-label="Написать на email"
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
                    aria-label="Открыть WhatsApp"
                >
                  <div className={classes.icon}>
                    <MessageCircle size={20} />
                  </div>

                  <div className={classes.cardBody}>
                    <div className={classes.cardTop}>
                      <span className={classes.cardLabel}>WhatsApp</span>
                    </div>
                    <div className={classes.cardValueRow}>
                      <strong className={classes.cardValue}>+995 XXX XXX XXX</strong>
                      <span className={classes.cardAction}>
                      <ArrowUpRight size={18} />
                    </span>
                    </div>
                  </div>
                </a>

                <div className={classes.card} role="group" aria-label="Адрес офиса">
                  <div className={classes.icon}>
                    <MapPin size={20} />
                  </div>

                  <div className={classes.cardBody}>
                    <div className={classes.cardTop}>
                      <span className={classes.cardLabel}>Офис</span>
                    </div>
                    <div className={classes.cardValueRow}>
                      <strong className={classes.cardValue}>{address}</strong>
                      <a
                          className={classes.cardActionLink}
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Построить маршрут"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className={classes.card} role="group" aria-label="Время работы">
                  <div className={classes.icon}>
                    <Clock size={20} />
                  </div>

                  <div className={classes.cardBody}>
                    <div className={classes.cardTop}>
                      <span className={classes.cardLabel}>График</span>
                    </div>
                    <div className={classes.cardValueRow}>
                      <strong className={classes.cardValue}>{workTime}</strong>
                      <span className={classes.cardActionMuted} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.mapCard}>
                <div className={classes.mapHeader}>
                  <div>
                    <h2 className={classes.mapTitle}>Мы на карте</h2>
                    <p className={classes.mapSubtitle}>Батуми</p>
                  </div>

                  <a
                      className={classes.mapBtn}
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Маршрут <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className={classes.mapWrap}>
                  <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.5!2d41.6433!3d41.6415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM4JzI5LjQiTiA0McKwMzgnMzUuOSJF!5e0!3m2!1sru!2sge!4v1234567890"
                      className={classes.map}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Наш офис на карте"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className={classes.right}>
              <div className={classes.formCard}>
                <div className={classes.formHeader}>
                  <h2 className={classes.formTitle}>Сообщение</h2>
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.row}>
                    <label className={classes.field}>
                      <span className={classes.label}>Имя</span>
                      <input
                          className={classes.input}
                          type="text"
                          name="name"
                          placeholder="Ваше имя"
                          value={formData.name}
                          onChange={handleChange}
                          required
                      />
                    </label>

                    <label className={classes.field}>
                      <span className={classes.label}>Email</span>
                      <input
                          className={classes.input}
                          type="email"
                          name="email"
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                      />
                    </label>
                  </div>

                  <label className={classes.field}>
                    <span className={classes.label}>Сообщение</span>
                    <textarea
                        className={classes.textarea}
                        name="message"
                        placeholder="Описание"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                    />
                  </label>

                  <button type="submit" className={classes.submit}>
                    <Send size={18} />
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;
