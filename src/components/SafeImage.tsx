"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt = "",
  className,
  fallbackSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  width,
  height,
  fill,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setIsError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  // If neither width/height nor fill is defined, default to fill mode
  const useFill = fill !== undefined ? fill : !width && !height;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={useFill ? undefined : (width as number) || 800}
      height={useFill ? undefined : (height as number) || 600}
      fill={useFill}
      sizes={useFill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
      {...props}
    />
  );
}
