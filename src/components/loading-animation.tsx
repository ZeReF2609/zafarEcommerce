
"use client";

import Lottie from "lottie-react";
import animationData from "@/lib/lottie/loading.json";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps {
  className?: string;
}

export function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={cn("flex justify-center items-center w-full h-full", className)}>
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-48 h-48"
      />
    </div>
  );
}

const ProductGridLoader = () => (
    <div className="w-full h-96 flex items-center justify-center">
        <LoadingAnimation />
    </div>
)

const ProductCarouselLoader = () => (
     <div className="w-full h-96 flex items-center justify-center">
        <LoadingAnimation />
    </div>
)


export { ProductGridLoader, ProductCarouselLoader };
