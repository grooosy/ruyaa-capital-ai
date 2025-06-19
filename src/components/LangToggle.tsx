import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export default function LangToggle() {
  const { i18n } = useTranslation();

  const switchLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("ruyaa-lang", newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-transparent hover:text-gold transition-colors font-semibold p-0"
      onClick={switchLang}
    >
      {i18n.language === "ar" ? "EN" : "ع"}
    </Button>
  );
}
