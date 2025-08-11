import connectDB from "../api/db.js";
import Url from "../api/Url.js";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { shortCode } = req.query;
    
    if (!shortCode) {
      return res.status(400).json({ error: "Short code is required" });
    }

    await connectDB();
    const found = await Url.findOne({ shortCode });
    
    if (!found) {
      return res.status(404).send("URL not found");
    }
    
    // Redirect to the original URL
    res.writeHead(302, { Location: found.originalUrl });
    res.end();
    
  } catch (error) {
    console.error("Error in redirect API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
