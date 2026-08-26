"use client";

import { useEffect } from "react";

export default function HelmetWrapper({
  title,
  description,
  canonicalUrl,
  keywords = [],
  image,
  type = "website",
  author,
  publishedAt,
  modifiedAt,
  siteName = "Nythng Cosmetics",
  twitterHandle = "@nythngcosmetics",
  locale = "en_US",
  robots = "index, follow",
  schema,
}) {
  useEffect(() => {
    // =========================
    // FULL TITLE
    // =========================

    const fullTitle = title
      ? `${title} | ${siteName}`
      : siteName;

    // =========================
    // CURRENT URL
    // =========================

    const currentUrl =
      canonicalUrl ||
      (typeof window !== "undefined"
        ? window.location.href
        : "");

    // =========================
    // DOCUMENT TITLE
    // =========================

    document.title = fullTitle;

    // =========================
    // UPDATE / CREATE META TAG
    // =========================

    const updateMetaTag = (selector, content) => {
      if (!content) return;

      let metaTag =
        document.querySelector(selector);

      if (!metaTag) {
        metaTag =
          document.createElement("meta");

        if (selector.includes("property=")) {
          const match = selector.match(
            /property="([^"]+)"/
          );

          if (match) {
            metaTag.setAttribute(
              "property",
              match[1]
            );
          }
        } else if (
          selector.includes("name=")
        ) {
          const match = selector.match(
            /name="([^"]+)"/
          );

          if (match) {
            metaTag.setAttribute(
              "name",
              match[1]
            );
          }
        }

        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute(
        "content",
        content
      );
    };

    // =========================
    // UPDATE / CREATE LINK TAG
    // =========================

    const updateLinkTag = (rel, href) => {
      if (!href) return;

      let linkTag = document.querySelector(
        `link[rel="${rel}"]`
      );

      if (!linkTag) {
        linkTag =
          document.createElement("link");

        linkTag.setAttribute(
          "rel",
          rel
        );

        document.head.appendChild(
          linkTag
        );
      }

      linkTag.setAttribute(
        "href",
        href
      );
    };

    // =========================
    // BASIC META TAGS
    // =========================

    updateMetaTag(
      'meta[name="description"]',
      description
    );

    updateMetaTag(
      'meta[name="keywords"]',
      keywords.join(", ")
    );

    updateMetaTag(
      'meta[name="author"]',
      author || siteName
    );

    updateMetaTag(
      'meta[name="robots"]',
      robots
    );

    // =========================
    // CANONICAL URL
    // =========================

    if (currentUrl) {
      updateLinkTag(
        "canonical",
        currentUrl
      );
    }

    // =========================
    // OPEN GRAPH
    // =========================

    updateMetaTag(
      'meta[property="og:title"]',
      title || siteName
    );

    updateMetaTag(
      'meta[property="og:description"]',
      description
    );

    updateMetaTag(
      'meta[property="og:type"]',
      type
    );

    updateMetaTag(
      'meta[property="og:url"]',
      currentUrl
    );

    updateMetaTag(
      'meta[property="og:site_name"]',
      siteName
    );

    updateMetaTag(
      'meta[property="og:locale"]',
      locale
    );

    // =========================
    // OG IMAGE
    // =========================

    if (image) {
      updateMetaTag(
        'meta[property="og:image"]',
        image
      );

      updateMetaTag(
        'meta[property="og:image:width"]',
        "1200"
      );

      updateMetaTag(
        'meta[property="og:image:height"]',
        "630"
      );

      updateMetaTag(
        'meta[property="og:image:alt"]',
        title || siteName
      );
    }

    // =========================
    // ARTICLE META TAGS
    // =========================

    if (type === "article") {
      if (author) {
        updateMetaTag(
          'meta[property="article:author"]',
          author
        );
      }

      if (publishedAt) {
        updateMetaTag(
          'meta[property="article:published_time"]',
          publishedAt
        );
      }

      if (modifiedAt) {
        updateMetaTag(
          'meta[property="article:modified_time"]',
          modifiedAt
        );
      }

      // Remove old article tags
      document
        .querySelectorAll(
          'meta[property="article:tag"]'
        )
        .forEach((tag) =>
          tag.remove()
        );

      // Add article tags
      if (keywords.length > 0) {
        keywords.forEach((keyword) => {
          const metaTag =
            document.createElement(
              "meta"
            );

          metaTag.setAttribute(
            "property",
            "article:tag"
          );

          metaTag.setAttribute(
            "content",
            keyword
          );

          document.head.appendChild(
            metaTag
          );
        });
      }
    }

    // =========================
    // TWITTER CARD
    // =========================

    updateMetaTag(
      'meta[name="twitter:card"]',
      "summary_large_image"
    );

    updateMetaTag(
      'meta[name="twitter:site"]',
      twitterHandle
    );

    updateMetaTag(
      'meta[name="twitter:creator"]',
      twitterHandle
    );

    updateMetaTag(
      'meta[name="twitter:title"]',
      title || siteName
    );

    updateMetaTag(
      'meta[name="twitter:description"]',
      description
    );

    if (image) {
      updateMetaTag(
        'meta[name="twitter:image"]',
        image
      );

      updateMetaTag(
        'meta[name="twitter:image:alt"]',
        title || siteName
      );
    }

    // =========================
    // ADDITIONAL META
    // =========================

    updateMetaTag(
      'meta[name="theme-color"]',
      "#000000"
    );

    updateMetaTag(
      'meta[name="msapplication-TileColor"]',
      "#000000"
    );

    // =========================
    // JSON-LD SCHEMA
    // =========================

    const existingSchema =
      document.querySelector(
        'script[data-helmet-schema="true"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const schemaScript =
        document.createElement(
          "script"
        );

      schemaScript.type =
        "application/ld+json";

      schemaScript.setAttribute(
        "data-helmet-schema",
        "true"
      );

      schemaScript.textContent =
        JSON.stringify(schema);

      document.head.appendChild(
        schemaScript
      );
    }

    // =========================
    // CLEANUP
    // =========================

    return () => {
      const schemaScript =
        document.querySelector(
          'script[data-helmet-schema="true"]'
        );

      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [
    title,
    description,
    canonicalUrl,
    keywords,
    image,
    type,
    author,
    publishedAt,
    modifiedAt,
    siteName,
    twitterHandle,
    locale,
    robots,
    schema,
  ]);

  return null;
}