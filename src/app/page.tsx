import React from "react";
import { getCategories, getSiteSettings } from "@/lib/supabase";
import { CATEGORIES as FALLBACK_CATEGORIES } from "@/lib/products";
import ClientHome from "./ClientHome";

export default async function Home() {
  const settings = await getSiteSettings();
  let categories = [];
  try {
    const data = await getCategories();
    if (data && data.length > 0) {
      categories = data.map((cat) => {
        const matchedFallback = FALLBACK_CATEGORIES.find((f) => f.id === cat.id);
        return {
          ...cat,
          subcategories: matchedFallback ? matchedFallback.subcategories : [],
        };
      });
    } else {
      categories = FALLBACK_CATEGORIES;
    }
  } catch (err) {
    console.error("Error loading live categories, using offline catalog:", err);
    categories = FALLBACK_CATEGORIES;
  }

  return <ClientHome initialCategories={categories} settings={settings} />;
}
