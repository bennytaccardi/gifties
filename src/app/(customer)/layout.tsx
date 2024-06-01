import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
      <header className="sticky p-2 flex">
        <Button asChild className="ml-auto">
          <Link href="/dashboard">Sei un business? Clicca qui!</Link>
        </Button>
      </header>
      {children}
    </div>
  );
}
