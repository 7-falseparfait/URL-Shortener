export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    try {
      const response = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(url)}`,
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
