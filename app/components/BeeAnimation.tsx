"use client";

import Lottie from "lottie-react";
import beeAnimation from "@/public/lottie/bee.json";

export default function BeeAnimation() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <div className="absolute top-20 left-0 w-[500] h-[300px] animate-float">
        <Lottie animationData={beeAnimation} loop className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-0 w-[500px] h-[300px] animate-float-reverse">
        <Lottie animationData={beeAnimation} loop className="w-full h-full" />
      </div>
    </div>
  );
}
