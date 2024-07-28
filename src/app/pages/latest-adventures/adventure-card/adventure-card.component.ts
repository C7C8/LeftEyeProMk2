import { Component, Input } from '@angular/core';
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
		MarkdownComponent
	],
  templateUrl: './adventure-card.component.html',
  styleUrl: './adventure-card.component.scss'
})
export class AdventureCardComponent {

	@Input({required: true})
	public adventure!: AdventureCardData;
}
