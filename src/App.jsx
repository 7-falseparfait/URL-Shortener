import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { InputArea } from "./InputArea";
import { Boost } from "./Boost";
import { Footer } from "./Footer";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Urlcards, setUrlCards] = useState([]);
  const [url, setURL] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const handleShorten = async () => {
    try {
      console.log(url);
      if (!url) throw new Error("Please add a link");
      const response = await fetch("/API/shorten.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        let message = "Something went wrong";

        try {
          const errorData = await response.json();
          message = errorData.error || message;
        } catch {
          message = "No response body or not valid JSON";
        }

        throw new Error(message);
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
      } else if (e.message.includes("Unexpected token")) {
        const message = "Poor or no Internet Connection 📡";
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

export default App;
