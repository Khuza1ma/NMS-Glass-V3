import React from "react";
import { getProductDetails } from "@/lib/supabase";
import { CATEGORIES as FALLBACK_CATEGORIES } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetailPageClient from "./ProductDetailPageClient";

interface PageProps {
  params: Promise<{ id: string; productId: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  let productData = null;
  let error = null;

  try {
    const data = await getProductDetails(resolvedParams.productId);
    if (data) {
      productData = data;
    } else {
      productData = loadFallback(resolvedParams.id, resolvedParams.productId);
    }
  } catch (err) {
    console.error("Error loading product details on server:", err);
    error = "Unable to sync details with database. Using cached information.";
    productData = loadFallback(resolvedParams.id, resolvedParams.productId);
  }

  if (!productData) {
    notFound();
  }

  return <ProductDetailPageClient productData={productData} error={error} />;
}

function loadFallback(categoryId: string, productId: string) {
  const category = FALLBACK_CATEGORIES.find((cat) => cat.id === categoryId);
  if (category) {
    let foundProd = null;
    let foundSub = null;
    for (const sub of category.subcategories || []) {
      const found = (sub.products || []).find((p) => p.id === productId);
      if (found) {
        foundProd = found;
        foundSub = sub;
        break;
      }
    }
    if (foundProd && foundSub) {
      return {
        product: foundProd,
        subcategory: foundSub,
        category: category,
      };
    }
  }
  return null;
}
