'use client';

import React, { useState } from 'react';

export default function DemoPage() {
  const [personName, setPersonName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError('');
    setBio('');

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personName: personName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate bio');
      }

      setBio(data.bio);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Meeting Prep Assistant</h1>
          <p style={styles.subtitle}>
            Enter a person&apos;s name to generate a comprehensive bio, background research, and thoughtful gift recommendations.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="personName" style={styles.label}>
              Person&apos;s Name
            </label>
            <input
              id="personName"
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="e.g., Satya Nadella, Oprah Winfrey, Elon Musk..."
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? (
              <span style={styles.loadingText}>
                <span style={styles.spinner}></span>
                Researching...
              </span>
            ) : (
              'Generate Bio & Gift Ideas'
            )}
          </button>
        </form>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {bio && (
          <div style={styles.resultContainer}>
            <h2 style={styles.resultTitle}>Results for {personName}</h2>
            <div style={styles.bioContent}>
              {bio.split('\n').map((line, index) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h3 key={index} style={styles.sectionHeader}>
                      {line.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (line.startsWith('**Gift')) {
                  return (
                    <h4 key={index} style={styles.giftHeader}>
                      {line.replace(/\*\*/g, '')}
                    </h4>
                  );
                }
                if (line.startsWith('---')) {
                  return <hr key={index} style={styles.divider} />;
                }
                if (line.startsWith('- ')) {
                  return (
                    <p key={index} style={styles.listItem}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} style={styles.paragraph}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '12px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  form: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '16px',
    fontSize: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '16px',
    color: '#dc2626',
    marginBottom: '24px',
    textAlign: 'center',
  },
  resultContainer: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
  },
  resultTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '2px solid #e5e7eb',
  },
  bioContent: {
    color: '#374151',
    lineHeight: 1.7,
  },
  sectionHeader: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#667eea',
    marginTop: '24px',
    marginBottom: '12px',
  },
  giftHeader: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#764ba2',
    marginTop: '20px',
    marginBottom: '8px',
  },
  divider: {
    border: 'none',
    borderTop: '2px solid #e5e7eb',
    margin: '32px 0',
  },
  listItem: {
    paddingLeft: '16px',
    marginBottom: '8px',
    position: 'relative',
  },
  paragraph: {
    marginBottom: '12px',
  },
};
