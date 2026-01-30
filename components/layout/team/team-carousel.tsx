import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Phone, Mail, MessageCircle } from "lucide-react";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ahmad Yusuf",
    position: "CEO",
    image: "/team-avatar.png",
    whatsapp: "+905551112233",
    phone: "+905551112233",
    email: "ahmad@company.com",
  },
  {
    id: 2,
    name: "Zayn Malik",
    position: "CTO",
    image: "/team-avatar.png",
    whatsapp: "+905554445566",
    phone: "+905554445566",
    email: "zayn@company.com",
  },
  {
    id: 3,
    name: "Fatima Noor",
    position: "Marketing Lead",
    image: "/team-avatar.png",
    whatsapp: "+905557778899",
    phone: "+905557778899",
    email: "fatima@company.com",
  },
  {
    id: 4,
    name: "Omar Ali",
    position: "Product Manager",
    image: "/team-avatar.png",
    phone: "+905550001122",
    email: "omar@company.com",
  },
];

export function TeamCarousel() {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <CarouselContent className="-ml-4">
        {teamMembers.map((member) => (
          <CarouselItem
            key={member.id}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="overflow-hidden">
              {/* IMAGE */}
              <div className="relative  h-[184px] w-full bg-[#643F2E]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="p-4 text-center space-y-4">
                <h3 className="text-lg font-semibold text-[#643F2E]">
                  {member.name}
                </h3>
                <p className="uppercase  text-[#15143966]">{member.position}</p>

                {/* CONTACT */}
                <div className="flex justify-center gap-4">
                  {member.whatsapp && (
                    <a
                      href={`https://wa.me/${member.whatsapp.replace("+", "")}`}
                      target="_blank"
                      aria-label="WhatsApp"
                      className="text-muted-foreground hover:text-green-600"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  )}

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      aria-label="Phone"
                      className="text-muted-foreground hover:text-blue-600"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label="Email"
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className=" hover:cursor-pointer" variant="ghost" />
      <CarouselNext variant="ghost" className=" hover:cursor-pointer" />
    </Carousel>
  );
}
