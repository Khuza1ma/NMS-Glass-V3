export interface ProductVariant {
  name: string;
  description?: string;
  images: string[];
  videos?: string[];
  specs?: Record<string, string>;
}

export interface Product {
  id: string;
  subcategory_id?: string;
  name: string;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
  images: string[];
  videos?: string[];
  variants?: ProductVariant[];
}

export interface SubCategory {
  id: string;
  category_id?: string;
  name: string;
  description: string;
  image: string;
  products?: Product[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories?: SubCategory[];
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_subtitle: string;
  logo_text: string;
  logo_subtext: string;
  phone: string;
  email: string;
  address: string;
  google_maps_url: string;
  justdial_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
}

export interface Inquiry {
  id?: string;
  created_at?: string;
  name: string;
  email?: string | null;
  phone: string;
  category: string;
  message: string;
}
