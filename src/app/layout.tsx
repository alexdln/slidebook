import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SocketProvider } from "@/providers/socket/provider"
import { SliderProvider } from "@/providers/slider/provider"
import { AuthenticationProvider } from "@/providers/authentication/provider"

import "./globals.css"
import { AutoZoomContainer } from "@/components/auto-zoom-container"
import { SlideProgress } from "@/components/slide-progress"
import { SlideControls } from "@/components/slide-controls"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Presentation App",
  description: "Real-time presentation with Socket.io",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} overflow-hidden bg-gray-100`}>
      <SocketProvider>
        <SliderProvider totalSlides={20}>
          <AuthenticationProvider>
            <main className="flex min-h-screen flex-col items-center justify-between">
              <div className="w-full h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <AutoZoomContainer>
                    {children}
                  </AutoZoomContainer>
                </div>

                <div className="p-4 w-full">
                  <SlideProgress />
                  <SlideControls />
                </div>
              </div>
            </main>
          </AuthenticationProvider>
        </SliderProvider>
      </SocketProvider>
    </body>
  </html>
)

export default RootLayout;
