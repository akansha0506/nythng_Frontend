import React from "react";
import bg from "@/assets/images/contact-us/contactus.png";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import ContactForm from "@/sections/contact-us/ContactForm";
import LocationMap from "@/sections/contact-us/LocationMap";

function ContactUs() {
  return (
    <main className="mt-25">
      <section
        style={{ backgroundImage: `url(${bg.src})` }}
        className="bg-cover w-full md:w-[calc(100vw-64px)] mx-auto h-[75vh] md:rounded-2xl md:h-[calc(80vh-80px)] px-[18px] 
                   md:px-[64px] flex flex-col max-md:justify-end md:flex-row md:items-end pb-10 md:pb-20 
                   object-contain object-right bg-center! md:bg-top-left"
      >
        <HeadingHighlight
          text="Contact Us"
          highlight="Contact Us"
        />
      </section>

      <ContactForm />
      <LocationMap />
    </main>
  );
}

export default ContactUs;