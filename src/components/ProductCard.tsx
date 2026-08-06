import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  categoryId: string;
}

export default function ProductCard({ product, categoryId }: ProductCardProps) {
  return (
    <div className="group border border-slate-200 dark:border-white/5 rounded-xl bg-white dark:bg-neutral-900/50 hover:bg-slate-50 dark:hover:bg-neutral-900 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-white/10">
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 dark:bg-neutral-950">
        <SafeImage
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 sm:p-5 space-y-3 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-medium">Premium Fit</span>
          <Link
            href={`/category/${categoryId}/${product.id}`}
            className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 font-semibold group-hover:underline"
          >
            <span>View Details</span>
            <FiChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
