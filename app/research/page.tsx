'use client';

import { useState } from 'react';

interface BookResult {
  title: string;
  author: string;
  publisher: string;
  yearPublished: string;
  whyItFits: string;
  salesAndReviews: string;
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<BookResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults([]);
    setSearchedQuery(query);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to research books');
        return;
      }

      setResults(data.books);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearchedQuery('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      color: '#1a1a1a',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '42px',
            fontWeight: 600,
            margin: 0,
            background: 'linear-gradient(135deg, #8b6914 0%, #c9a227 50%, #8b6914 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}>
            Book Research
          </h1>
          <p style={{
            color: '#666',
            marginTop: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.6,
          }}>
            Find books that match your story criteria
          </p>
        </div>

        {error && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#dc2626',
            marginBottom: '24px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {error}
          </div>
        )}

        {/* Search Form */}
        {!results.length && !isSearching && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#666',
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
              }}>
                What kind of stories are you looking for?
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe the subject matter, themes, or criteria... (e.g., 'True crime stories about con artists that would make good limited series' or 'Historical fiction set in Asia with strong female protagonists')"
                required
                style={{
                  width: '100%',
                  minHeight: '150px',
                  padding: '20px',
                  fontSize: '17px',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  resize: 'vertical',
                  lineHeight: 1.7,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                background: isSearching || !query.trim()
                  ? '#ccc'
                  : 'linear-gradient(135deg, #c9a227 0%, #d4af37 100%)',
                color: isSearching || !query.trim() ? '#888' : '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: isSearching || !query.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
              }}
            >
              {isSearching ? 'Researching Books...' : 'Find Books'}
            </button>
          </form>
        )}

        {/* Loading State */}
        {isSearching && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e0e0e0',
              borderTopColor: '#c9a227',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
            }} />
            <p style={{
              color: '#666',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            }}>
              Researching books based on reviews and sales data...
            </p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div style={{
              marginBottom: '24px',
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
            }}>
              <div style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#8b6914',
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Your Search
              </div>
              <p style={{
                margin: 0,
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#1a1a1a',
              }}>
                &ldquo;{searchedQuery}&rdquo;
              </p>
            </div>

            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#666',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {results.length} Books Found
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {results.map((book, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <h3 style={{
                        margin: '0 0 4px 0',
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                      }}>
                        {book.title}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#666',
                      }}>
                        by <strong style={{ color: '#1a1a1a' }}>{book.author}</strong>
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f5f5f7',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#666',
                      fontFamily: 'Inter, sans-serif',
                      whiteSpace: 'nowrap',
                    }}>
                      #{index + 1}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '12px',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    color: '#666',
                  }}>
                    <span><strong>Publisher:</strong> {book.publisher}</span>
                    <span><strong>Year:</strong> {book.yearPublished}</span>
                  </div>

                  <div style={{
                    marginBottom: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#8b6914',
                      marginBottom: '4px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Why It Fits
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      color: '#1a1a1a',
                      lineHeight: 1.6,
                    }}>
                      {book.whyItFits}
                    </p>
                  </div>

                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f0f7f0',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#059669',
                      marginBottom: '4px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Sales & Reviews
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      color: '#1a1a1a',
                      lineHeight: 1.6,
                    }}>
                      {book.salesAndReviews}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '16px',
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#ffffff',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              New Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
