import React from "react";

export function TestimonialBlock() {
  return (
    <section className="py-20 container mx-auto bg-red-400">
      <header className="px-8 w-1/2 ">
        <h2 className="text-3xl font-bold text-white mb-8">
          What our clients are saying
        </h2>
        <p className="text-white">
          Our clients range from individual investors, to local, international
          as well as fortune 500 companies.Our clients range from individual
          investors, to local, international as well as fortune 500 companies.
        </p>
      </header>
      <main>{/* here should be testimonial carousel  */}</main>
    </section>
  );
}
