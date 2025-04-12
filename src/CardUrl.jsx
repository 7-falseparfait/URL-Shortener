import { useState } from "react";
import { Button } from "./Button";

export function CardUrl({ originalUrl, shortenedUrl, isFirst }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={`card-url mx-2 ${isFirst ? "mt-10 temp" : "mt-2"}`}>
      <p className="originalUrl">{originalUrl}</p>
      <div className="shortlink-container">
        <p className="mt-05 shortlink">
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </p>
        <div className="flex centered copy-btn-container">
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
    </div>
  );
}
