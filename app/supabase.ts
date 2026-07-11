import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProductVariant {
  name: string;
  description?: string;
  images: string[];
  specs?: Record<string, string>;
}

export interface Product {
  id: string;
  subcategory_id: string;
  name: string;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
  images: string[];
  variants?: ProductVariant[];
}

export interface SubCategory {
  id: string;
  category_id: string;
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

// Fallback configuration if Supabase settings are empty
export const FALLBACK_SETTINGS: SiteSettings = {
  id: 'global_config',
  site_title: 'NMS | Premium Aluminum, Fiber & Mosquito Net Solutions',
  site_subtitle: 'Crafting architectural elements for custom premium workspaces, residential flats, and luxury offices. Build with precision, durability, and elegant styles.',
  logo_text: 'NMS',
  logo_subtext: 'PREMIUM QUALITY',
  phone: '+91 83477 86753',
  email: 'tahersolanki76@gmail.com',
  address: 'Darukhana Rd, Mahidharpura, Surat, Gujarat',
  google_maps_url: 'https://maps.app.goo.gl/C7RK1gp5Q8GWwC8i9',
  justdial_url: 'https://www.justdial.com/Surat/N-M-S-Glass-Aluminium-Opposite-Rima-Medical-Salabatpura/0261PX261-X261-120927212609-B9X9_BZDET',
  linkedin_url: 'https://in.linkedin.com/in/nms-glass-and-aluminium-7b41032a6',
  instagram_url: 'https://www.instagram.com/nmsglassandaluminium/'
};

// Fetch site configuration dynamically
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global_config')
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
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

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
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (catError) throw catError;
    if (!category) return null;

    // Get subcategories
    const { data: subcategories, error: subError } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId);

    if (subError) throw subError;

    // Get all products for these subcategories
    const subIds = (subcategories || []).map(s => s.id);
    let products: Product[] = [];
    
    if (subIds.length > 0) {
      const { data: prods, error: prodError } = await supabase
        .from('products')
        .select('*')
        .in('subcategory_id', subIds);
      
      if (prodError) throw prodError;
      products = prods || [];
    }

    const subcategoriesWithProducts = (subcategories || []).map(sub => ({
      ...sub,
      products: products.filter(p => p.subcategory_id === sub.id)
    }));

    return {
      ...category,
      subcategories: subcategoriesWithProducts
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
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (prodError) throw prodError;
    if (!product) return null;

    // Fetch subcategory
    const { data: subcategory, error: subError } = await supabase
      .from('subcategories')
      .select('*')
      .eq('id', product.subcategory_id)
      .single();

    if (subError) throw subError;

    // Fetch category
    const { data: category, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', subcategory.category_id)
      .single();

    if (catError) throw catError;

    // Fetch variants
    const { data: variants, error: varError } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId);

    return {
      product: {
        ...product,
        variants: variants || []
      },
      subcategory,
      category
    };
  } catch (err) {
    console.error(`Error loading product ${productId} from Supabase:`, err);
    return null;
  }
}
