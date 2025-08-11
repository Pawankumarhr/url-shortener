import connectDB from "./db.js";
import Url from "./Url.js";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { originalUrl } = req.body;
    
    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Basic URL validation
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    await connectDB();
    
    // Check if URL already exists
    let existing = await Url.findOne({ originalUrl });
    if (existing) {
      const baseUrl = process.env.BASE_URL || `https://${req.headers.host}`;
      return res.json({ 
        shortUrl: `${baseUrl}/${existing.shortCode}`,
        shortCode: existing.shortCode 
      });
    }

    // Create new short URL
    const shortCode = nanoid(6);
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();
    
    const baseUrl = process.env.BASE_URL || `https://${req.headers.host}`;
    res.json({ 
      shortUrl: `${baseUrl}/${shortCode}`,
      shortCode: shortCode 
    });
    
  } catch (error) {
    console.error("Error in shorten API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
