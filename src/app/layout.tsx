import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SocketProvider } from "@/providers/socket/provider"
import { SliderProvider } from "@/providers/slider/provider"
import { AuthenticationProvider } from "@/providers/authentication/provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Presentation App",
  description: "Real-time presentation with Socket.io",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <SocketProvider>
        <SliderProvider totalSlides={20}>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </SliderProvider>
      </SocketProvider>
    </body>
  </html>
)

export default RootLayout;
