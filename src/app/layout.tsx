import type { Metadata } from "next";
import { Inter, Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "MRT - IITB | Mars Rover Team",
  description: "Pioneering planetary exploration through innovative rover design and cutting-edge space robotics technology at IIT Bombay",
  keywords: "Mars Rover, IIT Bombay, Space Robotics, Planetary Exploration, Engineering",
  authors: [{ name: "Mars Rover Team IIT Bombay" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${spaceMono.variable} font-inter antialiased`}>
        {/* Enhanced Space Background Effects */}
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Deep Space Base Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-space to-space-dark"></div>
          
          {/* Nebula-like Secondary Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-mars/5 to-cosmic/10"></div>
          
          {/* Animated Stars Field */}
          <div className="absolute inset-0">
            {/* Large stars */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
            <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-cosmic/80 rounded-full animate-twinkle animation-delay-1000"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-mars/60 rounded-full animate-twinkle animation-delay-2000"></div>
            <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-white/70 rounded-full animate-twinkle animation-delay-3000"></div>
            <div className="absolute bottom-1/4 right-2/3 w-1 h-1 bg-cosmic/90 rounded-full animate-twinkle animation-delay-4000"></div>
            
            {/* Small star field */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/6 left-1/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/5 right-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-500"></div>
              <div className="absolute bottom-1/5 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-1500"></div>
              <div className="absolute bottom-1/6 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-2500"></div>
              <div className="absolute top-1/2 left-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-3500"></div>
            </div>
          </div>
          
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(64, 224, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                animation: 'grid-move 20s linear infinite'
              }}
            />
          </div>
          
          {/* Floating Cosmic Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-mars/15 via-orange-500/10 to-red-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cosmic/20 via-blue-500/15 to-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/15 via-cosmic/10 to-mars/10 rounded-full mix-blend-screen filter blur-3xl animate-float-slow"></div>
          
          {/* Planetary Ring Effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] h-1 bg-gradient-to-r from-transparent via-cosmic/10 to-transparent rotate-12 animate-spin-slow"></div>
          
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
