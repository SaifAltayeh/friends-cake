"use client";

import { CakeModel } from "@/components/home/cake/CakeModel";
import { CakeLights } from "@/components/home/cake/CakeLights";
import type { CakePose } from "@/components/home/cake/types";

export function CakeScene({ pose }: { pose: React.MutableRefObject<CakePose> }) {
  return (
    <>
      <CakeLights />
      <CakeModel pose={pose} />
    </>
  );
}
