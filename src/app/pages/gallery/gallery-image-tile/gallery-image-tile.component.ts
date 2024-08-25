import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
export class GalleryImageTileComponent implements OnInit {
	@Input({required: true}) sidecar!: ImageSidecar;
	@Input({required: true}) imageName!: string;
	@Output() addedToCart: EventEmitter<string> = new EventEmitter();

	ngOnInit(): void {
		console.log("Image tile sidecar", this.sidecar);
		console.log("Image tile name", this.imageName);
	}

	protected getTilePath(tileName: string): string {
		return GalleryService.getTilePath(this.imageName, tileName);
	}
}
