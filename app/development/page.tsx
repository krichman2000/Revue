'use client';

import { useState, useRef, useEffect } from 'react';
import './styles.css';

const FORMATS = [
  { value: 'movie', label: 'Movie' },
  { value: 'series', label: 'Series' },
];

const PLATFORMS = [
  { value: 'theatrical', label: 'Theatrical' },
  { value: 'netflix', label: 'Netflix' },
  { value: 'hbomax', label: 'Max (HBO)' },
  { value: 'disneyplus', label: 'Disney+' },
  { value: 'paramountplus', label: 'Paramount+' },
  { value: 'other', label: 'Other' },
];

const BUDGETS = [
  { value: 'micro', label: '$1-5M', description: 'Contained locations, small cast, indie sensibility' },
  { value: 'low', label: '$5-15M', description: 'Limited locations, focused story, character-driven' },
  { value: 'moderate', label: '$15-35M', description: 'Moderate scope, some set pieces, rising star attachment' },
  { value: 'mid', label: '$35-55M', description: 'Solid scope, name talent possible, genre flexibility' },
  { value: 'high', label: '$55-100M', description: 'Significant scope, A-list talent, major production value' },
  { value: 'tentpole', label: '$100M+', description: 'Franchise potential, global scale, major VFX/action' },
];

const EXAMPLE_LOGLINES = [
  {
    genre: 'Thriller',
    logline: 'A submarine captain discovers her first officer is a spy minutes before they receive orders to launch nuclear missiles, forcing her to stop him while maintaining the illusion of command.',
  },
  {
    genre: 'Comedy',
    logline: 'A recently divorced dad must coach his daughter\'s elite travel soccer team despite knowing nothing about the sport, accidentally leading them to the state championship through unconventional methods.',
  },
  {
    genre: 'Drama',
    logline: 'In 1962 Mississippi, a Black doctor secretly treats white patients during a polio outbreak, forming an unlikely alliance with a segregationist mayor whose son\'s life he saves.',
  },
  {
    genre: 'Genre Mashup',
    logline: 'A disgraced samurai fleeing 1870s Japan ends up in the American Wild West, where he must protect a frontier town from outlaws using a code of honor no one understands.',
  },
];

type ActiveSection = 'pitch' | 'outline' | 'casting' | 'opening';

