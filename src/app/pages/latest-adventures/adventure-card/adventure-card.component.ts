import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
	MatCard,
	MatCardContent,
	MatCardHeader,
	MatCardImage,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { CarouselComponent, CarouselImage } from "../../../common/components/carousel/carousel.component";
import { NguCarousel } from "@ngu/carousel";

/**
 * Adventure card data
 */
export interface AdventureCardData {
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
  selector: 'app-adventure-card',
  standalone: true,
	imports: [
		MatCard,
		MatCardTitle,
		MatCardSubtitle,
		MatCardHeader,
		NgIf,
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
  templateUrl: './adventure-card.component.html',
  styleUrl: './adventure-card.component.scss'
})
export class AdventureCardComponent implements OnChanges {

	@Input({required: true})
	public adventure!: AdventureCardData;
	protected carouselImages: CarouselImage[] = [];
	protected dialogRef?: MatDialogRef<AdventureCardComponent> | null = null;

	constructor(private dialog: MatDialog) {
		this.dialogRef = inject(MatDialogRef<AdventureCardComponent>, {optional: true})
	}

	public ngOnChanges(changes: SimpleChanges) {
		// No changes to the input adventure object, just break.
		if (!changes["adventure"]) {
			return;
		}

		this.carouselImages = this.adventure.images.map((url: string) => ({
			image: url,
			alt: url.split("/").pop() || url
		}));
	}

	protected expandToDialog() {
		const ref = this.dialog.open(AdventureCardComponent, {
			width: "40vw",
			height: "80vh"
		});
		ref.componentInstance.adventure = this.adventure;
		ref.componentInstance.carouselImages = this.carouselImages;
	}
}
