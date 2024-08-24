import { Component, Input } from "@angular/core";
import { ImageSidecar } from "../../services/gallery/defs";
import { MatCard, MatCardHeader } from "@angular/material/card";
import { GalleryService } from "../../services/gallery/gallery.service";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-protected-image',
  standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		NgOptimizedImage
	],
  templateUrl: './protected-image.component.html',
  styleUrl: './protected-image.component.scss'
})
export class ProtectedImageComponent {
	@Input({required: true}) sidecar!: ImageSidecar;
	@Input({required: true}) imageName!: string;

	protected getTilePath(tileName: string): string {
		return GalleryService.getTilePath(this.imageName, tileName);
	}
}
