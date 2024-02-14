export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">{children}</div>
  );
}
