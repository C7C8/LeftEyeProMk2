import { Component, inject, Input } from '@angular/core';
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
		MatTooltip
	],
  templateUrl: './adventure-card.component.html',
  styleUrl: './adventure-card.component.scss'
})
export class AdventureCardComponent {

	@Input({required: true})
	public adventure!: AdventureCardData;
	protected dialogRef?: MatDialogRef<AdventureCardComponent> | null = null;

	constructor(private dialog: MatDialog) {
		this.dialogRef = inject(MatDialogRef<AdventureCardComponent>, {optional: true})
	}

	protected expandToDialog() {
		const ref = this.dialog.open(AdventureCardComponent, {
			width: "40vw",
			height: "80vh"
		});
		ref.componentInstance.adventure = this.adventure;
	}
}
