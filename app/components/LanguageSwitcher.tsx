"use client";

import {useLocale} from "next-intl";
import {useRouter, usePathname} from "@/lib/navigation";
import {useTransition} from "react";

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: "en" | "pl") => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace({pathname}, {locale: newLocale});
    });
  };

  return (
    <div className="flex gap-3 font-semibold">
      <button
        onClick={() => handleLanguageChange("pl")}
        className={`${locale === "pl" ? "text-white" : "text-slate-400"} hover:text-white transition-colors`}
        disabled={isPending || locale === "pl"}
      >
        PL
      </button>
      <span className="text-slate-500">|</span>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`${locale === "en" ? "text-white" : "text-slate-400"} hover:text-white transition-colors`}
        disabled={isPending || locale === "en"}
      >
        EN
      </button>
    </div>
  );
};
