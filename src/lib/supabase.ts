import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import { Product, Category, SiteSettings, Inquiry } from "./types";

// Fallback configuration if Supabase settings are empty
export const FALLBACK_SETTINGS: SiteSettings = {
  id: "global_config",
  site_title: "NMS | Premium Aluminum, Fiber & Mosquito Net Solutions",
  site_subtitle:
    "Crafting architectural elements for custom premium workspaces, residential flats, and luxury offices. Build with precision, durability, and elegant styles.",
  logo_text: "NMS",
  logo_subtext: "PREMIUM QUALITY",
  phone: "+91 83477 86753",
  email: "tahersolanki76@gmail.com",
  address: "Darukhana Rd, Mahidharpura, Surat, Gujarat",
  google_maps_url: "https://maps.app.goo.gl/C7RK1gp5Q8GWwC8i9",
  justdial_url:
    "https://www.justdial.com/Surat/N-M-S-Glass-Aluminium-Opposite-Rima-Medical-Salabatpura/0261PX261-X261-120927212609-B9X9_BZDET",
  linkedin_url: "https://in.linkedin.com/in/nms-glass-and-aluminium-7b41032a6",
  instagram_url: "https://www.instagram.com/nmsglassandaluminium/",
};

// Fetch site configuration dynamically
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "global_config")
      .eq("is_deleted", false)
      .single();

    if (error) throw error;
    return data || FALLBACK_SETTINGS;
  } catch (err) {
    console.error("Error loading settings from Supabase, using fallback:", err);
    return FALLBACK_SETTINGS;
  }
}

// Fetch all categories dynamically
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error loading categories from Supabase:", err);
    return [];
  }
}

// Fetch subcategories and products for a category
export async function getCategoryDetails(categoryId: string): Promise<Category | null> {
  try {
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .eq("is_deleted", false)
      .single();

    if (catError) throw catError;
    if (!category) return null;

    // Get subcategories
    const { data: subcategories, error: subError } = await supabase
      .from("subcategories")
      .select("*")
      .eq("category_id", categoryId)
      .eq("is_deleted", false);

    if (subError) throw subError;

    // Get all products for these subcategories
    const subIds = (subcategories || []).map((s) => s.id);
    let products: Product[] = [];

    if (subIds.length > 0) {
      const { data: prods, error: prodError } = await supabase
        .from("products")
        .select("*")
        .in("subcategory_id", subIds)
        .eq("is_deleted", false);

      if (prodError) throw prodError;
      products = prods || [];
    }

    const subcategoriesWithProducts = (subcategories || []).map((sub) => ({
      ...sub,
      products: products.filter((p) => p.subcategory_id === sub.id),
    }));

    return {
      ...category,
      subcategories: subcategoriesWithProducts,
    };
  } catch (err) {
    console.error(`Error loading category ${categoryId} from Supabase:`, err);
    return null;
  }
}

// Fetch a single product with its parent details and variants
export async function getProductDetails(productId: string) {
  try {
    const { data: product, error: prodError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_deleted", false)
      .single();

    if (prodError) throw prodError;
    if (!product) return null;

    // Fetch subcategory
    const { data: subcategory, error: subError } = await supabase
      .from("subcategories")
      .select("*")
      .eq("id", product.subcategory_id)
      .eq("is_deleted", false)
      .single();

    if (subError) throw subError;

    // Fetch category
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", subcategory.category_id)
      .eq("is_deleted", false)
      .single();

    if (catError) throw catError;

    // Fetch variants
    const { data: variants } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .eq("is_deleted", false);

    return {
      product: {
        ...product,
        variants: variants || [],
      },
      subcategory,
      category,
    };
  } catch (err) {
    console.error(`Error loading product ${productId} from Supabase:`, err);
    return null;
  }
}

export function extractErrorMessage(err: unknown): string {
  if (!err) return "An unknown error occurred.";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object") {
    const obj = err as Record<string, unknown>;
    if (typeof obj.message === "string" && obj.message && obj.message !== "[object Object]") {
      return obj.message;
    }
    if (typeof obj.error_description === "string" && obj.error_description) {
      return obj.error_description;
    }
    if (typeof obj.details === "string" && obj.details) {
      return obj.details;
    }
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
  return String(err);
}

// Submit inquiry to Supabase
export async function submitInquiry(
  inquiry: Inquiry
): Promise<{ success: boolean; error?: { message: string } | null }> {
  try {
    const { error } = await supabase.from("inquiries").insert([inquiry]);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Error submitting inquiry to Supabase:", err);
    return {
      success: false,
      error: { message: extractErrorMessage(err) },
    };
  }
}
