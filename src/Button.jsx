export function Button({
  children,
  shape = "rounded",
  variant = "primary",
  className = "",
  onClick,
}) {
  const shapeClass = shape === "pill" ? "btn-pill" : "btn-rounded";
  const variantClass = `btn-${variant}`;
  return (
    <button
      className={`btn ${shapeClass} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
