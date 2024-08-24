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

@Component({
  selector: 'app-gallery-image',
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
  templateUrl: './gallery-image.component.html',
  styleUrl: './gallery-image.component.scss'
})
export class GalleryImageComponent {
	@Input({required: true}) sidecar!: ImageSidecar;
	@Input({required: true}) imageName!: string;
	@Output() addedToCart: EventEmitter<string> = new EventEmitter();

	protected getTilePath(tileName: string): string {
		return GalleryService.getTilePath(this.imageName, tileName);
	}
}
