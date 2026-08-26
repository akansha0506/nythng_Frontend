"use client";
import AccordionComp from "@/components/common/Accordion";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import AccordionImg from "../../assets/images/accordionImg.png";

const heroActives = [
  {
    id: 1,
    title: "Niacinamide 5%",
    benefits: [
      "Improves skin tone",
      "Minimizes pores",
      "Strengthens skin barrier",
    ],
    idealFor: ["Uneven skin tone", "Large pores", "Sensitive skin"],
    image: AccordionImg,
  },
  {
    id: 2,
    title: "Hyaluronic Acid",
    benefits: ["Deep hydration", "Plumps skin", "Reduces fine lines"],
    idealFor: ["Dry skin", "All skin types"],
    image: AccordionImg,
  },
  {
    id: 3,
    title: "Glycolic Acid",
    benefits: ["Resurfaces dull skin", "Fades dark spots"],
    idealFor: ["Dull, rough skin", "Acne-prone skin"],
    image: AccordionImg,
  },
];

export default function HeroActives() {
  return (
    <section className="w-11/12 mx-auto mt-30">
      <HeadingHighlight
        text="Meet Our Hero Actives"
        highlight="Hero Actives"
      />

      <p className="md:w-1/2 bodyText">
        Every rhode product is made from purposeful, high-performance
        ingredients at efficacious levels.
      </p>

      <AccordionComp heroActives={heroActives} />
    </section>
  );
}