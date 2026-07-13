"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryDetails } from "@/app/lib/supabase";
import { CATEGORIES as FALLBACK_CATEGORIES } from "@/app/lib/products";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import Alert from "@/components/Alert";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        const data = await getCategoryDetails(resolvedParams.id);
        if (data) {
          setCategory(data);
        } else {
          // Fallback
          const fallback = FALLBACK_CATEGORIES.find((cat) => cat.id === resolvedParams.id);
          setCategory(fallback || null);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load products dynamically. Displaying local fallback catalog.");
        const fallback = FALLBACK_CATEGORIES.find((cat) => cat.id === resolvedParams.id);
        setCategory(fallback || null);
      } finally {
        setLoading(false);
      }
    }
    loadCategory();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-8">
        <div className="max-w-7xl w-full space-y-8 animate-pulse">
          <div className="h-6 w-32 bg-neutral-900 rounded"></div>
          <div className="h-[300px] w-full bg-neutral-900 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-10 w-48 bg-neutral-900 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-neutral-900 rounded-2xl"></div>
              <div className="h-64 bg-neutral-900 rounded-2xl"></div>
              <div className="h-64 bg-neutral-900 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />

        {/* Error Alert Display */}
        {error && <Alert message={error} />}

        {/* Category Header */}
        <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-neutral-900/30 p-8 sm:p-12 md:p-16 flex flex-col justify-end min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent z-10" />
          <SafeImage
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35 -z-10"
          />
          <div className="relative z-20 space-y-4 max-w-2xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-semibold uppercase tracking-widest mb-2 transition-colors"
            >
              <FiArrowLeft />
              <span>Back to Services</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{category.name}</h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">{category.description}</p>
          </div>
        </div>

        {/* Subcategories list */}
        <div className="space-y-16">
          {category.subcategories && category.subcategories.map((sub: any, index: number) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-8"
            >
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold">{sub.name}</h2>
                <p className="text-sm text-neutral-400 mt-1">{sub.description}</p>
              </div>

              {/* Products inside this subcategory */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sub.products && sub.products.map((product: any) => (
                  <ProductCard key={product.id} product={product} categoryId={category.id} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
