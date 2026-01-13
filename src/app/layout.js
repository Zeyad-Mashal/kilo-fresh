import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import OrderNotifications from "./Components/OrderNotifications/OrderNotifications";
import "./globals.css";
import { Cairo } from "next/font/google";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "Kilo Fresh",
  description: "Created by Zeyad Mashaal",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "8px",
              padding: "16px",
              fontFamily: "var(--font-cairo)",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <OrderNotifications />
      </body>
    </html>
  );
}
