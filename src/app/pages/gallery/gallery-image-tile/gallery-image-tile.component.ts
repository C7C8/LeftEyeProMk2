import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ImageSidecar } from "../../../common/services/gallery/defs";
import {
	MatCard,
	MatCardContent,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import { ProtectedImageComponent } from "../../../common/components/protected-image/protected-image.component";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { GalleryService } from "../../../common/services/gallery/gallery.service";
import { NgOptimizedImage } from "@angular/common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
	GalleryImagePopupComponent,
	GalleryImagePopupParams
} from "../gallery-image-popup/gallery-image-popup.component";

@Component({
  selector: 'app-gallery-image-tile',
  standalone: true,
	imports: [
		MatCard,
		MatCardTitle,
		MatCardSubtitle,
		MatCardHeader,
		MatCardContent,
		ProtectedImageComponent,
		MatCardFooter,
		MatIcon,
		MatIconButton,
		MatTooltip,
		NgOptimizedImage
	],
  templateUrl: './gallery-image-tile.component.html',
  styleUrl: './gallery-image-tile.component.scss'
})
export class GalleryImageTileComponent {
	@Input({required: true}) sidecar!: ImageSidecar;
	@Input({required: true}) imageName!: string;
	@Output() addedToCart: EventEmitter<string> = new EventEmitter();

	constructor(private dialog: MatDialog) { }

	protected openExpandedView() {
		this.dialog.open(GalleryImagePopupComponent, {
			width: "80vw",
			height: "80vh",
			data: {
				imageName: this.imageName,
				sidecar: this.sidecar
			} as GalleryImagePopupParams
		})
	}

	protected getTilePath(tileName: string): string {
		return GalleryService.getTilePath(this.imageName, tileName);
	}
}
