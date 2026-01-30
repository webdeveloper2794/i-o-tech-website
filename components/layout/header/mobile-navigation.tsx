"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { SearchInput } from "./search-input";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface Service {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
  };
}

interface MobileNavigationProps {
  navLinks: NavLink[];
  services: Service[];
}

export function MobileNavigation({
  navLinks,
  services,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden w-full sticky top-0 z-50 backdrop-blur-sm bg-orange-950/90">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Al Safar and Partners Logo"
          className="flex items-center"
          onClick={closeMenu}
        >
          <Image
            src="/next.svg"
            alt="Al Safar and Partners Logo"
            width={80}
            height={80}
            className="grayscale-50 sepia-50"
          />
        </Link>

        {/* Right side: Language Switcher and Menu */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-orange-900/50 hover:text-orange-200"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-orange-950/98 backdrop-blur-md border-orange-800/50 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {/* Search Input */}
                <div className="mb-2">
                  <SearchInput />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      {link.hasDropdown ? (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem
                            value="services"
                            className="border-orange-800/50"
                          >
                            <AccordionTrigger className="text-white hover:text-orange-200 hover:no-underline py-3 px-4 rounded-lg hover:bg-orange-900/50">
                              {link.label}
                            </AccordionTrigger>
                            <AccordionContent className="pb-2">
                              <div className="flex flex-col gap-1 ml-4 border-l-2 border-orange-700/50 pl-4">
                                {services.map((service) => (
                                  <Link
                                    key={service.id}
                                    href={`/services/${service.attributes.slug}`}
                                    onClick={closeMenu}
                                    className="block py-2 px-3 rounded-lg text-white/90 hover:bg-orange-900/50 hover:text-white transition-colors"
                                  >
                                    <div className="font-medium text-sm">
                                      {service.attributes.title}
                                    </div>
                                    <div className="text-xs text-white/60 mt-0.5 line-clamp-1">
                                      {service.attributes.description}
                                    </div>
                                  </Link>
                                ))}
                                <Link
                                  href="/services"
                                  onClick={closeMenu}
                                  className="block py-2 px-3 mt-1 rounded-lg text-orange-300 hover:bg-orange-900/50 hover:text-orange-200 transition-colors font-medium text-sm"
                                >
                                  View All Services →
                                </Link>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="block text-white py-3 px-4 rounded-lg hover:bg-orange-900/50 hover:text-orange-200 transition-colors font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Book Appointment Button */}
                <div className="mt-4 pt-4 border-t border-orange-800/50">
                  <Button
                    asChild
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Link href="/contact" onClick={closeMenu}>
                      {t("bookAppointment")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
