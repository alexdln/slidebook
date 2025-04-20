export interface SlideContentProps {
    slideNumber: number;
}

export type Slide = {
    component: (props: SlideContentProps) => React.ReactNode;
    notes?: (props: SlideContentProps) => React.ReactNode;
};
