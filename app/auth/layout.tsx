export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
        {children}
      </div>
    </html>
  );
}
