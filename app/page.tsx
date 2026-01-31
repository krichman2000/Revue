'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SurveyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    aiLearning: '',
    toolsUsed: '',
    movieIdea: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/food?id=${data.id}`);
      } else {
        alert('Error submitting survey. Please try again.');
      }
    } catch (error) {
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: '8px', color: '#333', textAlign: 'center', fontSize: '28px' }}>
        Revue Studios AI Talk Survey
      </h1>
      <p style={{ marginTop: 0, marginBottom: '30px', color: '#666', textAlign: 'center', fontSize: '16px' }}>
        Please complete by Monday afternoon
      </p>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          <span style={labelTextStyle}>What would you find most valuable to learn about AI?</span>
          <textarea
            style={{ ...inputStyle, minHeight: '100px' }}
            value={formData.aiLearning}
            onChange={(e) => setFormData({ ...formData, aiLearning: e.target.value })}
            required
            placeholder="Share your thoughts..."
          />
        </label>

        <label style={labelStyle}>
          <span style={labelTextStyle}>What tools do you use today?</span>
          <textarea
            style={{ ...inputStyle, minHeight: '100px' }}
            value={formData.toolsUsed}
            onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value })}
            required
            placeholder="List the tools you use..."
          />
        </label>

        <label style={labelStyle}>
          <span style={labelTextStyle}>Name a movie idea you wish to see on screen</span>
          <textarea
            style={{ ...inputStyle, minHeight: '100px' }}
            value={formData.movieIdea}
            onChange={(e) => setFormData({ ...formData, movieIdea: e.target.value })}
            required
            placeholder="Describe your movie idea..."
          />
        </label>

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
            marginTop: '10px',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
