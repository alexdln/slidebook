import { Slide as Slide1, Notes as Notes1 } from "@/slides/1";
import { Slide as Slide2, Notes as Notes2 } from "@/slides/2";
import { Slide as Slide3, Notes as Notes3 } from "@/slides/3";
import { Slide as Slide4, Notes as Notes4 } from "@/slides/4";
import { Slide as Slide5, Notes as Notes5 } from "@/slides/5";
import { Slide as Slide6, Notes as Notes6 } from "@/slides/6";
import { Slide as Slide7, Notes as Notes7 } from "@/slides/7";
import { Slide as Slide8, Notes as Notes8 } from "@/slides/8";
import { Slide as Slide9, Notes as Notes9 } from "@/slides/9";
import { Slide as Slide10, Notes as Notes10 } from "@/slides/10";
import { Slide as Slide11, Notes as Notes11 } from "@/slides/11";
import { Slide as Slide12, Notes as Notes12 } from "@/slides/12";
import { Slide as Slide13, Notes as Notes13 } from "@/slides/13";
import { Slide as Slide14, Notes as Notes14 } from "@/slides/14";
import { Slide as Slide15, Notes as Notes15 } from "@/slides/15";
import { Slide as Slide16, Notes as Notes16 } from "@/slides/16";
import { Slide as Slide17, Notes as Notes17 } from "@/slides/17";
import { Slide as Slide18, Notes as Notes18 } from "@/slides/18";
import { Slide as Slide19, Notes as Notes19 } from "@/slides/19";
import { Slide as Slide20, Notes as Notes20 } from "@/slides/20";

export interface SlideContentProps {
    slideNumber: number;
}

export type Slide = {
    component: (props: SlideContentProps) => React.ReactNode;
    notes: (props: SlideContentProps) => React.ReactNode;
};

export const slides: Slide[] = [
    { component: Slide1, notes: Notes1 },
    { component: Slide2, notes: Notes2 },
    { component: Slide3, notes: Notes3 },
    { component: Slide4, notes: Notes4 },
    { component: Slide5, notes: Notes5 },
    { component: Slide6, notes: Notes6 },
    { component: Slide7, notes: Notes7 },
    { component: Slide8, notes: Notes8 },
    { component: Slide9, notes: Notes9 },
    { component: Slide10, notes: Notes10 },
    { component: Slide11, notes: Notes11 },
    { component: Slide12, notes: Notes12 },
    { component: Slide13, notes: Notes13 },
    { component: Slide14, notes: Notes14 },
    { component: Slide15, notes: Notes15 },
    { component: Slide16, notes: Notes16 },
    { component: Slide17, notes: Notes17 },
    { component: Slide18, notes: Notes18 },
    { component: Slide19, notes: Notes19 },
    { component: Slide20, notes: Notes20 },
];
