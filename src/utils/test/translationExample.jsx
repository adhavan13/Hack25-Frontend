import React from "react";
import { useTranslation } from "react-i18next";

// Example 1: Basic usage in functional component
const BasicExample = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("hello")}</p>
    </div>
  );
};

// Example 2: Using nested translation keys
const NavigationExample = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <a href="/">{t("navigation.home")}</a>
      <a href="/about">{t("navigation.about")}</a>
      <a href="/contact">{t("navigation.contact")}</a>
    </nav>
  );
};

// Example 3: Translation with interpolation (variables)
const InterpolationExample = ({ userName }) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Add this to your translation files: */}
      {/* "welcomeUser": "Welcome back, {{name}}!" */}
      <h2>{t("welcomeUser", { name: userName })}</h2>
    </div>
  );
};

// Example 4: Pluralization (add to translation files)
const PluralizationExample = ({ itemCount }) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Add this to your translation files: */}
      {/* 
      "items": {
        "zero": "No items",
        "one": "{{count}} item",
        "other": "{{count}} items"
      }
      */}
      <p>{t("items", { count: itemCount })}</p>
    </div>
  );
};

// Example 5: Conditional translations
const ConditionalExample = ({ isLoggedIn }) => {
  const { t } = useTranslation();

  return (
    <div>
      <button>{isLoggedIn ? t("buttons.logout") : t("buttons.login")}</button>
    </div>
  );
};

// Example 6: Using translation in attributes
const AttributeExample = () => {
  const { t } = useTranslation();

  return (
    <div>
      <input
        type="text"
        placeholder={t("common.name")}
        aria-label={t("common.name")}
      />
    </div>
  );
};

// Example 7: Programmatically changing language
const LanguageChanger = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("hi")}>हिंदी</button>
      <button onClick={() => handleLanguageChange("ml")}>മലയാളം</button>
    </div>
  );
};

// Example 8: Using with loading state
const LoadingExample = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div>
      <h1>{t("welcome")}</h1>
    </div>
  );
};

export {
  BasicExample,
  NavigationExample,
  InterpolationExample,
  PluralizationExample,
  ConditionalExample,
  AttributeExample,
  LanguageChanger,
  LoadingExample,
};
