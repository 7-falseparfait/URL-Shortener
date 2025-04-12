import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./Button";

export function Header({ menuOpen, setMenuOpen }) {
  const menu = ["Features", "Pricing", "Resources", "Login"];
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="flex space-btw centered  py-1 mx-1 header">
      <img src="/images/logo.svg" alt="Logo" />
      <button
        onClick={toggleMenu}
        value={menuOpen}
        className="bg-none border-none harmbugger"
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "#9c9ba3", fontSize: "27px" }}
        />
      </button>
      {menuOpen && (
        <div className="mobile-menu pd-3">
          {menu.map((item, i) => (
            <h2
              key={i}
              className={` menu-items pointer ${
                i === menu.length - 1 ? "mt-2 pt-2 login" : "mb-2"
              }`}
            >
              {item}
            </h2>
          ))}
          <Button
            shape="pill"
            variant="primary"
            className="mt-1 py-1 px-2 font-19 text-white w-full "
          >
            {" "}
            Sign Up
          </Button>
        </div>
      )}
      <div className="desktop-menu centered space-btw">
        <div className="left flex centered gap-2">
          {menu.slice(0, 3).map((item, i) => (
            <p className="pointer" key={i}>
              {item}
            </p>
          ))}
        </div>
        <div className="right flex gap-1 centered">
          {menu.slice(3, 4).map((item, i) => (
            <p className="pointer" key={i}>
              {item}
            </p>
          ))}
          <Button className="text-white py-05 px-2 btn-pill">Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
