// src/components/layout/search-input.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("search");

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<"services" | "team">("services");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/${locale}/search?q=${encodeURIComponent(query.trim())}&section=${section}`,
      );
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="p-2 hover:bg-gray-400 rounded-full transition-colors hover:cursor-pointer"
            aria-label={t("search")}
          >
            <Search className="h-4 w-4 text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-lg font-semibold">
              {t("search")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("searchDescription")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("placeholder")}
                className="pl-10 pr-10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
                  aria-label={t("clear")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={section === "services" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSection("services")}
              >
                {t("services")}
              </Button>
              <Button
                type="button"
                variant={section === "team" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSection("team")}
              >
                {t("team")}
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={!query.trim()} className="flex-1">
                {t("search")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
