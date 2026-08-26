"use client";

import Image from "next/image";

function Cards({ image, title, description }) {
  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* Sirf image container par hover effect aur transition lagaya hai */}
      <div className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-sm mb-4 cursor-pointer">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Card Details */}
      <h5 className="font-serif font-semibold text-lg primaryText mb-1">
        {title}
      </h5>

      <p className="text-sm bodyText leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Cards;