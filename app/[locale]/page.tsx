import { HeroSlider } from "@/components/layout/home/hero";
import { EmblaOptionsType } from "embla-carousel";
import { Team } from "@/components/layout/team/team";
import { TestimonialBlock } from "@/components/layout/testimonial/testimonial-block";

const slides = [
  {
    id: 1,
    title: "Discover Amazing Products",
    description:
      "Explore our curated collection of premium products designed to enhance your lifestyle and bring joy to everyday moments.",
    image: "/avatar.png", // Replace with your image paths
    buttonText: "Explore Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Innovative Solutions",
    description:
      "Cutting-edge technology meets elegant design in our latest range of innovative solutions for modern living.",
    image: "/avatar.png",
    buttonText: "Learn More",
    buttonLink: "/solutions",
  },
  {
    id: 3,
    title: "Premium Quality",
    description:
      "Experience unmatched quality and craftsmanship with our premium selection of products and services.",
    image: "/avatar.png",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 4,
    title: "Sustainable Future",
    description:
      "Join us in building a sustainable future with eco-friendly products and responsible practices.",
    image: "/avatar.png",
    buttonText: "Our Mission",
    buttonLink: "/sustainability",
  },
  {
    id: 5,
    title: "Expert Support",
    description:
      "Get dedicated support from our team of experts ready to help you achieve your goals.",
    image: "/avatar.png",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  },
];

export default function Home() {
  const options: EmblaOptionsType = {
    axis: "y",
    loop: true,
    duration: 30,
  };

  return (
    <main>
      <section className="absolute top-0 w-full h-screen overflow-hidden ">
        <HeroSlider options={options} slides={slides} />
      </section>
      <section className="bg-[#F3F3F3] ">
        <Team />
      </section>
      <section className="bg-[#643F2E] mb-4">
        <TestimonialBlock />
      </section>
    </main>
  );
}
