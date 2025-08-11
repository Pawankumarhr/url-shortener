import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ originalUrl: url })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }
      
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "50px", 
      textAlign: "center", 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#333", marginBottom: "30px" }}>
        🔗 Simple URL Shortener
      </h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a long URL (e.g., https://example.com)"
            required
            style={{ 
              width: "100%", 
              maxWidth: "400px",
              padding: "12px", 
              fontSize: "16px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              outline: "none"
            }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <div style={{ 
          backgroundColor: "#ffe6e6", 
          color: "#d00", 
          padding: "15px", 
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #ffcccc"
        }}>
          Error: {error}
        </div>
      )}

      {shortUrl && (
        <div style={{ 
          backgroundColor: "#e6ffe6", 
          padding: "20px", 
          borderRadius: "8px",
          border: "1px solid #ccffcc"
        }}>
          <h3 style={{ color: "#333", marginBottom: "10px" }}>
            ✅ URL Shortened Successfully!
          </h3>
          <p style={{ marginBottom: "10px", color: "#666" }}>
            Short URL:
          </p>
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              color: "#007bff", 
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            {shortUrl}
          </a>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              📋 Copy to Clipboard
            </button>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: "40px", color: "#666", fontSize: "14px" }}>
        <p>Enter any valid URL and get a shortened version instantly!</p>
        <p>Click on the shortened URL to test the redirect.</p>
      </div>
    </div>
  );
}

export default App
