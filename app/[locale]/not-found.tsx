import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="absolute top-0 z-20 w-full h-screen overflow-hidden ">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">{t("status")}</h1>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-lg">{t("description")}</p>
        <Link href="/" className="text-blue-500 underline">
          {t("link")}
        </Link>
      </div>
    </div>
  );
}
