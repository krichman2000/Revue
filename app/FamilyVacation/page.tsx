'use client';

import { useState } from 'react';

export default function FamilyVacationPage() {
  const [name, setName] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [scaredOf, setScaredOf] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStory('');

    try {
      const response = await fetch('/api/family-vacation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          favoriteMovie,
          scaredOf,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story');
      }

      setStory(data.story);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Family Vacation Story Generator</h1>
        <p style={styles.subtitle}>
          Create a personalized story featuring you, Amy & Marvin from Scottsdale!
        </p>
        <div style={styles.badge}>
          Featuring Amy (retired teacher) & Marvin (real estate developer) - married 58 years!
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="name">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="favoriteMovie">
            Your Favorite Movie
          </label>
          <input
            id="favoriteMovie"
            type="text"
            value={favoriteMovie}
            onChange={(e) => setFavoriteMovie(e.target.value)}
            placeholder="e.g., The Princess Bride, Jurassic Park"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="scaredOf">
            What Are You Scared Of?
          </label>
          <input
            id="scaredOf"
            type="text"
            value={scaredOf}
            onChange={(e) => setScaredOf(e.target.value)}
            placeholder="e.g., spiders, heights, public speaking"
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? (
            <span style={styles.loadingText}>
              <span style={styles.spinner}></span>
              Creating Your Story...
            </span>
          ) : (
            'Generate My Family Story'
          )}
        </button>
      </form>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {story && (
        <div style={styles.storyContainer}>
          <h2 style={styles.storyTitle}>Your Family Vacation Story</h2>
          <div style={styles.storyMeta}>
            Starring: <strong>{name}</strong>, <strong>Amy & Marvin</strong> |
            Movie: <strong>{favoriteMovie}</strong> |
            Fear: <strong>{scaredOf}</strong>
          </div>
          <div style={styles.story}>
            {story.split('\n').map((paragraph, index) => (
              <p key={index} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Amy and Marvin have been creating memories in Scottsdale for decades.
          Now it&apos;s your turn to join their story!
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 12px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    margin: '0 0 16px 0',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    backdropFilter: 'blur(10px)',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto 32px',
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '2px solid #E5E7EB',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
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
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    maxWidth: '500px',
    margin: '0 auto 24px',
    padding: '16px',
    background: '#FEE2E2',
    color: '#DC2626',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '500',
  },
  storyContainer: {
    maxWidth: '700px',
    margin: '0 auto 40px',
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  storyTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 12px 0',
    textAlign: 'center',
  },
  storyMeta: {
    fontSize: '13px',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #E5E7EB',
  },
  story: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#374151',
  },
  paragraph: {
    marginBottom: '16px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    maxWidth: '400px',
    margin: '0 auto',
  },
};
