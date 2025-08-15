import { useTranslation } from "react-i18next";
import "../../i18n/config"; // Import i18n configuration
import LanguageSwitcher from "../../components/languageSwitcher";

// Main App Component
function Main() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        <h1>{t("welcome")}</h1>
        <LanguageSwitcher />
      </header>

      <main>
        <section style={{ marginBottom: "30px" }}>
          <h2>
            {t("navigation.home")} <b>{t("hello")}</b>
          </h2>{" "}
          <p>
            {t("hello")}! {t("messages.success")}
          </p>
        </section>

        <nav style={{ marginBottom: "30px" }}>
          <h3>{t("navigation.about")}</h3>
          <ul>
            <li>{t("navigation.home")}</li>
            <li>{t("navigation.about")}</li>
            <li>{t("navigation.services")}</li>
            <li>{t("navigation.contact")}</li>
          </ul>
        </nav>

        <section style={{ marginBottom: "30px" }}>
          <h3>
            {t("buttons.submit")} {t("common.name")}
          </h3>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label>{t("common.name")}: </label>
              <input type="text" placeholder={t("common.name")} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>{t("common.email")}: </label>
              <input type="email" placeholder={t("common.email")} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <button type="button">{t("buttons.submit")}</button>
              <button type="button" style={{ marginLeft: "10px" }}>
                {t("buttons.cancel")}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Main;
