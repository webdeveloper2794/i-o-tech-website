"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

interface DesktopNavigationMenuProps {
  navLinks: NavLink[];
  services: Service[];
}

export function DesktopNavigationMenu({
  navLinks,
  services,
}: DesktopNavigationMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleMouseEnter = (label: string) => {
    if (navLinks.find((link) => link.label === label)?.hasDropdown) {
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Only close if mouse leaves both trigger and dropdown
    if (
      !dropdownRef.current?.contains(e.relatedTarget as Node) &&
      !triggerRef.current?.contains(e.relatedTarget as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <nav className="flex items-center gap-1 relative">
        {navLinks.map((link) => (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => handleMouseEnter(link.label)}
            onMouseLeave={handleMouseLeave}
          >
            {link.hasDropdown ? (
              <>
                <button
                  ref={triggerRef}
                  onClick={() => handleDropdownToggle(link.label)}
                  className={cn(
                    "group flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    "bg-transparent text-white",
                    " hover:text-orange-200",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500",
                    openDropdown === link.label &&
                      " text-orange-200 hover:cursor-pointer",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openDropdown === link.label && "rotate-180",
                    )}
                  />
                </button>

                {openDropdown === link.label && services.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-0 right-0 top-full z-50"
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="container max-w-screen-2xl mx-auto px-4 ">
                      <div className="px-10 py-16 bg-orange-950/95 backdrop-blur-sm border  rounded-b-lg shadow-2xl overflow-hidden border-none">
                        <ul className="grid w-full grid-cols-4 gap-4">
                          {services.map((service) => (
                            <ServiceListItem
                              key={service.id}
                              title={service.attributes.title}
                              href={`/services/${service.attributes.slug}`}
                              description={service.attributes.description}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  "bg-transparent text-white",
                  " hover:text-orange-200",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500",
                )}
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

interface ServiceListItemProps {
  title: string;
  href: string;
  description: string;
}

function ServiceListItem({ title, href, description }: ServiceListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-lg p-4 leading-none outline-none transition-colors hover:bg-orange-900/50 focus:bg-orange-900/50"
      >
        <div className="text-sm font-medium leading-none text-white group-hover:text-orange-200">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-white/70 mt-1">
          {description}
        </p>
      </Link>
    </li>
  );
}
