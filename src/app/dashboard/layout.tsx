import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-end p-4">
        <UserButton afterSignOutUrl="/" />
      </header>
      {children}
    </>
  );
}
