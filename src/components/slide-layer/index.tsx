import { AuthenticationProvider } from "@/providers/authentication/provider";
import { SliderProvider } from "@/providers/slider/provider";
import { SocketProvider } from "@/providers/socket/provider";
import { NavigationProvider } from "@/providers/navigation/provider";
import { FragmentsProvider } from "@/providers/fragments/provider";

import { AutoZoomContainer } from "../auto-zoom-container";
import { SlideProgress } from "../slide-progress";
import { SlideControls } from "../slide-controls";
import { ThemeDetector } from "../theme-detector";

export type SlideLayerProps = {
    children: React.ReactNode;
};

export const SlideLayer: React.FC<SlideLayerProps> = ({ children }) => (
    <SocketProvider>
        <SliderProvider totalSlides={20}>
            <AuthenticationProvider>
                <FragmentsProvider>
                    <NavigationProvider>
                        <ThemeDetector />
                        <main className="flex min-h-screen flex-col items-center justify-between">
                            <div className="w-full h-screen flex flex-col">
                                <div className="flex-1 flex items-center justify-center">
                                    <AutoZoomContainer ignoredPaths={["/admin", "/list"]}>{children}</AutoZoomContainer>
                                </div>
                                <div className="p-4 w-full">
                                    <SlideProgress />
                                    <SlideControls />
                                </div>
                            </div>
                        </main>
                    </NavigationProvider>
                </FragmentsProvider>
            </AuthenticationProvider>
        </SliderProvider>
    </SocketProvider>
);
