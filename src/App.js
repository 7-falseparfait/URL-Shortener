import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Urlcards, setUrlCards] = useState([]);
  const [url, setURL] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const handleShorten = async () => {
    try {
      console.log(url);
      if (!url) throw new Error("Please add a link");
      const response = await fetch("api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(url)}`,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      if (response.ok) setErrMessage("");
      const data = await response.json();
      setUrlCards((prev) => [
        ...prev,
        { originalUrl: url, shortenedUrl: data.result_url },
      ]);
    } catch (e) {
      console.log(e.message);
      if (e.message.includes("API Error")) {
        const message = e.message.split("API Error: ")[1].split(" (")[0];
        console.log(message);
        setErrMessage(message);
      } else setErrMessage(e.message);
    }
  };
  return (
    <div>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero menuOpen={menuOpen} />
      <InputArea
        handleShorten={handleShorten}
        setURL={setURL}
        url={url}
        Urlcards={Urlcards}
        errMessage={errMessage}
      />
      <Boost />
      <Footer />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  const menu = ["Features", "Pricing", "Resources", "Login"];
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="flex space-btw centered  pd-03 mx-1">
      <img src="/images/logo.svg" alt="Logo" />
      <button
        onClick={toggleMenu}
        value={menuOpen}
        className="bg-none border-none"
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "#9c9ba3", fontSize: "27px" }}
        />
      </button>
      {/* Menu (optional): only show if open */}
      {menuOpen && (
        <div className="mobile-menu pd-3">
          {menu.map((item, i) => (
            <h2
              className={` menu-items ${
                i === menu.length - 1 ? "mt-2 pt-2 login" : "mb-2"
              }`}
            >
              {item}
            </h2>
          ))}
          <Button
            shape="pill"
            variant="primary"
            className="mt-1 py-1 px-3 font-19 text-white w-full "
          >
            {" "}
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
function Button({
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

function Hero({ menuOpen }) {
  return (
    <div className="hero-section">
      <div
        className={`hero-img-container mt-1 ${
          menuOpen ? "visibility-hidden" : " "
        }`}
      >
        <img src="/images/illustration-working.svg" alt="" />
      </div>
      <div className="hero-content mt-3 text-center">
        <h2 className="font-38">More than just shorter links</h2>
        <p className="mt-05">
          {" "}
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <Button
          shape="pill"
          variant="primary"
          className="mt-2 py-1 px-3 font-19"
        >
          <span>Get started</span>
        </Button>
      </div>
    </div>
  );
}
function FeatureCard({ image, title, children, isLast }) {
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
function CardUrl({ originalUrl, shortenedUrl, isFirst }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={`card-url mx-2 ${isFirst ? "mt-10" : "mt-2"}`}>
      <p>{originalUrl}</p>
      <p className="mt-05">
        <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
          {shortenedUrl}
        </a>
      </p>
      <div className="flex centered">
        <Button
          className={`mx-1 py-03 font-15 text-white w-full copy-btn ${
            copied ? "copied" : ""
          }`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function InputArea({ handleShorten, setURL, url, Urlcards, errMessage }) {
  console.log(Urlcards);

  const features = [
    {
      image: "/images/icon-brand-recognition.svg",
      title: "Brand Recognition",
      body: "  Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
    },
    {
      image: "/images/icon-detailed-records.svg",
      title: "Detailed Records",
      body: "  Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
    },
    {
      image: "/images/icon-fully-customizable.svg",
      title: "Fully Customizable",
      body: "  Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    },
  ];

  return (
    <div className="features">
      <div className="shorten">
        <input
          type="text"
          onChange={(e) => setURL(e.target.value)}
          value={url}
          placeholder="Shorten a link here..."
          style={{
            color: "black",
            outline: errMessage ? "2px solid var(--red)" : "",
          }}
        />
        <p className="err-msg">{errMessage}</p>
        <Button
          className="px-2 py-05 font-17 w-full mt-09"
          onClick={handleShorten}
        >
          <span>Shorten It!</span>
        </Button>
      </div>
      {Urlcards.map((card, i) => (
        <CardUrl
          key={i}
          originalUrl={card.originalUrl}
          shortenedUrl={card.shortenedUrl}
          isFirst={i === 0}
        />
      ))}
      <div className="text-center mx-2 mt-9">
        <h2 className="mb-1"> Advanced Statistics</h2>
        <p style={{ color: "#a5a3ae" }}>
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>
      <div className="feature-container">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            image={feature.image}
            title={feature.title}
            isLast={index === features.length - 1}
          >
            {feature.body}
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}

function Boost() {
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

function Footer() {
  const footerContent = [
    {
      title: "Features",
      links: ["Link Shortening", "Branded Links", "Analytics"],
    },
    {
      title: "Resources",
      links: ["Blog", "Developers", "Support"],
    },
    {
      title: "Company",
      links: ["About", "Our Team", "Careers", "Contact"],
    },
  ];
  const socialLinks = [
    {
      name: "Facebook",
      icon: "/images/icon-facebook.svg",
      url: "https://www.facebook.com",
    },
    {
      name: "Twitter",
      icon: "/images/icon-twitter.svg",
      url: "https://www.twitter.com",
    },
    {
      name: "Pinterest",
      icon: "/images/icon-pinterest.svg",
      url: "https://www.pinterest.com",
    },
    {
      name: "Instagram",
      icon: "/images/icon-instagram.svg",
      url: "https://www.instagram.com",
    },
  ];

  return (
    <div className="footer">
      <div className="text-center">
        <img className="pt-2" src="/images/logo.svg" alt="Logo" />
        {footerContent.map((section, index) => (
          <div key={index} className="footer-section">
            <h4 className="pb-1 mt-2">{section.title}</h4>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="social-icons flex centered gap-1 mt-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={social.icon} alt={social.name} />
          </a>
        ))}
      </div>
    </div>
  );
}
export default App;
