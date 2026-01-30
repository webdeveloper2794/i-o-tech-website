"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("error");

  return (
    <main>
      <h1>{t("title")}</h1>
      <div>
        <p className="mt-4">{t("description")}</p>,
        <button
          className="text-white underline underline-offset-2"
          onClick={reset}
          type="button"
        >
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
