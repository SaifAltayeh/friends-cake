"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CakeScene } from "@/components/home/cake/CakeScene";
import { CakeErrorBoundary } from "@/components/home/cake/CakeErrorBoundary";
import {
  CAKE_CAMERA,
  desktopHeroPose,
  desktopQuotePose,
  mixPose,
  mobileHeroFromStage,
  mobileHeroPose,
  mobileQuotePose,
  offscreenLeftPose,
  poseFromProductStage,
  type CakePose,
} from "@/components/home/cake/types";

gsap.registerPlugin(ScrollTrigger);

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function pageY(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function poseAlong(
  position: number,
  frames: Array<[number, CakePose]>,
): CakePose {
  if (position <= frames[0][0]) return frames[0][1];
  const last = frames.length - 1;
  if (position >= frames[last][0]) return frames[last][1];
  let index = 0;
  while (index < last - 1 && position > frames[index + 1][0]) index += 1;
  const [start, from] = frames[index];
  const [end, to] = frames[index + 1];
  return mixPose(from, to, smoothstep((position - start) / Math.max(1, end - start)));
}

function promoPose(rect: DOMRect, isMobile: boolean): CakePose {
  const next = poseFromProductStage(rect, {
    fill: isMobile ? 0.52 : 0.58,
    maxScale: isMobile ? 0.48 : 0.58,
  });
  next.rotY = isMobile ? 2.1 : 3.85;
  next.idle = 0.18;
  next.x += isMobile ? 0.1 : 0.28;
  return next;
}

function desktopTravelPose(
  scrollY: number,
  quote: HTMLElement,
  categories: HTMLElement,
  featured: HTMLElement,
  promo: HTMLElement,
  promoStage: HTMLElement,
  sellers: HTMLElement,
  productStage: HTMLElement,
) {
  const vh = window.innerHeight;
  const quoteY = pageY(quote);
  const catsY = pageY(categories);
  const featuredEnd = pageY(featured) + featured.offsetHeight;
  const promoY = pageY(promo);
  const promoSlot = promoPose(promoStage.getBoundingClientRect(), false);
  const card = poseFromProductStage(productStage.getBoundingClientRect());
  const quotePose = desktopQuotePose();
  const catsOff = offscreenLeftPose(quotePose);
  const afterQuote = quoteY - vh * 0.22;
  const leaveFrom = Math.max(afterQuote + vh * 0.14, catsY - vh * 1.02);
  const goneAt = Math.max(leaveFrom + vh * 0.3, catsY - vh * 0.72);
  const arriveAt = promoY - vh * 0.32;
  const returnStart = Math.min(featuredEnd - vh * 0.42, arriveAt - vh * 0.14);
  const holdAt = Math.max(arriveAt + 48, pageY(sellers) - vh * 0.7);
  return poseAlong(scrollY, [
    [0, desktopHeroPose()],
    [Math.max(0, quoteY - vh * 0.55), desktopHeroPose()],
    [afterQuote, quotePose],
    [leaveFrom, quotePose],
    [goneAt, catsOff],
    [returnStart, catsOff],
    [arriveAt, promoSlot],
    [holdAt, promoSlot],
    [pageY(sellers) - vh * 0.42, { ...card, rotY: 4.15, idle: 0.08 }],
  ]);
}

function mobileTravelPose(
  scrollY: number,
  quote: HTMLElement,
  categories: HTMLElement,
  featured: HTMLElement,
  promo: HTMLElement,
  promoStage: HTMLElement,
  sellers: HTMLElement,
  productStage: HTMLElement,
  heroStage: HTMLElement | null,
) {
  const vh = window.innerHeight;
  const quoteY = pageY(quote);
  const catsY = pageY(categories);
  const featuredEnd = pageY(featured) + featured.offsetHeight;
  const promoY = pageY(promo);
  const promoSlot = promoPose(promoStage.getBoundingClientRect(), true);
  const card = poseFromProductStage(productStage.getBoundingClientRect());
  const start = heroStage
    ? mobileHeroFromStage(heroStage.getBoundingClientRect())
    : mobileHeroPose();
  const quotePose = mobileQuotePose();
  const catsOff = offscreenLeftPose(quotePose);
  const afterQuote = quoteY - vh * 0.2;
  const leaveFrom = Math.max(afterQuote + vh * 0.12, catsY - vh * 1);
  const goneAt = Math.max(leaveFrom + vh * 0.28, catsY - vh * 0.7);
  const arriveAt = promoY - vh * 0.32;
  const returnStart = Math.min(featuredEnd - vh * 0.42, arriveAt - vh * 0.14);
  const holdAt = Math.max(arriveAt + 48, pageY(sellers) - vh * 0.7);
  return poseAlong(scrollY, [
    [0, start],
    [Math.max(0, quoteY - vh * 0.52), start],
    [afterQuote, quotePose],
    [leaveFrom, quotePose],
    [goneAt, catsOff],
    [returnStart, catsOff],
    [arriveAt, promoSlot],
    [holdAt, promoSlot],
    [pageY(sellers) - vh * 0.42, { ...card, rotY: 1.85, idle: 0.08 }],
  ]);
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function FallbackCake() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <div className="absolute right-[8%] top-1/2 hidden h-[70vh] w-[38vw] -translate-y-1/2 lg:block">
        <Image
          src="/images/hero/cake-float.png"
          alt=""
          fill
          className="object-contain"
          sizes="40vw"
        />
      </div>
    </div>
  );
}

