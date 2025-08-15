import { useTranslation } from "react-i18next";
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language-select">{t("selectLanguage")}: </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          padding: "5px 10px",
          marginLeft: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
