import { AuthenticationProvider } from "@/providers/authentication/provider";
import { SliderProvider } from "@/providers/slider/provider";
import { SocketProvider } from "@/providers/socket/provider";
import { AutoZoomContainer } from "./auto-zoom-container";
import { SlideProgress } from "./slide-progress";
import { SlideControls } from "./slide-controls";

export type SlideLayerProps = {
    children: React.ReactNode;
};

export const SlideLayer: React.FC<SlideLayerProps> = ({ children }) => (
    <SocketProvider>
        <SliderProvider totalSlides={20}>
            <AuthenticationProvider>
                <main className="flex min-h-screen flex-col items-center justify-between">
                    <div className="w-full h-screen flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                            <AutoZoomContainer ignoredPaths={["/admin"]}>{children}</AutoZoomContainer>
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
);
