"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "../../../products";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiChevronRight, FiCheckCircle, FiPhone, FiMessageCircle } from "react-icons/fi";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const resolvedParams = use(params);
  const category = CATEGORIES.find((cat) => cat.id === resolvedParams.id);
  if (!category) notFound();

  // Search product across subcategories
  let product = null;
  let subcategory = null;
  for (const sub of category.subcategories) {
    const found = sub.products.find((p) => p.id === resolvedParams.productId);
    if (found) {
      product = found;
      subcategory = sub;
      break;
    }
  }

  if (!product || !subcategory) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);

  // Aggregate all gallery images (including variants)
  const allImages = [...product.images];
  if (product.variants) {
    product.variants.forEach((v) => {
      v.images.forEach((img) => {
        if (!allImages.includes(img)) {
          allImages.push(img);
        }
      });
    });
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
          <Link href={`/category/${category.id}`} className="hover:text-white transition-colors">
            {category.name}
          </Link>
          <FiChevronRight className="text-xs" />
          <span className="text-white font-medium">{product.name}</span>
        </div>

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
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                      activeImage === img ? "border-sky-500 scale-95" : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
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
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">{product.name}</h1>
              <p className="text-neutral-300 text-sm mt-4 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Core Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <FiCheckCircle className="text-sky-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specs && (
              <div className="space-y-3 border-t border-white/5 pt-6">
                <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">Technical Specifications</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
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
                href={`https://wa.me/919999999999?text=Hi%20NMS,%20I%27d%20like%20to%20inquire%20about%20the%20${encodeURIComponent(
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
                href="tel:+919999999999"
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
              {product.variants.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-6 border border-white/5 bg-neutral-900/40 rounded-2xl p-6 hover:bg-neutral-900 transition-colors"
                >
                  <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950">
                    <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">{v.name}</h4>
                      {v.description && <p className="text-xs text-neutral-400 leading-relaxed">{v.description}</p>}
                    </div>

                    <button
                      onClick={() => setActiveImage(v.images[0])}
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
