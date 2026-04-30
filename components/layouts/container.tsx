export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto w-full max-w-7xl   sm:px-4 md:px-0 lg:px-0">
      {children}
    </div>
  );
}