'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function FoodForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');

  const [favoriteFood, setFavoriteFood] = useState('');
  const [favoriteCity, setFavoriteCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [story, setStory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: submissionId,
          favoriteFood,
          favoriteCity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStory(data.story);
      } else {
        setError(data.error || 'Error generating story. Please try again.');
      }
    } catch (err) {
      setError('Error generating story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (story) {
    return (
      <div>
        <h1 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Your Story</h1>
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '24px',
          borderRadius: '8px',
          lineHeight: 1.8,
          fontSize: '16px',
          whiteSpace: 'pre-wrap',
        }}>
          {story}
        </div>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '24px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Take Another Survey
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: '30px', color: '#333' }}>One More Question</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '20px' }}>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#333' }}>
            What is your favorite food?
          </span>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginTop: '8px',
              boxSizing: 'border-box',
            }}
            value={favoriteFood}
            onChange={(e) => setFavoriteFood(e.target.value)}
            required
            placeholder="e.g., Pizza, Sushi, Tacos..."
          />
        </label>

        <label style={{ display: 'block', marginBottom: '20px' }}>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#333' }}>
            What is your favorite city?
          </span>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginTop: '8px',
              boxSizing: 'border-box',
            }}
            value={favoriteCity}
            onChange={(e) => setFavoriteCity(e.target.value)}
            required
            placeholder="e.g., New York, Tokyo, Paris..."
          />
        </label>

        {error && (
          <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor: isSubmitting ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Generating your story...' : 'Submit'}
        </button>
      </form>

      {isSubmitting && (
        <p style={{ marginTop: '16px', color: '#666', textAlign: 'center' }}>
          Please wait while we create a personalized story for you...
        </p>
      )}
    </div>
  );
}

export default function FoodPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FoodForm />
    </Suspense>
  );
}
