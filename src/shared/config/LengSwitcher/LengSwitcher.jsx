import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from "./LengSwitcher.module.css";

const DEFAULT_LANGS = [
  { code: "ge", label: "GE", title: "ქართული" },
  { code: "ru", label: "RU", title: "Русский" },
  { code: "en", label: "EN", title: "English" },
];

const normalize = (lng) => (lng || "ru").split("-")[0].toLowerCase();

const LengSwitcher = ({
                        langs = DEFAULT_LANGS,

                        // ✅ чтобы дизайн был как в Header — передаём классы из Header.module.css
                        wrapperClassName = "",
                        buttonClassName = "",
                        activeButtonClassName = "",

                        ariaLabel = "Language",
                      }) => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(() =>
      normalize(i18n.resolvedLanguage || i18n.language)
  );

  useEffect(() => {
    const handler = (lng) => setLang(normalize(lng));
    i18n.on("languageChanged", handler);
    setLang(normalize(i18n.resolvedLanguage || i18n.language));
    return () => i18n.off("languageChanged", handler);
  }, [i18n]);

  const change = async (code) => {
    const next = normalize(code);
    if (next === lang) return;

    try {
      await i18n.changeLanguage(next);
      // setLang сработает через languageChanged
    } catch (e) {
      // no-op
    }
  };

  return (
      <div
          className={`${cls.switcher} ${wrapperClassName}`.trim()}
          role="group"
          aria-label={ariaLabel}
      >
        {langs.map(({ code, label, title }) => {
          const active = lang === normalize(code);

          return (
              <button
                  key={code}
                  type="button"
                  className={`${cls.item} ${buttonClassName} ${
                      active ? `${cls.active} ${activeButtonClassName}` : ""
                  }`.trim()}
                  data-active={active ? "true" : "false"}
                  onClick={() => change(code)}
                  aria-pressed={active}
                  aria-label={title}
                  title={title}
              >
                {label}
              </button>
          );
        })}
      </div>
  );
};

export default LengSwitcher;
