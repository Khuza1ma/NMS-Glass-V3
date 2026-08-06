"use client";

import React from "react";
import Link from "next/link";
import { Category, SubCategory, Product } from "@/lib/types";
import SafeImage from "@/components/SafeImage";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import Alert from "@/components/Alert";
import ProductCard from "@/components/ProductCard";

interface CategoryPageClientProps {
  category: Category;
  error?: string | null;
}

export default function CategoryPageClient({ category, error }: CategoryPageClientProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />

        {/* Error Alert Display */}
        {error && <Alert message={error} />}

        {/* Category Header */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-900 p-6 sm:p-12 md:p-16 flex flex-col justify-end min-h-[260px] sm:min-h-[300px] shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20 z-10" />
          <SafeImage
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-65 -z-10"
            priority={true}
          />
          <div className="relative z-20 space-y-4 max-w-2xl text-white">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-semibold uppercase tracking-wider sm:tracking-widest mb-2 transition-colors"
            >
              <FiArrowLeft />
              <span>Back to Services</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{category.name}</h1>
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Subcategories list */}
        <div className="space-y-16">
          {category.subcategories &&
            category.subcategories.map((sub: SubCategory, index: number) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-8"
              >
                <div className="border-b border-slate-200 dark:border-white/5 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {sub.name}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-neutral-400 mt-1">{sub.description}</p>
                </div>

                {/* Products inside this subcategory */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sub.products &&
                    sub.products.map((product: Product) => (
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
