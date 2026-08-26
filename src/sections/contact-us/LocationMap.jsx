"use client"

function LocationMap() {
  return (
    <section className="mx-auto mt-20 mb-10 h-[220px] w-11/12 max-w-7xl md:h-[85vh]">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.7804638018188!2d77.1564846745742!3d28.66629138254853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038897063403%3A0xb2521ab27b90e4cc!2sMHJ%20PHARMACONCEPTS%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1753854816543!5m2!1sen!2sin"
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "20px",
        }}
        className="border-2"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}

export default LocationMap;