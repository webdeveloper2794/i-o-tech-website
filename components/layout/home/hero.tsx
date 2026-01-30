"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSliderProps {
  slides: Slide[];
  options?: EmblaOptionsType;
}

export function HeroSlider({ slides, options = {} }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true,
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance slides
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="absolute top-0 w-full h-screen overflow-hidden ">
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="flex justify-between items-center">
          {/* Slider Container - Takes full width on mobile, 7 columns on desktop */}
          <div className="relative">
            <div
              className="embla__viewport overflow-hidden h-125"
              ref={emblaRef}
            >
              <div className="embla__container flex flex-col h-full">
                {slides.map((slide) => (
                  <div
                    className="embla__slide shrink-0 grow-0 w-full min-h-0 flex items-center px-10"
                    key={slide.id}
                  >
                    <div className="flex justify-between gap-16 px-6 items-center">
                      {/* Left Side: Title & Description */}
                      <div className="text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-[40px] font-semibold mb-6">
                          {/* {slide.title} */}
                          Lorem Ipsum
                        </h1>
                        <p className="text-lg md:text-xl mb-8 opacity-90">
                          {slide.description}
                        </p>
                        <Link
                          href={slide.buttonLink}
                          className="mt-6 inline-flex items-center px-8 py-3 bg-white text-[#4B2615] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                          {slide.buttonText}
                        </Link>
                      </div>

                      {/* Right Side: Fixed 374x374 Image */}
                      <div className="hidden md:flex justify-center lg:justify-end">
                        <div className="relative w-[374px] h-[374px] bg-[#643F2E] ">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            width={374}
                            height={374}
                            className="object-cover shadow-2xl"
                            priority={slide.id === 1} // Only prioritize first image
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Dots Navigation - Left Side */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-4">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Empty column for spacing */}
          <div className="lg:col-span-5" />
        </div>
      </div>

      {/* CSS for Embla */}
      <style jsx>{`
        .embla__viewport {
          overflow: hidden;
          width: 100%;
        }
        .embla__container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .embla__slide {
          position: relative;
          min-height: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
