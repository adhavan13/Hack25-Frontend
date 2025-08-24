import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  ];

  // Get current and next language
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];
  const nextLang = languages.find((l) => l.code !== currentLang.code);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div
      className="language-switcher"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "inherit",
      }}
    >
      {/* Globe icon button */}
      <button
        aria-label="Switch language"
        onClick={() => changeLanguage(nextLang.code)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          borderRadius: "50%",
          transition: "background 0.2s",
          outline: "none",
          fontSize: "1.5rem",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#e3eafc")}
        onMouseOut={(e) => (e.currentTarget.style.background = "none")}
      >
        {/* Exact Unicode Globe Icon */}
        <span role="img" aria-label="globe" style={{ color: "#1976d2" }}>🌐</span>
      </button>
      {/* Show current language */}
      <span style={{ fontWeight: 500, fontSize: "1rem", color: "#222" }}>
        {currentLang.nativeName}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
      
