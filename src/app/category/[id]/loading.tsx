import React from "react";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs Skeleton */}
        <div className="h-4 w-48 bg-neutral-900 rounded"></div>

        {/* Header Skeleton */}
        <div className="relative rounded-3xl border border-white/5 bg-neutral-900/30 p-8 sm:p-12 md:p-16 min-h-[300px] flex flex-col justify-end space-y-4">
          <div className="h-4 w-24 bg-neutral-800 rounded"></div>
          <div className="h-10 w-2/3 sm:w-1/2 bg-neutral-800 rounded"></div>
          <div className="h-4 w-full sm:w-3/4 bg-neutral-800 rounded"></div>
          <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
        </div>

        {/* Subcategories list skeleton */}
        <div className="space-y-16">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-8">
              {/* Subcategory title skeleton */}
              <div className="border-b border-white/5 pb-4 space-y-2">
                <div className="h-8 w-48 bg-neutral-900 rounded"></div>
                <div className="h-4 w-96 bg-neutral-900 rounded"></div>
              </div>

              {/* Products skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="border border-white/5 rounded-2xl bg-neutral-900/50 overflow-hidden flex flex-col h-[340px]">
                    <div className="h-48 w-full bg-neutral-950"></div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-neutral-900 rounded"></div>
                        <div className="h-4 w-full bg-neutral-900 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <div className="h-4 w-16 bg-neutral-900 rounded"></div>
                        <div className="h-4 w-20 bg-neutral-900 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
