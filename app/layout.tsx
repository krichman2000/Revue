import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Survey',
  description: 'Quick survey with AI-generated story',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}>
        <main style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
