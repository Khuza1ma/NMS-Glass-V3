"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Category, SubCategory, Product, ProductVariant } from "@/lib/types";
import SafeImage from "@/components/SafeImage";
import { FiArrowLeft, FiCheckCircle, FiPhone, FiMessageCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Breadcrumbs from "@/components/Breadcrumbs";
import Alert from "@/components/Alert";

interface ProductDetailsData {
  product: Product;
  subcategory: SubCategory;
  category: Category;
}

interface ProductDetailPageClientProps {
  productData: ProductDetailsData;
  error?: string | null;
}

export default function ProductDetailPageClient({
  productData,
  error,
}: ProductDetailPageClientProps) {
  const { product, subcategory, category } = productData;
  
  // Aggregate all gallery images safely
  const allImages = product.images ? [...product.images] : [];
  if (product.variants) {
    product.variants.forEach((v: ProductVariant) => {
      if (v.images) {
        v.images.forEach((img: string) => {
          if (!allImages.includes(img)) {
            allImages.push(img);
          }
        });
      }
    });
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = allImages[activeImageIndex] || "";

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category.name, href: `/category/${category.id}` },
            { label: product.name },
          ]}
        />

        {/* Error Alert Display */}
        {error && <Alert message={error} />}

        {/* Back Link */}
        <Link
          href={`/category/${category.id}`}
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-semibold uppercase tracking-widest transition-colors"
        >
          <FiArrowLeft />
          <span>Back to {category.name}</span>
        </Link>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Module */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 relative group flex items-center justify-center">
              <SafeImage
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                priority={true}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-all border border-white/10 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-all border border-white/10 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronRight className="text-xl" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300 tracking-wider">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`aspect-square rounded-lg overflow-hidden border relative transition-all ${
                      activeImageIndex === i
                        ? "border-sky-500 scale-95"
                        : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Specifications & Details Card */}
          <div className="lg:col-span-5 space-y-8 bg-neutral-900/30 border border-white/5 p-8 rounded-3xl backdrop-blur-sm self-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                {subcategory.name}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
                {product.name}
              </h1>
              <p className="text-neutral-300 text-sm mt-4 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Core Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <FiCheckCircle className="text-sky-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specs && typeof product.specs === "object" && Object.keys(product.specs).length > 0 && (
              <div className="space-y-3 border-t border-white/5 pt-6">
                <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specs).map(([key, val]: [string, string]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center text-xs py-1 border-b border-white/5"
                    >
                      <span className="text-neutral-400">{key}</span>
                      <span className="text-white font-medium text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions / CTA Buttons */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <a
                href={`https://wa.me/918347786753?text=Hi%20NMS,%20I%27d%20like%20to%20inquire%20about%20the%20${encodeURIComponent(
                  product.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:opacity-95 transition-opacity text-sm"
              >
                <FiMessageCircle className="text-lg" />
                <span>Inquire on WhatsApp</span>
              </a>
              <a
                href="tel:+918347786753"
                className="w-full flex items-center justify-center gap-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-4 rounded-xl border border-white/5 transition-colors text-sm"
              >
                <FiPhone className="text-sky-400" />
                <span>Call Sales Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Variants List Section */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-bold">Available Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.variants.map((v: ProductVariant, i: number) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-6 border border-white/5 bg-neutral-900/40 rounded-2xl p-6 hover:bg-neutral-900 transition-colors"
                >
                  <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 relative">
                    <SafeImage
                      src={v.images[0]}
                      alt={v.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">{v.name}</h4>
                      {v.description && (
                        <p className="text-xs text-neutral-400 leading-relaxed">{v.description}</p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const idx = allImages.indexOf(v.images[0]);
                        if (idx !== -1) setActiveImageIndex(idx);
                      }}
                      className="mt-4 text-xs font-semibold text-sky-400 hover:text-sky-300 text-left self-start"
                    >
                      View in gallery →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
