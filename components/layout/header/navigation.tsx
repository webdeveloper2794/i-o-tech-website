import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { Link } from "@/i18n/navigation";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigation } from "./mobile-navigation";
import { getServices } from "@/lib/api/strapi-client";
import { use } from "react";

export async function Navigation({ locale }: { locale: string }) {
  console.log("Navigation locale:", locale);
  const t = await getTranslations("nav");

  const servicesData = await getServices(locale);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("aboutUs") },
    {
      href: "/services",
      label: t("services"),
      hasDropdown: true,
    },
    { href: "/team", label: t("ourTeam") },
    { href: "/blogs", label: t("blogs") },
    { href: "/contact", label: t("contactUs") },
  ];

  // Mock services data
  const mockServices = [
    {
      id: 1,
      attributes: {
        title: "Legal Consultation",
        slug: "legal-consultation",
        description:
          "Expert legal advice for your business and personal matters",
      },
    },
    {
      id: 2,
      attributes: {
        title: "Contract Drafting",
        slug: "contract-drafting",
        description: "Professional contract preparation and review services",
      },
    },
    {
      id: 3,
      attributes: {
        title: "Corporate Law",
        slug: "corporate-law",
        description: "Comprehensive corporate legal solutions",
      },
    },
    {
      id: 4,
      attributes: {
        title: "Real Estate Law",
        slug: "real-estate-law",
        description: "Property and real estate legal services",
      },
    },
    {
      id: 5,
      attributes: {
        title: "Labor Law",
        slug: "labor-law",
        description: "Employment and labor dispute resolution",
      },
    },
    {
      id: 6,
      attributes: {
        title: "Intellectual Property",
        slug: "intellectual-property",
        description: "Protect your intellectual property rights",
      },
    },
    {
      id: 7,
      attributes: {
        title: "Family Law",
        slug: "family-law",
        description: "Family matters and personal legal issues",
      },
    },
    {
      id: 8,
      attributes: {
        title: "Criminal Defense",
        slug: "criminal-defense",
        description: "Strong defense for criminal cases",
      },
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className="hidden fixed lg:block w-full  top-0 z-50 transition-all duration-300 ease-in-out   
    bg-transparent hover:bg-orange-950/90 "
      >
        <nav className="container max-w-screen-2xl mx-auto flex justify-between items-center py-4 px-4 relative">
          <section>
            <Link
              href="/"
              aria-label="Al Safar and Partners Logo"
              className="flex items-center relative"
            >
              <Image
                src="/next.svg"
                alt="Al Safar and Partners Logo"
                width={100}
                height={100}
                className="grayscale-50 sepia-50"
              />
            </Link>
          </section>

          <section className="flex items-center justify-center ">
            <DesktopNavigationMenu
              navLinks={navLinks}
              services={mockServices}
            />
          </section>

          <section className="flex items-center gap-4 xl:gap-6">
            <SearchInput />
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="text-white text-sm hover:text-orange-200 transition-colors rounded-md px-4 py-2 border border-white/50 hover:border-orange-400 whitespace-nowrap"
            >
              {t("bookAppointment")}
            </Link>
          </section>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation navLinks={navLinks} services={mockServices} />
    </>
  );
}
