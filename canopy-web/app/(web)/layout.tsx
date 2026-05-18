import { Poppins } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../globals.css";
import { Metadata } from "next";
import Providers from "../../providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canopy Security",
  description: "Canopy Security Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/home/SideLogo.png" type="image/png" />
      </head>
      <Providers>
      <body className={`${poppins.variable} font-sans`}>
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </body>
      </Providers>
    </html>
  );
}
