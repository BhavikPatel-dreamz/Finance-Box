"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";

export interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const DEFAULT_PLACEHOLDER_IMAGE = "/media/placeholder.svg";

export function SafeImage({
  src,
  fallbackSrc = DEFAULT_PLACEHOLDER_IMAGE,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const initialSrc = src || fallbackSrc;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || "Image"}
      onError={(e) => {
        if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
        onError?.(e);
      }}
    />
  );
}
