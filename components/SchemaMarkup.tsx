import React from "react";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Boba Express Niamey",
    "image": "https://bobaexpress-niamey.com/hero_master.jpg",
    "url": "https://bobaexpress-niamey.com",
    "description": "Boba Express redéfinit l'expérience du Bubble Tea à Niamey. Des ingrédients premium, une culture authentique, une énergie pure.",
    "telephone": "+22700000000", // Update with real phone
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yantala",
      "addressLocality": "Niamey",
      "addressRegion": "Niamey",
      "addressCountry": "NE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.5127,
      "longitude": 2.1128
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "servesCuisine": "Bubble Tea, Milkshakes, Coffee",
    "priceRange": "$$",
    "sameAs": [
      "https://instagram.com/boba.express_",
      "https://facebook.com/bobaexpressniamey",
      "https://twitter.com/boba_express_"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
