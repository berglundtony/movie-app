import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { MovieProvider } from "./providers";



export const metadata: Metadata = {
  title: "The Movies",
  description: "Showing the latest movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <MovieProvider>
          <div className="my-8 mx-4 ">{children}</div>
        </MovieProvider>
      </body>
    </html>
  );
}
