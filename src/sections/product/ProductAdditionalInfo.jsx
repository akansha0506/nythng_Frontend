import React from "react";

const ProductAdditionalInfo = ({ info }) => {

  return (
    <section className="h-full w-full">
      <div className="flex h-full min-h-[440px] flex-col px-5 py-5 md:px-6 md:py-6">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#61b9b9]" />

              <span className="text-[9px] font-semibold tracking-[0.18em] text-[#61b9b9]">
                Product Details
              </span>
            </div>

            <h3 className="mt-2 text-[25px] font-light tracking-[-0.025em] text-[#183838]">
              Good To Know
            </h3>

            <p className="mt-1 max-w-[330px] text-[13px] leading-[1.6] text-[#758888]">
              Everything you need for the best experience with your formula.
            </p>
          </div>

          {/* SMALL DECORATIVE MARK */}

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <span className="h-px w-8 bg-[#d9e9e8]" />
            <span className="h-2 w-2 rounded-full border-2 border-[#61b9b9]" />
          </div>
        </div>

        {/* MAIN DETAILS */}

        <div className="mt-5 border-y border-[#e5eeee]">

          {/* SUITABLE FOR */}

          {info.skinType && (
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#e5eeee] py-3 last:border-b-0">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                Suitable For
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.skinType}
              </p>
            </div>
          )}

          {/* TEXTURE */}

          {info.texture && (
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#e5eeee] py-3 last:border-b-0">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                Texture
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.texture}
              </p>
            </div>
          )}

          {/* USAGE */}

          {info.usage && (
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#e5eeee] py-3 last:border-b-0">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                Usage
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.usage}
              </p>
            </div>
          )}

          {/* SHELF LIFE */}

          {info.shelfLife && (
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#e5eeee] py-3 last:border-b-0">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                Shelf Life
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.shelfLife}
              </p>
            </div>
          )}

          {/* STORAGE */}

          {info.storage && (
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#e5eeee] py-3 last:border-b-0">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                Storage
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.storage}
              </p>
            </div>
          )}

          {/* PH LEVEL */}

          {info.phLevel && (
            <div className="grid grid-cols-[110px_1fr] gap-5 py-3">
              <span className="text-[14px] font-medium text-[#8a9b9b]">
                pH Level
              </span>

              <p className="text-[13px] font-medium leading-[1.55] text-[#355454]">
                {info.phLevel}
              </p>
            </div>
          )}
        </div>

        {/* FULL INGREDIENTS */}

        {info.ingredients && (
          <div className="mt-4 rounded-[14px] bg-[#f3f9f9] px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[14px] font-semibold text-[#183838]">
                Full Ingredients
              </h4>

              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#61b9b9]" />
            </div>

            <p className="mt-2 text-[13px] leading-[1.6] text-[#708484]">
              {info.ingredients}
            </p>
          </div>
        )}

        {/* SAFETY & WARNINGS */}

        {info.precautions?.length > 0 && (
          <div className="mt-auto pt-4">
            <div className="border-t border-[#e5eeee] pt-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#cfe5e3] text-[9px] font-semibold text-[#579b9d]">
                  !
                </span>

                <h4 className="text-[14px] font-semibold text-[#183838]">
                  Safety & Warnings
                </h4>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                {info.precautions.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#61b9b9]" />

                    <span className="text-[13px] leading-[1.5] text-[#758888]">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductAdditionalInfo;