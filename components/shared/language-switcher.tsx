import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { LanguageSwitcherSelect } from "./language-switcher-select";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();

  return (
    <LanguageSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} className="px-4">
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LanguageSwitcherSelect>
  );
}
