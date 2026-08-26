"use client";

import React from "react";
import Image from "next/image";
import {
  Loader2,
  Mail,
  Phone,
  Clock3,
  MapPin,
  ArrowUpRight,
  Send,
  Sparkles,
} from "lucide-react";

import youtube from "@/assets/svg/youtube.svg";
import twitter from "@/assets/svg/twitter.svg";
import pinterest from "@/assets/svg/pinterest.svg";

import api from "@/utils/api";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

function ContactForm() {
  const [formData, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange = (field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setSuccessMessage("");

    const res = await api.post("/contact-us", formData);

    if (res?.data?.status === "success") {
      const message =
        res.data?.message ||
        "Your message has been sent successfully!";

      toast.success(message);

      dispatch({ type: "RESET" });

      // Inline success message
      setSuccessMessage("Message sent successfully!");
    }
  } catch (error) {
    console.error("Error submitting form:", error);

    toast.error("There was an error submitting your form.");
    setSuccessMessage("");
  } finally {
    setLoading(false);
  }
};

  const inputClass = `
    w-full
    rounded-xl
    border border-[#DCEAEA]
    bg-white/80
    px-4 py-3
    text-sm
    text-[#183838]
    placeholder:text-[#8A9B9B]
    outline-none
    transition-all duration-300
    hover:border-[#9FD0D0]
    focus:border-[#61b9b9]
    focus:bg-white
    focus:ring-4
    focus:ring-[#61b9b9]/10
  `;

  const socialIconClass = `
    flex
    h-[42px]
    w-[42px]
    items-center
    justify-center
    rounded-[13px]
    border border-[#E1EDED]
    bg-[#F9FCFC]
    text-[#355454]
    transition-all duration-300
    hover:-translate-y-1
    hover:border-[#61b9b9]
    hover:bg-[#61b9b9]
    hover:text-white
    hover:shadow-[0_10px_25px_rgba(97,185,185,0.25)]
  `;

  return (
    <section className="relative overflow-hidden bg-[#F8FBFB] py-10 md:py-14">

      {/* ================= BACKGROUND ================= */}

      <div
        className="
          absolute
          -top-40
          -left-40
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#61b9b9]/10
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#69b4c2]/10
          blur-[130px]
        "
      />

      <div className="relative mx-auto w-11/12 max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 max-w-2xl md:mb-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border border-[#DCEAEA]
              bg-white/70
              px-3.5
              py-2
              shadow-sm
              backdrop-blur-xl
            "
          >
            <Sparkles
              size={14}
              className="text-[#61b9b9]"
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#355454]
              "
            >
              Get In Touch
            </span>
          </div>

          <h1
            className="
              mt-4
              max-w-2xl
              text-3xl
              font-light
              leading-[1.1]
              tracking-tight
              text-[#183838]
              md:text-4xl
              xl:text-5xl
            "
          >
            We’re here to help with

            <span className="block text-[#61b9b9]">
              anything skincare.
            </span>
          </h1>

          <p
            className="
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-[#607474]
              md:text-base
            "
          >
            Questions about a product, your order, or your
            skincare routine? Send us a message and our team
            will get back to you.
          </p>

        </div>

        {/* ================= MAIN LAYOUT ================= */}

        <div
          className="
            grid
            items-start
            gap-6
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >

          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-4">

            {/* ================= SUPPORT CARD ================= */}

            <div
              className="
                rounded-[24px]
                border border-white
                bg-white/80
                p-5
                shadow-[0_15px_50px_rgba(53,84,84,0.07)]
                backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_65px_rgba(53,84,84,0.1)]
                md:p-6
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF7F7]
                    text-[#61b9b9]
                  "
                >
                  <Mail size={19} />
                </div>

                <div>
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[2.5px]
                      text-[#789292]
                    "
                  >
                    Customer Support
                  </span>

                  <h3
                    className="
                      mt-1
                      text-lg
                      font-semibold
                      text-[#183838]
                    "
                  >
                    How can we help?
                  </h3>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                {/* Email */}

                <a
                  href="mailto:support@nythng.com"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-2xl
                    border border-[#E5EEEE]
                    bg-[#F9FCFC]
                    p-3.5
                    transition-all duration-300
                    hover:border-[#61b9b9]
                    hover:bg-[#F1FAFA]
                  "
                >
                  <div className="flex items-center gap-3">

                    <Mail
                      size={17}
                      className="text-[#61b9b9]"
                    />

                    <div>
                      <span className="block text-[14px] text-[#789292]">
                        Email us
                      </span>

                      <span className="text-sm font-medium text-[#355454]">
                        support@nythng.com
                      </span>
                    </div>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      text-[#789292]
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>

                {/* Phone */}

                <a
                  href="tel:+919645445525"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-2xl
                    border border-[#E5EEEE]
                    bg-[#F9FCFC]
                    p-3.5
                    transition-all duration-300
                    hover:border-[#61b9b9]
                    hover:bg-[#F1FAFA]
                  "
                >
                  <div className="flex items-center gap-3">

                    <Phone
                      size={17}
                      className="text-[#61b9b9]"
                    />

                    <div>
                      <span className="block text-[14px] text-[#789292]">
                        Call us
                      </span>

                      <span className="text-sm font-medium text-[#355454]">
                        +91-96454-45525
                      </span>
                    </div>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      text-[#789292]
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>

                {/* Support Hours */}

                <div
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border border-[#E5EEEE]
                    bg-[#F9FCFC]
                    p-3.5
                  "
                >
                  <Clock3
                    size={17}
                    className="
                      mt-0.5
                      shrink-0
                      text-[#61b9b9]
                    "
                  />

                  <div>
                    <span className="block text-[14px] text-[#789292]">
                      Support hours
                    </span>

                    <span className="mt-0.5 block text-sm font-medium text-[#355454]">
                      Monday – Friday, 10 AM – 6 PM IST
                    </span>

                    <span className="mt-0.5 block text-[11px] text-[#8A9B9B]">
                      Closed on national holidays
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= OFFICE CARD ================= */}

            <div
              className="
                rounded-[24px]
                border border-white
                bg-white/80
                p-5
                shadow-[0_15px_50px_rgba(53,84,84,0.07)]
                backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_65px_rgba(53,84,84,0.1)]
                md:p-6
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF7F7]
                    text-[#61b9b9]
                  "
                >
                  <MapPin size={19} />
                </div>

                <div>
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[2.5px]
                      text-[#789292]
                    "
                  >
                    Our Office
                  </span>

                  <h3
                    className="
                      mt-1
                      text-lg
                      font-semibold
                      text-[#183838]
                    "
                  >
                    Come say hello
                  </h3>
                </div>

              </div>

              <div
                className="
                  mt-5
                  rounded-2xl
                  border border-[#E5EEEE]
                  bg-[#F9FCFC]
                  p-4
                "
              >
                <p className="text-sm font-semibold text-[#355454]">
                  MHJ PHARMACONCEPTS PRIVATE LIMITED
                </p>

                <p className="mt-2 text-sm leading-6 text-[#607474]">
                  DSM-030/031, DLF Corporate Towers,
                  <br />
                  Shivaji Marg, New Delhi – 110015,
                  <br />
                  INDIA
                </p>
              </div>

            </div>

            {/* ================= SOCIAL CARD ================= */}

            <div
              className="
                rounded-[24px]
                border border-white
                bg-white/80
                p-5
                shadow-[0_15px_50px_rgba(53,84,84,0.07)]
                backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_65px_rgba(53,84,84,0.1)]
                md:p-6
              "
            >

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[2.5px]
                  text-[#789292]
                "
              >
                Follow Our Journey
              </span>

              <h3
                className="
                  mt-1
                  text-lg
                  font-semibold
                  text-[#183838]
                "
              >
                Stay connected with us
              </h3>

              <div className="mt-4 flex flex-wrap gap-2.5">

                {/* Instagram */}

                <a
                  href="https://www.instagram.com/nythngcosmetics/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer"
                  className={socialIconClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                  </svg>
                </a>

                {/* Facebook */}

                <a
                  href="https://www.facebook.com/nythngcosmetics/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer"
                  className={socialIconClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1Z" />
                  </svg>
                </a>

                {/* YouTube */}

                <a
                  href="https://www.youtube.com/@nythngcosmetics"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noreferrer"
                  className={socialIconClass}
                >
                  <Image
                    src={youtube}
                    alt="YouTube"
                    width={18}
                    height={18}
                  />
                </a>

                {/* Twitter / X */}

                <a
                  href="https://x.com/nythngcosmetics"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noreferrer"
                  className={socialIconClass}
                >
                  <Image
                    src={twitter}
                    alt="Twitter"
                    width={19}
                    height={19}
                  />
                </a>

                {/* Pinterest */}

                <a
                  href="https://www.pinterest.com/nythngcosmetics/"
                  aria-label="Pinterest"
                  target="_blank"
                  rel="noreferrer"
                  className={socialIconClass}
                >
                  <Image
                    src={pinterest}
                    alt="Pinterest"
                    width={19}
                    height={19}
                  />
                </a>

              </div>

            </div>

          </div>

          {/* ================= RIGHT FORM ================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[26px]
              border border-white
              bg-white/90
              p-5
              shadow-[0_20px_60px_rgba(53,84,84,0.1)]
              backdrop-blur-2xl
              md:p-7
            "
          >

            {/* Background Glow */}

            <div
              className="
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#61b9b9]/12
                blur-[80px]
              "
            />

            <div className="relative z-10">

              {/* Form Heading */}

              <div className="mb-6">

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[3px]
                    text-[#61b9b9]
                  "
                >
                  Send A Message
                </span>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-light
                    tracking-tight
                    text-[#183838]
                    md:text-3xl
                  "
                >
                  Tell us how we can help.
                </h2>

                <p
                  className="
                    mt-2
                    max-w-lg
                    text-sm
                    leading-6
                    text-[#607474]
                  "
                >
                  Have a product question or feedback? Fill
                  out the form below and we'll get back to you
                  within 24–48 hours.
                </p>

              </div>

              {/* ================= FORM ================= */}

              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >

                {/* Name + Email */}

                <div className="grid gap-4 md:grid-cols-2">

                  {/* Full Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-1.5
                        block
                        text-md
                        font-medium
                        text-[#355454]
                      "
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        handleChange(
                          "name",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-1.5
                        block
                        text-md
                        font-medium
                        text-[#355454]
                      "
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleChange(
                          "email",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      required
                    />
                  </div>

                </div>

                {/* Subject */}

                <div>
                  <label
                    htmlFor="subject"
                    className="
                      mb-1.5
                      block
                      text-md
                      font-medium
                      text-[#355454]
                    "
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) =>
                      handleChange(
                        "subject",
                        e.target.value
                      )
                    }
                    className={inputClass}
                    required
                  />
                </div>

                {/* Message */}

                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <label
                      htmlFor="message"
                      className="
                        text-md
                        font-medium
                        text-[#355454]
                      "
                    >
                      Message
                    </label>

                    <span className="text-[11px] text-[#8A9B9B]">
                      {formData.message.length} characters
                    </span>

                  </div>

                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us a little more about your question..."
                    value={formData.message}
                    onChange={(e) =>
                      handleChange(
                        "message",
                        e.target.value
                      )
                    }
                    className={`${inputClass} resize-none`}
                    required
                  />

                </div>

                {/* ================= SUBMIT BUTTON ================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    mt-2
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2.5
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-r
                    from-[#61b9b9]
                    via-[#6eb7c1]
                    to-[#69b4c2]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_14px_35px_rgba(97,185,185,0.3)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_20px_45px_rgba(97,185,185,0.4)]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      <span>
                        Sending Message...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Send Message
                      </span>

                      <Send
                        size={17}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      />
                    </>
                  )}

                </button>

                {/* Form Note */}

                <p className="text-center text-[11px] text-[#8A9B9B]">
                  By submitting this form, you agree to be
                  contacted regarding your enquiry.
                </p>

                {successMessage && (
                    <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#BFE5E5] bg-[#EAF8F8] px-4 py-3 text-sm font-medium text-[#3C8F8F]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#61b9b9] text-xs text-white">
                        ✓
                      </span>

                      {successMessage}
                    </div>
                  )}

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactForm;