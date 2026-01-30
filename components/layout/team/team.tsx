import React from "react";
import { TeamCarousel } from "./team-carousel";

export function Team() {
  return (
    <main className="py-16  container mx-auto ">
      <section className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl  font-bold mb-4  text-[#643F2E]">Our Team</h1>
        <p className="text-[#1E1E1E] ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </section>
      <TeamCarousel />
    </main>
  );
}
