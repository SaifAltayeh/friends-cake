export type CakePose = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  idle: number;
  opacity: number;
};

export const MODEL_PATH = "/models/friends-cake.glb";
export const CAKE_TARGET_HEIGHT = 0.92;
export const CAKE_CAMERA = { x: 0, y: 0.62, z: 4.45, fov: 30 };

export function desktopHeroPose(): CakePose {
  return {
    x: 1.52,
    y: -0.38,
    z: 0.1,
    rotX: 0.06,
    rotY: 0.4,
    rotZ: 0,
    scale: 0.86,
    idle: 1,
    opacity: 1,
  };
}

export function mobileHeroPose(): CakePose {
  return {
    x: 0,
    y: -0.32,
    z: 0.08,
    rotX: 0.05,
    rotY: 0.32,
    rotZ: 0,
    scale: 0.64,
    idle: 0.85,
    opacity: 1,
  };
}

export function desktopQuotePose(): CakePose {
  return {
    x: 0.32,
    y: -0.04,
    z: 0.1,
    rotX: 0.05,
    rotY: 1.1,
    rotZ: 0,
    scale: 0.72,
    idle: 0.4,
    opacity: 1,
  };
}

export function desktopCategoriesApproachPose(): CakePose {
  return {
    x: -0.28,
    y: -0.08,
    z: 0.1,
    rotX: 0.04,
    rotY: 1.35,
    rotZ: 0,
    scale: 0.6,
    idle: 0.32,
    opacity: 1,
  };
}

export function desktopCategoriesEnterPose(): CakePose {
  return {
    x: -1.15,
    y: -0.1,
    z: 0.1,
    rotX: 0.04,
    rotY: 1.7,
    rotZ: 0,
    scale: 0.5,
    idle: 0.26,
    opacity: 1,
  };
}

export function desktopCategoriesMidPose(): CakePose {
  return {
    x: -1.15,
    y: -0.16,
    z: 0.1,
    rotX: 0.04,
    rotY: 2.05,
    rotZ: 0,
    scale: 0.48,
    idle: 0.24,
    opacity: 1,
  };
}

export function desktopCategoriesExitPose(): CakePose {
  return {
    x: -1.15,
    y: -0.24,
    z: 0.1,
    rotX: 0.05,
    rotY: 2.35,
    rotZ: 0,
    scale: 0.46,
    idle: 0.22,
    opacity: 1,
  };
}

export function offscreenLeftPose(from: CakePose): CakePose {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fov = (CAKE_CAMERA.fov * Math.PI) / 180;
  const visH = 2 * CAKE_CAMERA.z * Math.tan(fov / 2);
  const visW = visH * (vw / vh);
  const margin = CAKE_TARGET_HEIGHT * from.scale * 0.75 + 0.5;
  return {
    ...from,
    x: -(visW / 2) - margin,
    idle: 0.08,
    opacity: 1,
  };
}

export function desktopBridgePose(): CakePose {
  return {
    x: -0.52,
    y: -0.1,
    z: 0.08,
    rotX: 0.05,
    rotY: 2.7,
    rotZ: 0,
    scale: 0.44,
    idle: 0.2,
    opacity: 1,
  };
}

export function desktopCrossPose(): CakePose {
  return {
    x: 0.38,
    y: -0.08,
    z: 0.08,
    rotX: 0.05,
    rotY: 3.1,
    rotZ: 0,
    scale: 0.44,
    idle: 0.18,
    opacity: 1,
  };
}

export function desktopFeaturedPose(): CakePose {
  return {
    x: 1.42,
    y: -0.06,
    z: 0.1,
    rotX: 0.06,
    rotY: 3.5,
    rotZ: 0,
    scale: 0.44,
    idle: 0.16,
    opacity: 1,
  };
}

export function desktopPromoPose(): CakePose {
  return {
    x: 0.16,
    y: -0.08,
    z: 0.08,
    rotX: 0.05,
    rotY: 4.15,
    rotZ: 0,
    scale: 0.5,
    idle: 0.22,
    opacity: 1,
  };
}

