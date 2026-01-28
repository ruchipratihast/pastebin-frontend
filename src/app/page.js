"use client";

import { useState } from "react";
import { createPaste } from "./services/api";

export default function Home() {
  const [content, setContent] = useState("");
  // Split TTL into H, M, S
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [views, setViews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!content.trim()) {
      setError("Please enter some content for your note.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Logic: Convert Hours/Minutes/Seconds -> Total Seconds
      let totalSeconds = 0;
      if (hours) totalSeconds += Number(hours) * 3600;
      if (minutes) totalSeconds += Number(minutes) * 60;
      if (seconds) totalSeconds += Number(seconds);

      // If user inputs nothing for time, we send undefined (let backend decide or use 0 if that's the logic)
      // Assuming existing backend handles undefined as "no limit" or default, or 0.
      // But if user specifically entered 0s, it's 0.
      const ttl_seconds = (hours || minutes || seconds) ? totalSeconds : undefined;

      const payload = {
        content,
        ttl_seconds,
        max_views: views ? Number(views) : undefined,
      };

      const data = await createPaste(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.url) {
      navigator.clipboard.writeText(result.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="container-center">
      <div className="glass-panel">
        <h1 className="title-gradient">Pastebin Lite</h1>
        <p className="subtitle">Share code, notes, and snippets securely in seconds.</p>

        <div className="input-group">
          <label className="label">Your Content</label>
          <textarea
            className="textarea-field"
            placeholder="Type or paste your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Hours</label>
            <input
              type="number"
              min="0"
              className="input-field"
              placeholder="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div className="col">
            <label className="label">Minutes</label>
            <input
              type="number"
              min="0"
              className="input-field"
              placeholder="0"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
          <div className="col">
            <label className="label">Seconds</label>
            <input
              type="number"
              min="0"
              className="input-field"
              placeholder="0"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <small style={{ color: "var(--text-dim)", marginLeft: "4px" }}>
            Leave time fields empty for no time limit.
          </small>
        </div>

        <div className="input-group">
          <label className="label">Max Views (Optional)</label>
          <input
            type="number"
            min="1"
            className="input-field"
            placeholder="e.g. 5"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Secure Paste"}
        </button>

        {error && <div className="error-msg">{error}</div>}

        {result && (
          <div className="result-card">
            <div className="result-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Success! Your paste is ready:
            </div>

            <a href={`/p/${result.id}`} className="result-link">
              {result.url || `${window.location.origin}/p/${result.id}`}
            </a>

            <button
              onClick={copyToClipboard}
              style={{
                marginTop: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--success)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Copy Link
            </button>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        Pastebin Lite &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
