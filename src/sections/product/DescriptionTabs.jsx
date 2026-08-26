import Image from "next/image";
import description from "@/assets/images/product/homeohalSerum.png";

function DescriptionTab({ ingredients, directions }) {
  return (
    <main className="h-full w-full">
      <section className="relative h-full min-h-[580px] overflow-hidden bg-[#edf8f8]">

        {/* LARGE PRODUCT VISUAL */}

        <div className="relative h-[270px] overflow-hidden sm:h-[320px] md:h-[360px]">

          {/* SOFT BACKGROUND */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#f7fcfc] via-[#e8f6f6] to-[#d6eeee]" />

          {/* DECORATIVE CIRCLES */}

          <div className="absolute -left-20 -top-24 h-[280px] w-[280px] rounded-full border border-white/80" />

          <div className="absolute -right-24 top-8 h-[320px] w-[320px] rounded-full border border-white/70" />

          <div className="absolute left-[55%] top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[15px]" />

          {/* TOP CONTENT */}

          <div className="absolute left-7 top-7 z-20 md:left-8 md:top-8">

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-[#61b9b9]" />

              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#579b9d]">
                Formula Focus
              </span>

            </div>

            <h3 className="mt-3 max-w-[260px] text-[26px] font-light leading-[1.08] tracking-[-0.03em] text-[#183838] sm:text-[34px] md:text-[38px]">
              Super Ingredients
            </h3>

            <p className="mt-3 max-w-[240px] text-[13px] leading-6 text-[#6f8383]">
              Carefully selected actives behind your everyday formula.
            </p>

          </div>

          {/* SERUM IMAGE */}

          <div className="absolute bottom-0 right-2 top-6 z-10 flex w-[42%] items-center justify-center sm:w-[45%] md:w-[48%]">

            <Image
              src={description}
              alt="AI analysis"
              className="h-full max-h-[240px] w-full object-contain sm:max-h-[300px] md:max-h-[360px]"
            />

          </div>

          {/* SMALL PRODUCT LABEL */}

          <div className="absolute bottom-6 left-7 z-20 flex items-center gap-3 md:left-8">

            <span className="h-2 w-2 rounded-full bg-[#61b9b9]" />

            <span className="text-[11px] font-medium text-[#597575]">
              Thoughtfully Formulated
            </span>

          </div>

        </div>

        {/* INGREDIENTS PANEL */}

        <div className="relative z-30 mx-3 -mt-6 rounded-[22px] border border-white bg-white/95 p-5 shadow-[0_18px_50px_rgba(24,56,56,0.08)] backdrop-blur-xl sm:mx-5 md:-mt-4 md:mx-5 md:p-6">

          <div className="mb-4 flex items-center justify-between">

            <h4 className="text-[15px] font-semibold text-[#183838]">
              Key Actives
            </h4>

            <span className="text-[11px] font-medium text-[#7c9191]">
              Inside The Formula
            </span>

          </div>

          {/* INGREDIENTS */}

          <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">

            {ingredients?.map((ingri) => (

              <li
                key={ingri?._id}
                className="border-t border-[#e6eeee] py-4"
              >

                <div className="flex items-start gap-3">

                  <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#61b9b9]" />

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h5 className="text-[15px] font-semibold text-[#183838]">
                        {ingri?.name}
                      </h5>

                      <span className="rounded-full bg-[#eaf7f7] px-2.5 py-1 text-[10px] font-semibold text-[#579b9d]">
                        {ingri?.percentage}
                      </span>

                    </div>

                    <p className="mt-1.5 text-[12px] leading-[1.6] text-[#718585]">
                      {ingri?.description}
                    </p>

                  </div>

                </div>

              </li>

            ))}

          </ul>

        </div>

      </section>
    </main>
  );
}

export default DescriptionTab;