export function mobileQuotePose(): CakePose {
  return {
    x: 0,
    y: 0.02,
    z: 0.08,
    rotX: 0.04,
    rotY: 0.72,
    rotZ: 0,
    scale: 0.52,
    idle: 0.38,
    opacity: 1,
  };
}

export function mobileCategoriesApproachPose(): CakePose {
  return {
    x: -0.18,
    y: -0.06,
    z: 0.08,
    rotX: 0.04,
    rotY: 0.88,
    rotZ: 0,
    scale: 0.46,
    idle: 0.3,
    opacity: 1,
  };
}

export function mobileMidEnterPose(): CakePose {
  return {
    x: -0.55,
    y: -0.08,
    z: 0.08,
    rotX: 0.04,
    rotY: 1.05,
    rotZ: 0,
    scale: 0.4,
    idle: 0.24,
    opacity: 1,
  };
}

export function mobileMidExitPose(): CakePose {
  return {
    x: -0.78,
    y: -0.36,
    z: 0.08,
    rotX: 0.04,
    rotY: 1.4,
    rotZ: 0,
    scale: 0.38,
    idle: 0.24,
    opacity: 1,
  };
}

export function mobileFeaturedPose(): CakePose {
  return {
    x: 0,
    y: -0.06,
    z: 0.06,
    rotX: 0.05,
    rotY: 1.85,
    rotZ: 0,
    scale: 0.38,
    idle: 0.16,
    opacity: 1,
  };
}

export function alignRotY(from: number, to: number) {
  const tau = Math.PI * 2;
  const delta = ((to - from) % tau + tau) % tau;
  return from + (delta > Math.PI ? delta - tau : delta);
}

export function mixPose(from: CakePose, to: CakePose, amount: number): CakePose {
  const t = Math.min(1, Math.max(0, amount));
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
    z: from.z + (to.z - from.z) * t,
    rotX: from.rotX + (to.rotX - from.rotX) * t,
    rotY: from.rotY + (alignRotY(from.rotY, to.rotY) - from.rotY) * t,
    rotZ: from.rotZ + (to.rotZ - from.rotZ) * t,
    scale: from.scale + (to.scale - from.scale) * t,
    idle: from.idle + (to.idle - from.idle) * t,
    opacity: from.opacity + (to.opacity - from.opacity) * t,
  };
}

export function poseFromProductStage(
  rect: DOMRect,
  options?: { fill?: number; maxScale?: number },
): CakePose {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fill = options?.fill ?? 0.4;
  const maxScale = options?.maxScale ?? 0.3;
  const padX = rect.width * 0.16;
  const padTop = rect.height * 0.16;
  const padBottom = rect.height * 0.16;
  const innerW = Math.max(1, rect.width - padX * 2);
  const innerH = Math.max(1, rect.height - padTop - padBottom);
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + padTop + innerH * 0.52;
  const ndcX = (cx / vw) * 2 - 1;
  const ndcY = -((cy / vh) * 2 - 1);
  const fov = (CAKE_CAMERA.fov * Math.PI) / 180;
  const visH = 2 * CAKE_CAMERA.z * Math.tan(fov / 2);
  const visW = visH * (vw / vh);
  const worldH = (innerH / vh) * visH;
  const worldW = (innerW / vw) * visW;
  const fit = Math.min(worldW, worldH);
  const scale = Math.max(0.16, Math.min(maxScale, (fit * fill) / CAKE_TARGET_HEIGHT));
  const yCenter = ndcY * (visH / 2);
  return {
    x: ndcX * (visW / 2),
    y: yCenter - (CAKE_TARGET_HEIGHT * scale) * 0.38,
    z: -0.06,
    rotX: 0.04,
    rotY: 0.4,
    rotZ: 0,
    scale,
    idle: 0.28,
    opacity: 1,
  };
}
