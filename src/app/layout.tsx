import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heyama Objects',
  description: 'Manage your collection of objects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}