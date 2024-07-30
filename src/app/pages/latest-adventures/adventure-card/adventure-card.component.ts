import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {
	MatCard,
	MatCardContent,
	MatCardHeader,
	MatCardImage,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import { NgOptimizedImage } from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import {
	CarouselComponent,
	CarouselImage,
	DEFAULT_CAROUSEL_CONFIG
} from "../../../common/components/carousel/carousel.component";
import { NguCarousel, NguCarouselConfig } from "@ngu/carousel";
import _ from "lodash";

/**
 * Adventure card data
 */
export interface AdventureData {
	/**
	 * Main title for card.
	 */
	title: string;

	/**
	 * Optional subtitle that appears smaller + in italics below the main title.
	 */
	subtitle?: string;

	/**
	 * Date for the post, will appear near the title.
	 */
	date?: string;

	/**
	 * Photos associated with this adventure
	 */
	images: string[];

	/**
	 * Body of the adventure's post, in markdown.
	 */
	content: string;
}

@Component({
	selector: "app-adventure-card",
	standalone: true,
	imports: [
		MatCard,
		MatCardTitle,
		MatCardSubtitle,
		MatCardHeader,
		NgOptimizedImage,
		MatCardImage,
		MatCardContent,
		MarkdownComponent,
		MatIconButton,
		MatIcon,
		MatDialogClose,
		MatTooltip,
		NguCarousel,
		CarouselComponent
	],
	templateUrl: "./adventure-card.component.html",
	styleUrl: "./adventure-card.component.scss"
})
export class AdventureCardComponent implements OnInit {
	@Input({ required: true })
	public adventure!: AdventureData;
	protected dialogRef?: MatDialogRef<AdventureCardComponent> | null = null;

	// Carousel config.
	// https://www.youtube.com/watch?v=bgs9OhjAE2g
	private static readonly INTERVAL_BASE_MS = 10000;
	private static readonly INTERVAL_JITTER_MS = 2500;
	protected readonly carouselConfig: NguCarouselConfig = {
		...DEFAULT_CAROUSEL_CONFIG,
		interval: {
			// Give some random jitter to timings, base +/- (random * jitter).
			// This stops carousel images from creepily all changing at the same time.
			timing:
				AdventureCardComponent.INTERVAL_BASE_MS +
				(Math.random() * AdventureCardComponent.INTERVAL_JITTER_MS * 2 - AdventureCardComponent.INTERVAL_JITTER_MS),
			initialDelay:
				AdventureCardComponent.INTERVAL_BASE_MS +
				(Math.random() * AdventureCardComponent.INTERVAL_JITTER_MS * 2 - AdventureCardComponent.INTERVAL_JITTER_MS)
		}
	};

	constructor(private dialog: MatDialog) {
		this.dialogRef = inject(MatDialogRef<AdventureCardComponent>, { optional: true });
	}

	public ngOnInit(): void {
		this.adventure.images = _.shuffle(this.adventure.images);
	}

	protected urlToCarouselImage(url: string): CarouselImage {
		return {image: url, alt: url.split("/").pop() || url };
	}

	protected expandToDialog() {
		const ref = this.dialog.open(AdventureCardComponent, {
			width: "40vw",
			height: "80vh"
		});
		ref.componentInstance.adventure = this.adventure;
	}
}
