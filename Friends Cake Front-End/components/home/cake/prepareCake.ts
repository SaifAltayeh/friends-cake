import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const HIDDEN = /studio_floor|cake_product_camera|large_soft_key|soft_fill|warm_rim|web_sun/i;
const STAGE = /env_floor|studio.?floor|warm.?studio.?floor/i;
const CRUMB = /crumb/i;

function prepareMaterial(material: THREE.Material) {
  const pbr = material as THREE.MeshStandardMaterial;
  if ("envMapIntensity" in pbr) pbr.envMapIntensity = 0.55;
  pbr.needsUpdate = true;
}

export function prepareCakeScene(
  scene: THREE.Object3D,
  targetHeight: number,
  options?: { hideStage?: boolean },
) {
  const clone = scene.clone(true);
  clone.updateMatrixWorld(true);

  const crumbBuckets = new Map<
    THREE.Material,
    { geometries: THREE.BufferGeometry[]; meshes: THREE.Mesh[] }
  >();
  const detach: THREE.Object3D[] = [];

  const isStage = (obj: THREE.Object3D) => {
    if (HIDDEN.test(obj.name)) return true;
    if (!options?.hideStage) return false;
    if (STAGE.test(obj.name)) return true;
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return false;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    return materials.some((material) => material && STAGE.test(material.name));
  };

  clone.traverse((obj) => {
    if (isStage(obj)) {
      detach.push(obj);
      return;
    }
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.frustumCulled = true;
    const material = mesh.material;
    if (Array.isArray(material)) material.forEach(prepareMaterial);
    else if (material) prepareMaterial(material);

    if (CRUMB.test(mesh.name) && mesh.geometry && !Array.isArray(mesh.material)) {
      const geometry = mesh.geometry.clone();
      geometry.applyMatrix4(mesh.matrixWorld);
      const bucket = crumbBuckets.get(mesh.material) ?? { geometries: [], meshes: [] };
      bucket.geometries.push(geometry);
      bucket.meshes.push(mesh);
      crumbBuckets.set(mesh.material, bucket);
    }
  });

  detach.forEach((obj) => obj.parent?.remove(obj));
  clone.updateMatrixWorld(true);

  const box = new THREE.Box3();
  clone.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || CRUMB.test(mesh.name)) return;
    box.expandByObject(mesh);
  });
  if (box.isEmpty()) box.setFromObject(clone);

  crumbBuckets.forEach(({ geometries, meshes }, material) => {
    try {
      const merged = mergeGeometries(geometries, false);
      geometries.forEach((geometry) => geometry.dispose());
      if (!merged) return;
      meshes.forEach((mesh) => mesh.parent?.remove(mesh));
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = "crumbs";
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      clone.add(mesh);
    } catch {
      geometries.forEach((geometry) => geometry.dispose());
    }
  });

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  clone.position.x -= center.x;
  clone.position.z -= center.z;
  clone.position.y -= box.min.y;
  clone.scale.setScalar(targetHeight / (size.y || 1));
  return clone;
}
