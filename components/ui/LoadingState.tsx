export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid place-items-center py-24" role="status">
      <p className="kicker">{label}</p>
    </div>
  );
}