export function CakeTheater() {
  const pose = useRef<CakePose>(desktopHeroPose());
  const stage = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    const journey = document.getElementById("cake-journey");
    const quote = document.getElementById("founder-quote");
    const categories = document.getElementById("categories");
    const featured = document.getElementById("new-releases");
    const promo = document.getElementById("promo");
    const section = document.getElementById("best-sellers");
    const productStage = document.getElementById("cake-product-stage");
    const promoStage = document.getElementById("cake-promo-stage");
    const heroStage = document.getElementById("cake-hero-stage");
    const stageEl = stage.current;
    if (
      !journey ||
      !quote ||
      !categories ||
      !featured ||
      !promo ||
      !promoStage ||
      !section ||
      !productStage ||
      !stageEl
    ) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = () => window.innerWidth < 1024;
    const heroPose = () =>
      mobile()
        ? heroStage
          ? mobileHeroFromStage(heroStage.getBoundingClientRect())
          : mobileHeroPose()
        : desktopHeroPose();
    const travelPose = () =>
      mobile()
        ? mobileTravelPose(
            window.scrollY,
            quote,
            categories,
            featured,
            promo,
            promoStage,
            section,
            productStage,
            heroStage,
          )
        : desktopTravelPose(
            window.scrollY,
            quote,
            categories,
            featured,
            promo,
            promoStage,
            section,
            productStage,
          );
    const dockPose = () => poseFromProductStage(productStage.getBoundingClientRect());

    const writePose = (next: CakePose, opacity = next.opacity) => {
      Object.assign(pose.current, { ...next, opacity });
      gsap.set(stageEl, { opacity });
    };

    if (reduced) {
      const snap = () => {
        const top = section.getBoundingClientRect().top;
        writePose(top < window.innerHeight * 0.4 ? dockPose() : heroPose());
      };
      snap();
      window.addEventListener("scroll", snap, { passive: true });
      return () => window.removeEventListener("scroll", snap);
    }

    const update = () => {
      const vh = window.innerHeight;
      const leaveStart = vh * 0.72;
      const lockY = vh * 0.22;
      const sectionTop = section.getBoundingClientRect().top;
      const promoRect = promoStage.getBoundingClientRect();
      const dock = dockPose();

      if (sectionTop > leaveStart) {
        const next = travelPose();
        writePose(next, next.opacity);
        return;
      }

      const from = promoPose(promoRect, mobile());
      from.idle = 0.16;
      dock.rotY = mobile() ? 1.85 : 4.15;
      const enter = smoothstep(
        clamp((leaveStart - sectionTop) / Math.max(1, leaveStart - lockY)),
      );
      writePose(
        {
          ...mixPose(from, dock, enter),
          idle: enter > 0.82 ? 0.05 : from.idle,
          opacity: 1,
        },
        1,
      );
    };

    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.getById("friends-cake-move")?.kill();
    ScrollTrigger.create({
      id: "friends-cake-move",
      trigger: journey,
      start: "top top",
      endTrigger: section,
      end: "bottom top",
      invalidateOnRefresh: true,
      onUpdate: update,
      onRefresh: update,
    });
    update();

    let lastWidth = window.innerWidth;
    const onResize = () => {
      const width = window.innerWidth;
      update();
      if (Math.abs(width - lastWidth) < 2) return;
      lastWidth = width;
      ScrollTrigger.refresh();
    };
    const onLoad = () => {
      update();
      ScrollTrigger.refresh();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      ScrollTrigger.getById("friends-cake-move")?.kill();
    };
  }, [webgl]);

  if (!webgl) return <FallbackCake />;

  return (
    <div
      ref={stage}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    >
      {!ready ? (
        <div className="absolute inset-y-0 right-0 flex w-full items-center justify-center lg:w-[55%]">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
            Preparing the cake
          </p>
        </div>
      ) : null}
      <CakeErrorBoundary fallback={<FallbackCake />}>
        <Suspense fallback={null}>
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.7]}
            camera={{
              position: [CAKE_CAMERA.x, CAKE_CAMERA.y, CAKE_CAMERA.z],
              fov: CAKE_CAMERA.fov,
              near: 0.1,
              far: 40,
            }}
            style={{
              background: "transparent",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              touchAction: "pan-y",
            }}
            onCreated={({ gl, events }) => {
              gl.setClearColor(0x000000, 0);
              gl.domElement.style.pointerEvents = "none";
              gl.domElement.style.touchAction = "pan-y";
              events?.disconnect?.();
              setReady(true);
            }}
          >
            <CakeScene pose={pose} />
          </Canvas>
        </Suspense>
      </CakeErrorBoundary>
    </div>
  );
}
