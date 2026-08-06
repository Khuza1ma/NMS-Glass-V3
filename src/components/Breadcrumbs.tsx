import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-full">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <FiChevronRight className="text-xs text-slate-400 dark:text-neutral-500 shrink-0" />}
            {isLast || !item.href ? (
              <span className="text-slate-900 dark:text-white font-medium truncate max-w-[220px] sm:max-w-none">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[150px] sm:max-w-none">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
