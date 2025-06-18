import React from 'react';
import { Link } from 'react-router-dom';

export const HeroButtonsSection = () => {
  return (
    <section className="bg-[#f9f4ef] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/schedule-page"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Agendar
          </Link>
          <Link
            to="/services"
            className="border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
          >
            Ver serviços
          </Link>
        </div>
      </div>
    </section>
  );
};
