import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import {
	NguCarousel,
	NguCarouselConfig,
	NguCarouselDefDirective,
	NguCarouselItemDirective, NguCarouselNextDirective, NguCarouselPointDirective, NguCarouselPrevDirective,
	NguItemComponent
} from "@ngu/carousel";

import _ from "lodash";

export interface CarouselImage {
	image: string;
	alt: string;
	caption?: string;
}

export const DEFAULT_CAROUSEL_CONFIG: NguCarouselConfig = {
	grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
	slide: 2,
	speed: 600,
	animation: 'lazy',
	interval: { initialDelay: 10000, timing: 10000 },
	loop: true,
	point: {
		visible: true
	},
	load: 2,
	touch: false,
	easing: 'ease',
};

@Component({
  selector: 'app-carousel',
  standalone: true,
	imports: [
    NguCarousel,
    NguItemComponent,
    NguCarouselItemDirective,
    NguCarouselDefDirective,
    NguCarouselPrevDirective,
    NguCarouselNextDirective,
    NguCarouselPointDirective
],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit {
	@Input() images: CarouselImage[] = [];
	@Input() showPoints: boolean = true;
	@Input() shuffle: boolean = false;
	@Input() carouselConfig: NguCarouselConfig = DEFAULT_CAROUSEL_CONFIG;

	constructor(private cdr: ChangeDetectorRef) {
		if (this.shuffle) {
			this.images = _.shuffle(this.images)
		}
	}

	ngAfterViewInit(): void {
		this.cdr.detectChanges();
	}
}
