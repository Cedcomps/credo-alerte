import '../app/globals.css';
import { Inter as FontSans, Inter } from "next/font/google"
import { ThemeProvider } from '@/components/ThemeProvider';

 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Credo Alerte",
  description: "The fastest way to send emergency notification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://credo-innovation.ca"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Crédo Innovation Inc.
            </a>
          </p>
        </footer>
          </ThemeProvider>
      </body>
    </html>
  );
}
