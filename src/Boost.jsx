import { Button } from "./Button";

export function Boost() {
  return (
    <div className="boost flex-column centered">
      <h2 style={{ color: "white" }} className="font-23">
        Boost your links today
      </h2>
      <Button
        shape="pill"
        variant="primary"
        className=" mt-1 py-1 px-3 font-19"
      >
        <span>Get started</span>
      </Button>
    </div>
  );
}
