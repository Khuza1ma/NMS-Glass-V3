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
    <div className="group border border-white/5 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/5">
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
            href={`/category/${categoryId}/${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold group-hover:underline"
          >
            <span>View Details</span>
            <FiChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
