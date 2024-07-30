import {
	AfterViewInit,
	booleanAttribute,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	ViewChild
} from "@angular/core";
import {
	NguCarousel,
	NguCarouselConfig,
	NguCarouselDefDirective,
	NguCarouselItemDirective,
	NguCarouselNextDirective,
	NguCarouselPointDirective,
	NguCarouselPrevDirective,
	NguItemComponent
} from "@ngu/carousel";

import _ from "lodash";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";

export interface CarouselImage {
	image: string;
	alt: string;
	caption?: string;
}

export const DEFAULT_CAROUSEL_CONFIG: NguCarouselConfig = {
	grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
	slide: 2,
	speed: 600,
	animation: "lazy",
	interval: { initialDelay: 10000, timing: 10000 },
	loop: true,
	point: {
		visible: true
	},
	load: 2,
	touch: true,
	easing: "ease"
};

@Component({
	selector: "app-carousel",
	standalone: true,
	imports: [
		NguCarousel,
		NguItemComponent,
		NguCarouselItemDirective,
		NguCarouselDefDirective,
		NguCarouselPrevDirective,
		NguCarouselNextDirective,
		NguCarouselPointDirective,
		MatIcon,
		MatIconButton
	],
	templateUrl: "./carousel.component.html",
	styleUrl: "./carousel.component.scss"
})
export class CarouselComponent implements AfterViewInit {
	@Input() images: CarouselImage[] = [];
	@Input() showPoints = true;
	@Input() showArrows: boolean = true;
	@Input() shuffle = false;
	@Input() carouselConfig: NguCarouselConfig = DEFAULT_CAROUSEL_CONFIG;

	@ViewChild("prev") prev!: ElementRef;
	@ViewChild("next") next!: ElementRef;

	constructor(private cdr: ChangeDetectorRef) {
		if (this.shuffle) {
			this.images = _.shuffle(this.images);
		}
	}

	ngAfterViewInit(): void {
		this.cdr.detectChanges();
		console.log("Next", this.next);
		console.log("Prev", this.prev);
	}
}
