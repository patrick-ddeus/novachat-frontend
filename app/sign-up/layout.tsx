export const metadata = {
  title: 'Sign Uo',
  description: 'Sign Up to your account',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
