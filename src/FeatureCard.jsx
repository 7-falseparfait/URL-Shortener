export function FeatureCard({ image, title, children, isLast }) {
  return (
    <>
      <div className="feature-card text-center">
        <div className="feature-img">
          <img src={image} alt={title} />
        </div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>

      {!isLast && <div className="yo"></div>}
    </>
  );
}
