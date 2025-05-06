import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import banner1 from '../../assets/dami_4.jpg';
import banner2 from '../../assets/br2.jpg';
import banner3 from '../../assets/dami_1.jpg';
import banner4 from '../../assets/hon.jpg';

const slides = [
  {
    id: 1,
    title: "Step into Dazzling Elegance",
    subtitle: "Discover timeless footwear, luxurious shoes for all occasions, sizes and styles.",
    buttonText: "SHOP NOW",
    image: banner1,
  },
  {
    id: 2,
    title: "Chic & Timeless Bags from LuxebyBukola",
    subtitle: "Complete your look with our exclusive collection of premium bags.",
    buttonText: "SHOP NOW",
    image: banner2,
  },
  {
    id: 3,
    title: "Jewelry that Speaks Luxury",
    subtitle: "Add a touch of elegance with LuxebyBukola's stunning jewelry pieces.",
    buttonText: "SHOP NOW",
    image: banner3,
  },
  {
    id: 4,
    title: "Where Fashion Meets Function",
    subtitle: "LuxebyBukola brings you the perfect blend of style and comfort with our shoes and accessories.",
    buttonText: "SHOP NOW",
    image: banner4,
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Left Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

          {/* Text Content */}
          <div className="relative z-20 flex items-center h-full px-8 md:px-24">
            <div className="max-w-xl text-black space-y-6">
              <h1 className="text-3xl md:text-6xl font-serif font-semibold leading-tight">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg font-light">{slide.subtitle}</p>
              <Link
                to="/shop"
                className="inline-block bg-black text-yellow-200  text-sm font-semibold px-6 py-3 mt-4 rounded hover:border-2 hover:border-black hover:text-black hover:bg-white transition"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
