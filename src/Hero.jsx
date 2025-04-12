import { Button } from "./Button";

export function Hero({ menuOpen }) {
  return (
    <div className="hero-section">
      <div
        className={`hero-img-container mt-1 ${
          menuOpen ? "visibility-hidden" : " "
        }`}
      >
        <img src="/images/illustration-working.svg" alt="" />
      </div>
      <div className="hero-content mt-3 text-center mx-2">
        <h2 className="font-38">More than just shorter links</h2>
        <p className="mt-05">
          {" "}
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <div className="get-started">
          <Button
            shape="pill"
            variant="primary"
            className="mt-2 py-1 px-3 font-19"
          >
            <span>Get started</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
