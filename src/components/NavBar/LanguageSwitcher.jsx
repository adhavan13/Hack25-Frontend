import { useTranslation } from "react-i18next";
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "ml", name: "മലയാളം" },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="language-switcher" style={{ position: "relative", display: "inline-block" }}>
      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          padding: "8px 36px 8px 14px",
          marginLeft: "10px",
          border: "1.5px solid #bdbdbd",
          borderRadius: "6px",
          background: "#f8f9fa",
          color: "#333",
          fontSize: "1rem",
          outline: "none",
          cursor: "pointer",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          transition: "border 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => (e.target.style.border = "1.5px solid #1976d2")}
        onBlur={(e) => (e.target.style.border = "1.5px solid #bdbdbd")}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <span
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: "18px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "1rem",
          color: "#888",
        }}
      >
        ▼
      </span>
    </div>
  );
};

export default LanguageSwitcher;
