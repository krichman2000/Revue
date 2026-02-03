'use client';

import { useState } from 'react';

export default function DevelopmentAssistantPage() {
  const [logline, setLogline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ plotSummary: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/development-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logline }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ plotSummary: data.plotSummary });
      } else {
        setError(data.error || 'Failed to generate plot summary. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setLogline('');
    setResult(null);
    setError(null);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '8px',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '20px',
  };

  const labelTextStyle = {
    fontWeight: 600,
    fontSize: '16px',
    color: '#333',
  };

  if (result) {
    return (
      <div>
        <h1 style={{ marginTop: 0, marginBottom: '8px', color: '#333', textAlign: 'center', fontSize: '28px' }}>
          Development Assistant
        </h1>
        <p style={{ marginTop: 0, marginBottom: '20px', color: '#666', textAlign: 'center', fontSize: '14px' }}>
          Plot & Character Summary
        </p>

        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f0f4f8', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Your Logline
          </h3>
          <p style={{ margin: 0, color: '#555', fontStyle: 'italic' }}>{logline}</p>
        </div>

        <div style={{
          backgroundColor: '#fafafa',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          marginBottom: '20px',
        }}>
          <div style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.7',
            color: '#333',
            fontSize: '15px',
          }}>
            {result.plotSummary}
          </div>
        </div>

        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Develop Another Idea
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: '8px', color: '#333', textAlign: 'center', fontSize: '28px' }}>
        Development Assistant
      </h1>
      <p style={{ marginTop: 0, marginBottom: '30px', color: '#666', textAlign: 'center', fontSize: '16px' }}>
        Enter a logline and get a detailed plot & character summary
      </p>

      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          color: '#b91c1c',
          marginBottom: '20px',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Logline</span>
          <textarea
            style={{ ...inputStyle, minHeight: '120px' }}
            value={logline}
            onChange={(e) => setLogline(e.target.value)}
            required
            placeholder="Enter your movie logline... (e.g., 'A washed-up musician forms an unlikely bond with a young prodigy while hiding from his past in a small coastal town.')"
          />
        </label>

        <button
          type="submit"
          disabled={isGenerating}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor: isGenerating ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            marginTop: '10px',
          }}
        >
          {isGenerating ? 'Generating Plot Summary...' : 'Generate Plot & Character Summary'}
        </button>
      </form>

      {isGenerating && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px', fontSize: '14px' }}>
          Our development team is crafting your story... This may take a moment.
        </p>
      )}
    </div>
  );
}
