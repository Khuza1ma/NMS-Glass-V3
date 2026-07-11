"use client";

import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
