const product = {
  images: [
    "/images/product/product.jpg",
    "/images/product/product1.png",
    "/images/product/product2.png",
    "/images/product/product3.png",
    "/images/product/product4.png",
    "/images/product/product5.png",
  ],

  name: "MV5 Multivitamin Face Serum",

  Description:
    "A second-generation hyaluronic acid serum formulated to deliver instant and long-lasting hydration.",

  price: "200",

  reviewsCount: "(4.9/5) + 245 verified",

  features: [
    "Fragrance free",
    "Essential oil free",
    "Non-comedogenic",
  ],

  skinTypes: [
    "Dry Skin",
    "Combination Skin",
  ],

  selectedSkin: "Dry Skin",

  sizes: [
    "30 ml",
    "60 ml",
  ],

  quantity: 1,

  ingredients: [
    {
      name: "Salicylic Acid",
      percentage: "1%",
      description:
        "Helps unclog pores and fight acne.",
      _id: "68749d4b5f56b15b2e42a8dd",
    },
    {
      name: "Hyloronic Acid",
      percentage: "2%",
      description:
        "Helps unclog pores and fight acne.",
      _id: "68749d4b5f56b15b2e42a8de",
    },
    {
      name: "vitamin Acid",
      percentage: "1%",
      description:
        "Helps unclog pores and fight acne.",
      _id: "68749d4b5f56b15b2e42a8df",
    },
  ],

  directions:
    "Massage gently on damp skin, rinse with lukewarm water.",

  reviews: [
    {
      _id: "68248538f32b17abe4a1b369",
      title: "Best for focus and concentration",
      comment:
        "It’s the most satisfactory serum I’ve used to improve skin texture and hydration. It gives my skin a healthy glow and essential nourishment. Definitely worth trying!",
      rating: 4,
      createdAt: "2025-05-14T11:57:44.403Z",

      images: [
        "https://res.cloudinary.com/mhjproduct/image/upload/v1747223863/review/11747223847617.jpg",
        "https://res.cloudinary.com/mhjproduct/image/upload/v1747223863/review/11747223847617.jpg",
      ],

      product: {
        _id: "6811b54d82786d6af63d51eb",
        name: "EYEBEAM",
      },

      user: {
        fullName: "Vivaan Mehra",
        profileImage:
          "https://res.cloudinary.com/mhjproduct/image/upload/v1745648514/default-image_vjnd0x.jpg",
      },
    },

    {
      _id: "682484c7f32b17abe4a1b32d",
      title: "Growth",
      comment:
        "It’s really good for daily skincare. Works as a great substitute for heavy creams, and I love how light yet effective it is. My skin feels fresh and soft.",

      rating: 5,

      createdAt: "2025-05-14T11:55:51.289Z",

      images: [
        "https://res.cloudinary.com/mhjproduct/image/upload/v1747223750/review/d11747223747429.jpg",
      ],

      product: {
        _id: "6811b54d82786d6af63d51eb",
        name: "EYEBEAM",
      },

      user: {
        _id: "6819ac1b02a05d6821ff3aaa",
        fullName: "Isha Patel",
        profileImage:
          "https://res.cloudinary.com/mhjproduct/image/upload/v1745648514/default-image_vjnd0x.jpg",
      },
    },

    {
      _id: "6824849ef32b17abe4a1b309",
      title: "Love it😋😋",
      comment:
        "I’ve tried many products, but this serum stands out! My skin is super picky, but it absorbed this instantly. I even call it my ‘magic glow drops’ now .",

      rating: 3,

      createdAt: "2025-05-14T11:55:10.966Z",

      images: [],

      product: {
        _id: "6811b54d82786d6af63d51eb",
        name: "EYEBEAM",
      },

      user: {
        _id: "6819ac0290ff75df5b9cec0f",
        fullName: "Aarav Sharma",
        profileImage:
          "https://res.cloudinary.com/mhjproduct/image/upload/v1745648514/default-image_vjnd0x.jpg",
      },
    },

    {
      _id: "6824844cf32b17abe4a1b2d8",
      title: "Superb product!",
      comment: "taste not good.",
      rating: 1,

      createdAt: "2025-05-14T11:53:48.220Z",

      images: [],

      product: {
        _id: "6811b8ec67b6072dab1bcf8e",
        name: "EYEBEAM",
      },

      user: {
        _id: "68184b9961dca2e573e29ab7",
        fullName: "shreekant",
        profileImage:
          "https://res.cloudinary.com/mhjproduct/image/upload/v1752229135/profile/658865891752229135045.jpg",
      },
    },

    {
      _id: "682482a5f32b17abe4a1b2a0",
      title: "Fun way to increase immunity!",
      comment:
        "Noticed visible improvement in my skin’s glow and tone. Dry patches are gone and my face looks much healthier even in changing weather. Very happy with the results!",

      rating: 5,

      createdAt: "2025-05-14T11:46:45.740Z",

      images: [
        "https://res.cloudinary.com/mhjproduct/image/upload/v1747223204/review/blog11747223201037.jpg",
      ],

      product: {
        _id: "6811b54d82786d6af63d51eb",
        name: "EYEBEAM",
      },

      user: {
        _id: "68184b9961dca2e573e29ab7",
        fullName: "shreekant",
        profileImage:
          "https://res.cloudinary.com/mhjproduct/image/upload/v1752229135/profile/658865891752229135045.jpg",
      },
    },
  ],

  pagination: {
    limit: 5,
    page: 1,
    total: 5,
    totalPages: 1,
  },

  totalReviews: 5,

  avgRating: 3.6,

  count: [
    {
      rating: 5,
      count: 2,
    },
    {
      rating: 4,
      count: 1,
    },
    {
      rating: 3,
      count: 1,
    },
    {
      rating: 2,
      count: 0,
    },
    {
      rating: 1,
      count: 1,
    },
  ],

  productInfo: {
    ingredients:
      "Aqua, Niacinamide, Glycerin, Caprylic/Capric Triglyceride, etc.",

    skinType:
      "All skin types including sensitive",

    texture: "Lightweight gel-cream",

    usage: "AM & PM, post-cleansing",

    shelfLife:
      "24 months, 6 months after opening",

    countryOfOrigin: "India",

    certifications: [
      "Cruelty-Free",
      "Vegan",
      "Dermatologically Tested",
    ],

    warnings:
      "For external use only. Patch test before use.",

    pH: "4.5 - 6.0",

    fragranceStatus: "Fragrance-free",

    storageInstructions:
      "Keep in a cool, dry place away from sunlight",
  },

  faqData: [
    {
      id: 1,
      question: "How soon will I see results?",
      answer:
        "Most users notice brighter skin in 2-4 weeks. Full benefits appear after 8 weeks of consistent use, per our clinical study.",
    },

    {
      id: 2,
      question: "Is this safe for sensitive skin?",
      answer:
        "Most users notice brighter skin in 2-4 weeks. Full benefits appear after 8 weeks of consistent use, per our clinical study.",
    },

    {
      id: 3,
      question: "Can I use this with retinol?",
      answer:
        "Most users notice brighter skin in 2-4 weeks. Full benefits appear after 8 weeks of consistent use, per our clinical study.",
    },

    {
      id: 4,
      question: "What’s your return policy?",
      answer:
        "Most users notice brighter skin in 2-4 weeks. Full benefits appear after 8 weeks of consistent use, per our clinical study.",
    },
  ],
};

export default product;