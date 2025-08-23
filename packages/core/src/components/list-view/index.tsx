import { SlideContent, type SlideContentProps } from "../slide-content";
import { AutoZoomContainer } from "../auto-zoom-container";
import { BackLink } from "../back-link";
import { SlideLink } from "../slide-link";

import "./list-view.scss";

export type ListViewProps = {
    children: React.ReactNode[];
    padding?: SlideContentProps["padding"];
};

export const ListView: React.FC<ListViewProps> = ({ children, padding }) => (
    <div className="list-view">
        <div className="list-view__grid">
            {children.map((child, index) => (
                <div key={index} className="list-view__item">
                    <div className="list-view__number">{index + 1}</div>
                    <AutoZoomContainer transformOrigin="left top" padding={0}>
                        <SlideContent padding={padding}>{child}</SlideContent>
                        <SlideLink slide={index + 1} className="list-view__link" />
                    </AutoZoomContainer>
                </div>
            ))}
        </div>
        <div className="list-view__back">
            <BackLink className="list-view__back-link" />
        </div>
    </div>
);
