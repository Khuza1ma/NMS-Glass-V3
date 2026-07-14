import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

const isProd = process.env.NODE_ENV === "production";

const processEnv = {
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    (isProd ? undefined : "https://placeholder-url.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (isProd ? undefined : "placeholder-anon-key"),
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  if (isProd) {
    throw new Error("Invalid environment variables. Please check your production settings.");
  }
}

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: parsed.success
    ? parsed.data.NEXT_PUBLIC_SUPABASE_URL
    : "https://placeholder-url.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: parsed.success
    ? parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : "placeholder-anon-key",
};
