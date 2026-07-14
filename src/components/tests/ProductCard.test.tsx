import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { Product } from "@/lib/types";

// Mock next/image since Next.js image component requires server environment config
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} data-testid="mock-img" />;
  },
}));

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: "test-product",
    name: "Test Aluminum Window",
    description: "This is a premium mock product for testing.",
    images: ["/test-image.jpg"],
    features: ["Feature 1", "Feature 2"],
    specs: {
      Material: "Premium Aluminum",
    },
  };

  it("renders product name and description correctly", () => {
    render(<ProductCard product={mockProduct} categoryId="aluminum" />);

    expect(screen.getByText("Test Aluminum Window")).toBeDefined();
    expect(screen.getByText("This is a premium mock product for testing.")).toBeDefined();
  });

  it("renders correct detail link with category and product IDs", () => {
    render(<ProductCard product={mockProduct} categoryId="aluminum" />);

    const link = screen.getByRole("link", { name: /view details/i }) as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("/category/aluminum/test-product");
  });
});
