export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our homepage, connect to people, start a chat',
};

export default function HomeLayout({
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
