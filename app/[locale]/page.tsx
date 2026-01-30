import { HeroSlider } from "@/components/layout/home/hero";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Discover Amazing Products",
    description:
      "Explore our curated collection of premium products designed to enhance your lifestyle and bring joy to everyday moments.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your image paths
    buttonText: "Explore Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Innovative Solutions",
    description:
      "Cutting-edge technology meets elegant design in our latest range of innovative solutions for modern living.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Learn More",
    buttonLink: "/solutions",
  },
  {
    id: 3,
    title: "Premium Quality",
    description:
      "Experience unmatched quality and craftsmanship with our premium selection of products and services.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 4,
    title: "Sustainable Future",
    description:
      "Join us in building a sustainable future with eco-friendly products and responsible practices.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Our Mission",
    buttonLink: "/sustainability",
  },
  {
    id: 5,
    title: "Expert Support",
    description:
      "Get dedicated support from our team of experts ready to help you achieve your goals.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  },
];

export default function Home() {
  const options: EmblaOptionsType = {
    axis: "y",
    loop: true,
    duration: 30, // Adjust animation speed
  };

  return (
    <div className="w-full ">
      <main className="relative w-full h-screen  overflow-hidden">
        <div className="  w-full max-w-[100vw] overflow-hidden h-[90vh]">
          <Image
            src="https://images.unsplash.com/photo-1527288012656-13ea8f91bd63?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background pattern"
            fill
            priority
            className="object-cover"
            style={{
              // width: "1400px",
              // height: "850px",
              opacity: 1,
              transform: "rotate(0deg)",
            }}
            quality={75}
            sizes="100vw"
          />

          {/* Gradient Overlay Layer */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(271.47deg, rgba(75, 38, 21, 0.5) 1.2%, rgba(75, 38, 21, 0.7) 86.38%)",
              width: "100%",
              height: "850px",
              opacity: 1,
            }}
          />
        </div>
        <HeroSlider slides={slides} options={options} />
      </main>

      {/* Rest of your page content */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Other Sections</h2>
      </div>
    </div>
  );
}
