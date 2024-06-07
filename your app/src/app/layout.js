import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";

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
    <html lang="en">
      <ClerkProvider
            appearance={{
              baseTheme: dark
            }}
      >
        <body className={inter.className}>
          <header>
            <SignedOut>
              <SignInButton
              />
            </SignedOut>
            <SignedIn>
              <UserButton appearance={''} />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
