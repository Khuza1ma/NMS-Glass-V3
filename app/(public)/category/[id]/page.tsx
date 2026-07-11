"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryDetails } from "../../../supabase";
import { CATEGORIES as FALLBACK_CATEGORIES } from "../../../products";
import { notFound } from "next/navigation";
import SafeImage from "../../../SafeImage";
import { FiArrowLeft, FiChevronRight, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

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
        <div className="flex items-center space-x-2 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <FiChevronRight className="text-xs" />
          <span className="text-white font-medium">{category.name}</span>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl flex items-center gap-3 text-sm">
            <FiAlertCircle className="text-lg flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
                  <div
                    key={product.id}
                    className="group border border-white/5 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/5"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                      <SafeImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 space-y-4 flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <span className="text-xs text-neutral-500">Premium Fit</span>
                        <Link
                          href={`/category/${category.id}/${product.id}`}
                          className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold group-hover:underline"
                        >
                          <span>View Details</span>
                          <FiChevronRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
