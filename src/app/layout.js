import { ClerkProvider } from "@clerk/nextjs/dist/types/components.server";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: " %s | Practice Nextjs",
    default: "Practice Nextjs",
  },
  description: "Fastest Learning Methods.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>
          {children}
          </main>
          </body>
      </html>
    </ClerkProvider>
  );
}
