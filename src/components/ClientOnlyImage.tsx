"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ClientOnlyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  unoptimized?: boolean;
}

const ClientOnlyImage: React.FC<ClientOnlyImageProps> = ({
  src,
  alt,
  width = 128,
  height = 128,
  className = "",
  unoptimized = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !src || src.trim() === "") {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized}
    />
  );
};

export default ClientOnlyImage;
