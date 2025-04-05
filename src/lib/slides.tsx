import { Slide1 } from "@/slides/1";
import { Slide2 } from "@/slides/2";
import { Slide3 } from "@/slides/3";
import { Slide4 } from "@/slides/4";
import { Slide5 } from "@/slides/5";
import { Slide6 } from "@/slides/6";
import { Slide7 } from "@/slides/7";
import { Slide8 } from "@/slides/8";
import { Slide9 } from "@/slides/9";
import { Slide10 } from "@/slides/10";
import { Slide11 } from "@/slides/11";
import { Slide12 } from "@/slides/12";
import { Slide13 } from "@/slides/13";
import { Slide14 } from "@/slides/14";
import { Slide15 } from "@/slides/15";
import { Slide16 } from "@/slides/16";
import { Slide17 } from "@/slides/17";
import { Slide18 } from "@/slides/18";
import { Slide19 } from "@/slides/19";
import { Slide20 } from "@/slides/20";

export interface SlideContentProps {
  slideNumber: number;
}

export type Slide = {
  component: (props: SlideContentProps) => React.ReactNode;
}

export const slides: Slide[] = [
  { component: Slide1 },
  { component: Slide2 },
  { component: Slide3 },
  { component: Slide4 },
  { component: Slide5 },
  { component: Slide6 },
  { component: Slide7 },
  { component: Slide8 },
  { component: Slide9 },
  { component: Slide10 },
  { component: Slide11 },
  { component: Slide12 },
  { component: Slide13 },
  { component: Slide14 },
  { component: Slide15 },
  { component: Slide16 },
  { component: Slide17 },
  { component: Slide18 },
  { component: Slide19 },
  { component: Slide20 },
]
