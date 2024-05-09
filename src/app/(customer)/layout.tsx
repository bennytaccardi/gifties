import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="p-2 flex">
        <Button asChild className="ml-auto">
          <Link href="/dashboard">Sei un business? Clicca qui!</Link>
        </Button>
      </header>
      {children}
    </>
  );
}
