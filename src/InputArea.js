import { Button } from "./Button";
import { CardUrl } from "./CardUrl";
import { FeatureCard } from "./FeatureCard";

export function InputArea({
  handleShorten,
  setURL,
  url,
  Urlcards,
  errMessage,
}) {
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
        <p className={`err-msg ${errMessage ? "" : "hidden"}`}>{errMessage}</p>
        <Button
          className="px-2 py-05 font-17 w-full mt-09 shorten-btn"
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
      <div className="text-center statistics mx-2 mt-9">
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
