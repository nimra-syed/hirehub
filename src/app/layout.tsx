import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "HireHub",
  description: "Week 1 SWE sprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <aside className="w-64 bg-black text-white p-6 space-y-4">
            <h1 className="text-2xl font-bold">HireHub</h1>

            <nav className="flex flex-col gap-1">
              <Link className="rounded-md px-3 py-2 hover:bg-white/10" href="/">
                Home
              </Link>
              <Link
                className="rounded-md px-3 py-2 hover:bg-white/10"
                href="/jobs"
              >
                Jobs
              </Link>
              <Link
                className="rounded-md px-3 py-2 hover:bg-white/10"
                href="/ai-tools"
              >
                AI Tools
              </Link>
              <Link
                className="rounded-md px-3 py-2 hover:bg-white/10"
                href="/settings"
              >
                Settings
              </Link>
              <Link
                className="rounded-md px-3 py-2 hover:bg-white/10"
                href="/applications"
              >
                Applications
              </Link>
            </nav>
          </aside>

          <main className="flex-1 p-10 bg-gray-100">{children}</main>
        </div>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
