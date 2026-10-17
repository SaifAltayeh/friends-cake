export function CakeLights() {
  return (
    <>
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#f8f5ef", "#071b43", 0.55]} />
      <directionalLight position={[4.2, 6.4, 3.2]} intensity={1.35} color="#fff6ea" />
      <directionalLight position={[-3.6, 2.4, -1.4]} intensity={0.4} color="#c9d4e5" />
      <directionalLight position={[-1.5, 3.8, -4.2]} intensity={0.55} color="#fff3d6" />
    </>
  );
}
