import React from "react";
import { getCategoryDetails } from "@/lib/supabase";
import { CATEGORIES as FALLBACK_CATEGORIES } from "@/lib/products";
import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  let category = null;
  let error = null;

  try {
    const data = await getCategoryDetails(resolvedParams.id);
    if (data) {
      category = data;
    } else {
      const fallback = FALLBACK_CATEGORIES.find((cat) => cat.id === resolvedParams.id);
      category = fallback || null;
    }
  } catch (err) {
    console.error("Error loading category details on server:", err);
    error = "Could not load products dynamically. Displaying local fallback catalog.";
    const fallback = FALLBACK_CATEGORIES.find((cat) => cat.id === resolvedParams.id);
    category = fallback || null;
  }

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} error={error} />;
}
