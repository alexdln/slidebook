import { AuthenticationProvider } from "@/providers/authentication/provider";
import { SliderProvider } from "@/providers/slider/provider";
import { SocketProvider } from "@/providers/socket/provider";
import { NavigationProvider } from "@/providers/navigation/provider";
import { FragmentsProvider } from "@/providers/fragments/provider";
import { ConfigurationProvider } from "@/providers/configuration/provider";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/settings";

import { AutoZoomContainer } from "../auto-zoom-container";
import { SlideProgress } from "../slide-progress";
import { SlideControls } from "../slide-controls";
import { ThemeDetector } from "../theme-detector";
import { ConfigurationDetector } from "../configuration-detector";
import { QrWindow } from "../qr-window";

import "./slide-layer.scss";

export type SlideLayerProps = {
    children: React.ReactNode;
    totalSlides: number;
};

export const SlideLayer: React.FC<SlideLayerProps> = ({ children, totalSlides }) => (
    <SocketProvider>
        <SliderProvider totalSlides={totalSlides}>
            <AuthenticationProvider>
                <FragmentsProvider>
                    <NavigationProvider>
                        <ConfigurationProvider />
                        <ThemeDetector />
                        <ConfigurationDetector />
                        <main
                            className="slide-layer"
                            style={
                                {
                                    "--slide-width": `${SLIDE_WIDTH}px`,
                                    "--slide-height": `${SLIDE_HEIGHT}px`,
                                    "--slide-width-num": SLIDE_WIDTH,
                                    "--slide-height-num": SLIDE_HEIGHT,
                                } as React.CSSProperties
                            }
                        >
                            <div className="slide-layer__main">
                                <div className="slide-layer__content">
                                    <AutoZoomContainer ignoredPaths={["/host", "/list"]}>{children}</AutoZoomContainer>
                                </div>
                                <div className="slide-layer__controls">
                                    <SlideProgress />
                                    <SlideControls />
                                </div>
                                <div className="slide-layer__notes" />
                                <QrWindow />
                            </div>
                        </main>
                    </NavigationProvider>
                </FragmentsProvider>
            </AuthenticationProvider>
        </SliderProvider>
    </SocketProvider>
);
