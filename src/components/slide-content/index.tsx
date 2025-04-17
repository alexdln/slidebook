import "./slide-content.scss";

export interface SlideContentProps {
    children: React.ReactNode;
}

export const SlideContent: React.FC<SlideContentProps> = ({ children }) => (
    <div className="slide-content">
        <div className="slide-content__inner">{children}</div>
    </div>
);