export default function DevelopmentAssistantPage() {
  const [logline, setLogline] = useState('');
  const [format, setFormat] = useState('movie');
  const [platform, setPlatform] = useState('netflix');
  const [budget, setBudget] = useState('mid');
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullContent, setFullContent] = useState('');
  const [activeSection, setActiveSection] = useState<ActiveSection>('pitch');
  const [error, setError] = useState<string | null>(null);

  // Executive research
  const [executiveName, setExecutiveName] = useState('');
  const [executiveProfile, setExecutiveProfile] = useState('');
  const [isResearchingExecutive, setIsResearchingExecutive] = useState(false);

  // Additional content sections
  const [outlineContent, setOutlineContent] = useState('');
  const [castingContent, setCastingContent] = useState('');
  const [openingContent, setOpeningContent] = useState('');
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isGeneratingCasting, setIsGeneratingCasting] = useState(false);
  const [isGeneratingOpening, setIsGeneratingOpening] = useState(false);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [fullContent, outlineContent, castingContent, openingContent]);

  const getFormatLabel = () => FORMATS.find(f => f.value === format)?.label || format;
  const getPlatformLabel = () => PLATFORMS.find(p => p.value === platform)?.label || platform;
  const getBudgetLabel = () => BUDGETS.find(b => b.value === budget)?.label || budget;

  const handleResearchExecutive = async () => {
    if (!executiveName.trim()) return;

    setIsResearchingExecutive(true);
    setError(null);
    setExecutiveProfile('');

    try {
      const response = await fetch('/api/development-assistant/executive-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executiveName, platform: getPlatformLabel() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to research executive');
        return;
      }

      setExecutiveProfile(data.executiveProfile);
    } catch {
      setError('Failed to research executive');
    } finally {
      setIsResearchingExecutive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logline.trim()) return;

    setIsGenerating(true);
    setError(null);
    setFullContent('');
    setOutlineContent('');
    setCastingContent('');
    setOpeningContent('');
    setPosterUrl(null);
    setActiveSection('pitch');

    try {
      const response = await fetch('/api/development-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logline,
          format,
          platform,
          budget,
          executiveName: executiveName.trim() || undefined,
          executiveProfile: executiveProfile || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate. Please try again.');
        return;
      }

      setFullContent(data.plotSummary);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: typeof EXAMPLE_LOGLINES[0]) => {
    setLogline(example.logline);
  };

  const generateSection = async (
    section: 'outline' | 'casting' | 'opening',
    endpoint: string,
    setContent: (content: string) => void,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    setContent('');
    setActiveSection(section);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logline, plotSummary: fullContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `Failed to generate ${section}`);
        return;
      }

      // Handle different response keys based on endpoint
      const content = data.outline || data.casting || data.opening;
      setContent(content);
    } catch {
      setError(`Failed to generate ${section}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Development Package - ${logline.slice(0, 40)}...</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');

            * { box-sizing: border-box; }

            body {
              font-family: 'Inter', -apple-system, sans-serif;
              max-width: 8.5in;
              margin: 0 auto;
              padding: 0.75in;
              line-height: 1.6;
              color: #1a1a1a;
              font-size: 11pt;
            }

            .cover {
              text-align: center;
              padding: 2in 0;
              page-break-after: always;
            }

            .cover h1 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 32pt;
              margin: 0 0 0.3in 0;
              letter-spacing: -1px;
            }

            .cover .format-platform {
              font-size: 14pt;
              color: #c9a227;
              margin-bottom: 0.5in;
              text-transform: uppercase;
              letter-spacing: 2px;
            }

            .cover .logline {
              font-size: 14pt;
              font-style: italic;
              color: #444;
              max-width: 5in;
              margin: 0 auto 1in auto;
              line-height: 1.8;
            }

            .cover .meta {
              font-size: 10pt;
              color: #888;
              text-transform: uppercase;
              letter-spacing: 2px;
            }

            h2 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 18pt;
              border-bottom: 2px solid #c9a227;
              padding-bottom: 8px;
              margin-top: 30px;
              color: #1a1a1a;
            }

            h3 {
              font-size: 12pt;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #c9a227;
              margin-top: 24px;
              margin-bottom: 8px;
            }

            .section {
              margin-bottom: 20px;
            }

            .content {
              white-space: pre-wrap;
              font-size: 11pt;
            }

            .page-break {
              page-break-before: always;
            }

            .footer {
              position: fixed;
              bottom: 0.5in;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 9pt;
              color: #888;
            }

            @media print {
              body { padding: 0; }
              .cover { padding: 3in 0; }
            }
          </style>
        </head>
        <body>
          <div class="cover">
            <h1>Development Package</h1>
            <div class="format-platform">${getFormatLabel()} | ${getPlatformLabel()} | ${getBudgetLabel()}</div>
            <div class="logline">"${logline}"</div>
            <div class="meta">Generated by Revue Studios AI</div>
          </div>

          <h2>Development Pitch</h2>
          <div class="content">${fullContent}</div>

          ${outlineContent ? `
            <div class="page-break"></div>
            <h2>Scene-by-Scene Outline</h2>
            <div class="content">${outlineContent}</div>
          ` : ''}

          ${castingContent ? `
            <div class="page-break"></div>
            <h2>Casting Suggestions</h2>
            <div class="content">${castingContent}</div>
          ` : ''}

          ${openingContent ? `
            <div class="page-break"></div>
            <h2>Opening Scene</h2>
            <div class="content" style="font-family: Courier, monospace; font-size: 12pt;">${openingContent}</div>
          ` : ''}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  const handleReset = () => {
    setLogline('');
    setFullContent('');
    setOutlineContent('');
    setCastingContent('');
    setOpeningContent('');
    setError(null);
    setActiveSection('pitch');
    setPosterUrl(null);
    setExecutiveName('');
    setExecutiveProfile('');
  };

  const generatePoster = async () => {
    setIsGeneratingPoster(true);
    setError(null);

    try {
      const response = await fetch('/api/development-assistant/poster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logline, plotSummary: fullContent, format, platform }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate poster');
        return;
      }

      setPosterUrl(data.imageUrl);
    } catch {
      setError('Failed to generate poster');
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const getSectionContent = () => {
    switch (activeSection) {
      case 'pitch':
        return fullContent;
      case 'outline':
        return outlineContent;
      case 'casting':
        return castingContent;
      case 'opening':
        return openingContent;
      default:
        return '';
    }
  };

  const isAnySectionLoading = isGenerating || isGeneratingOutline || isGeneratingCasting || isGeneratingOpening;

  // Results view
  if (fullContent || isGenerating) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        color: '#e5e5e5',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '36px',
              fontWeight: 600,
              margin: 0,
              background: 'linear-gradient(135deg, #c9a227 0%, #f4d03f 50%, #c9a227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}>
              Development Assistant
            </h1>
            <p style={{
              color: '#888',
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              AI-Powered Story Development
            </p>
          </div>

          {/* Logline Display */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a24 0%, #12121a 100%)',
            border: '1px solid #2a2a3a',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <div style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#c9a227',
                fontFamily: 'Inter, sans-serif',
              }}>
                Your Logline
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
              }}>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#2a2a3a',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#c9a227',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {getFormatLabel()}
                </span>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#2a2a3a',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#c9a227',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {getPlatformLabel()}
                </span>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#2a2a3a',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#c9a227',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {getBudgetLabel()}
                </span>
                {executiveName && (
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: '#7c3aed',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    For: {executiveName}
                  </span>
                )}
              </div>
            </div>
            <p style={{
              margin: 0,
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#e5e5e5',
              lineHeight: 1.6,
            }}>
              &ldquo;{logline}&rdquo;
            </p>
          </div>

          {error && (
            <div style={{
              padding: '16px 20px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#f87171',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {error}
            </div>
          )}

          {/* Section Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            {[
              { id: 'pitch', label: 'Pitch', ready: !!fullContent || isGenerating },
              { id: 'outline', label: 'Outline', ready: !!outlineContent, loading: isGeneratingOutline },
              { id: 'casting', label: 'Casting', ready: !!castingContent, loading: isGeneratingCasting },
              { id: 'opening', label: 'Opening Scene', ready: !!openingContent, loading: isGeneratingOpening },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as ActiveSection)}
                disabled={!section.ready && !section.loading}
                style={{
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: activeSection === section.id ? '#c9a227' : 'transparent',
                  color: activeSection === section.id ? '#0a0a0f' : (section.ready || section.loading ? '#e5e5e5' : '#555'),
                  border: `1px solid ${activeSection === section.id ? '#c9a227' : '#3a3a4a'}`,
                  borderRadius: '6px',
                  cursor: section.ready || section.loading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  opacity: section.ready || section.loading ? 1 : 0.5,
                }}
              >
                {section.loading ? 'Generating...' : section.label}
              </button>
            ))}
          </div>


          {/* Content Area */}
          <div
            ref={contentRef}
            className="golden-glow"
            style={{
              backgroundColor: '#12121a',
              border: '1px solid #2a2a3a',
              borderRadius: '12px',
              padding: '32px',
              minHeight: '400px',
              maxHeight: '60vh',
              overflowY: 'auto',
              marginBottom: '24px',
            }}
          >
            {isAnySectionLoading && !getSectionContent() ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div className="spinner" />
                <p style={{
                  color: '#888',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                }}>
                  {isGenerating ? 'Developing your story...' : 'Generating content...'}
                </p>
              </div>
            ) : (
              <div
                className={isAnySectionLoading ? 'streaming-text' : ''}
                style={{
                  fontFamily: activeSection === 'opening' ? 'Courier, monospace' : '"Playfair Display", Georgia, serif',
                  fontSize: activeSection === 'opening' ? '14px' : '16px',
                  lineHeight: 1.8,
                  color: '#d5d5d5',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {getSectionContent()}
                {isAnySectionLoading && (
                  <span className="pulse-cursor" />
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {fullContent && !isGenerating && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '16px',
            }}>
              {!outlineContent && (
                <button
                  onClick={() => generateSection('outline', '/api/development-assistant/outline', setOutlineContent, setIsGeneratingOutline)}
                  disabled={isGeneratingOutline}
                  style={{
                    padding: '14px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isGeneratingOutline ? '#2a2a3a' : '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isGeneratingOutline ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isGeneratingOutline ? 'Creating...' : 'Generate Outline'}
                </button>
              )}
              {!castingContent && (
                <button
                  onClick={() => generateSection('casting', '/api/development-assistant/casting', setCastingContent, setIsGeneratingCasting)}
                  disabled={isGeneratingCasting}
                  style={{
                    padding: '14px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isGeneratingCasting ? '#2a2a3a' : '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isGeneratingCasting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isGeneratingCasting ? 'Creating...' : 'Casting Ideas'}
                </button>
              )}
              {!openingContent && (
                <button
                  onClick={() => generateSection('opening', '/api/development-assistant/opening-scene', setOpeningContent, setIsGeneratingOpening)}
                  disabled={isGeneratingOpening}
                  style={{
                    padding: '14px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isGeneratingOpening ? '#2a2a3a' : '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isGeneratingOpening ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isGeneratingOpening ? 'Writing...' : 'Write Opening Scene'}
                </button>
              )}
              <button
                onClick={handleDownloadPDF}
                style={{
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'transparent',
                  color: '#c9a227',
                  border: '1px solid #c9a227',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Download PDF
              </button>
              {!posterUrl && (
                <button
                  onClick={generatePoster}
                  disabled={isGeneratingPoster}
                  style={{
                    padding: '14px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isGeneratingPoster ? '#2a2a3a' : '#e11d48',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isGeneratingPoster ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isGeneratingPoster ? 'Creating Poster...' : 'Generate Poster Art'}
                </button>
              )}
            </div>
          )}

          {/* Poster Display */}
          {posterUrl && (
            <div style={{
              marginBottom: '16px',
              padding: '24px',
              backgroundColor: '#12121a',
              border: '1px solid #2a2a3a',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#c9a227',
                marginBottom: '16px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Poster Concept
              </div>
              <img
                src={posterUrl}
                alt="Generated movie poster concept"
                style={{
                  maxWidth: '300px',
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              />
              <div style={{ marginTop: '16px' }}>
                <a
                  href={posterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#c9a227',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Open Full Size
                </a>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              backgroundColor: '#1a1a24',
              color: '#888',
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Start New Project
          </button>
        </div>
      </div>
    );
  }

  // Input view
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      color: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
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
            Development Assistant
          </h1>
          <p style={{
            color: '#666',
            marginTop: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.6,
          }}>
            Transform your logline into a complete development package
          </p>
        </div>

        {error && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#f87171',
            marginBottom: '24px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {error}
          </div>
        )}

        {/* Executive Research Section */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <label style={{
            display: 'block',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#8b6914',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Pitching to an Executive? (Optional)
          </label>
          <p style={{
            fontSize: '13px',
            color: '#666',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Enter their name to research their preferences and tailor the pitch
          </p>
          <div style={{ display: 'flex', gap: '12px', marginBottom: executiveProfile ? '16px' : '0' }}>
            <input
              type="text"
              value={executiveName}
              onChange={(e) => setExecutiveName(e.target.value)}
              placeholder="e.g., Ted Sarandos, Casey Bloys, Dana Walden..."
              style={{
                flex: 1,
                padding: '14px 16px',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#fafafa',
                color: '#1a1a1a',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <button
              type="button"
              onClick={handleResearchExecutive}
              disabled={isResearchingExecutive || !executiveName.trim()}
              style={{
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                backgroundColor: isResearchingExecutive ? '#ccc' : executiveProfile ? '#059669' : '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isResearchingExecutive || !executiveName.trim() ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {isResearchingExecutive ? 'Researching...' : executiveProfile ? 'Researched ✓' : 'Research'}
            </button>
          </div>
          {executiveProfile && (
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              maxHeight: '200px',
              overflowY: 'auto',
            }}>
              <div style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#8b6914',
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Executive Profile
              </div>
              <div style={{
                fontSize: '13px',
                color: '#555',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {executiveProfile}
              </div>
            </div>
          )}
        </div>

        {/* Example Loglines */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#888',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Try an example
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {EXAMPLE_LOGLINES.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="genre-btn"
              >
                {example.genre}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
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
              Your Logline
            </label>
            <textarea
              value={logline}
              onChange={(e) => setLogline(e.target.value)}
              placeholder="Enter your logline... (e.g., 'A washed-up musician forms an unlikely bond with a young prodigy while hiding from his past in a small coastal town.')"
              required
              style={{
                width: '100%',
                minHeight: '120px',
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

          {/* Format, Platform, and Budget Selectors */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#666',
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Format
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {FORMATS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFormat(f.value)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      backgroundColor: format === f.value ? '#c9a227' : '#ffffff',
                      color: format === f.value ? '#ffffff' : '#666',
                      border: `1px solid ${format === f.value ? '#c9a227' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#666',
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#666',
              marginBottom: '8px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Budget Range
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    backgroundColor: budget === b.value ? '#c9a227' : '#ffffff',
                    color: budget === b.value ? '#ffffff' : '#666',
                    border: `1px solid ${budget === b.value ? '#c9a227' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  title={b.description}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !logline.trim()}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              background: isGenerating || !logline.trim()
                ? '#ccc'
                : 'linear-gradient(135deg, #c9a227 0%, #d4af37 100%)',
              color: isGenerating || !logline.trim() ? '#888' : '#ffffff',
              border: 'none',
              borderRadius: '12px',
              cursor: isGenerating || !logline.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
            }}
          >
            {isGenerating ? 'Developing Your Story...' : 'Develop This Idea'}
          </button>
        </form>

        {/* Features Preview */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#888',
            marginBottom: '16px',
            fontFamily: 'Inter, sans-serif',
          }}>
            What you&apos;ll get
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            color: '#666',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
          }}>
            <span><span style={{ color: '#8b6914' }}>Executive-Tailored Pitch</span></span>
            <span><span style={{ color: '#8b6914' }}>Outline</span></span>
            <span><span style={{ color: '#8b6914' }}>Casting</span></span>
            <span><span style={{ color: '#8b6914' }}>Opening Scene</span></span>
            <span><span style={{ color: '#8b6914' }}>Poster Art</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
