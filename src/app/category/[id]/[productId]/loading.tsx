import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <div className="h-4 w-64 bg-neutral-900 rounded"></div>

        {/* Back Link */}
        <div className="h-4 w-32 bg-neutral-900 rounded"></div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] w-full rounded-2xl border border-white/5 bg-neutral-900"></div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-neutral-900 border border-white/5"></div>
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-5 space-y-8 bg-neutral-900/30 border border-white/5 p-8 rounded-3xl">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-neutral-900 rounded"></div>
              <div className="h-8 w-3/4 bg-neutral-900 rounded"></div>
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-neutral-900 rounded"></div>
                <div className="h-4 w-full bg-neutral-900 rounded"></div>
                <div className="h-4 w-2/3 bg-neutral-900 rounded"></div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="h-4 w-28 bg-neutral-900 rounded"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-3 w-5/6 bg-neutral-900 rounded"></div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <div className="h-4 w-36 bg-neutral-900 rounded"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-20 bg-neutral-900 rounded"></div>
                    <div className="h-3 w-24 bg-neutral-900 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <div className="h-12 w-full bg-neutral-900 rounded-xl"></div>
              <div className="h-10 w-full bg-neutral-900 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
