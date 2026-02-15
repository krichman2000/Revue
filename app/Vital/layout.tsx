export default function VitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      backgroundColor: '#F2F0EE',
      zIndex: 1000,
    }}>
      {children}
    </div>
  );
}
