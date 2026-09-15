import card2 from "@/assets/images/researchLab/card22.png";
import card3 from "@/assets/images/researchLab/card33.png";
import card4 from "@/assets/images/researchLab/card4.png";

import HeadingHighlight from "@/components/ui/HeadingHighlight";
import Cards from "@/sections/research-lab/Cards";

function Research() {
  const features = [
    {
      image: card2,
      title: "Visible Results Backed By Data",
      description:
        "Our Serums Are Developed To Deliver Measurable Results From Hydration To Tone.",
    },
    {
      image: card3,
      title: "Formulated By Experts",
      description:
        "Anything we make is designed by skincare experts.",
    },
    {
      image: card4,
      title: "No Filler Ingredients",
      description: "Ingredients Chosen for Efficacy, Beyond Trends.",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center mt-16 mb-20">
      {/* Centered Heading Container */}
      <div className="w-full text-center max-w-2xl flex flex-col items-center">
        <HeadingHighlight
          text="What Makes Us The Best From Other Brands?"
          highlight="Best"
        />

        <p className="bodyText mt-3 text-center">
          We Don’t Follow Trends — We Formulate Based On Clinical Research,
          Precision, And Proven Performance.
        </p>
      </div>

      {/* Grid container taking full width with equal sizing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mt-12 justify-items-center items-start">
        {features.map((feature, index) => (
          <Cards key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default Research;