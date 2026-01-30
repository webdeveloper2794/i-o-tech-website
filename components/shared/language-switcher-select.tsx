"use client";

import clsx from "clsx";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export function LanguageSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        "relative text-white flex items-center  focus-visible:border-none focus-within:border-none focus:ring-0 text-sm",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className={clsx(
          "inline-flex appearance-none text-sm",
          "bg-transparent",
          "text-white text-sm font-medium sm:text-base",
          "focus-visible:outline-none focus-visible:ring-0",
          "hover:cursor-pointer",
        )}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      >
        {children}
      </select>
      <span className=" text-white">
        <ChevronDown className="h-4 w-4 text-white" />
      </span>
    </label>
  );
}
