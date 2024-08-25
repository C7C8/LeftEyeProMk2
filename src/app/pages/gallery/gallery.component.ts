import { Component, OnInit } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { GalleryService } from "../../common/services/gallery/gallery.service";
import { GalleryImageTileComponent } from "./gallery-image-tile/gallery-image-tile.component";
import { ImageSidecar } from "../../common/services/gallery/defs";
import { AsyncPipe } from "@angular/common";

@Component({
	selector: "app-gallery",
	standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardContent,
		MatCardTitle,
		GalleryImageTileComponent,
		AsyncPipe
	],
	templateUrl: "./gallery.component.html",
	styleUrl: "./gallery.component.scss"
})
export class GalleryComponent implements OnInit {
	tags: Map<string, string> = new Map<string, string>();
	images: {name: string, sidecar: ImageSidecar}[] = [];

	constructor(private galleryService: GalleryService) { }

	async ngOnInit(): Promise<void> {
		this.tags = await this.galleryService.getAllTags();
		const baseImages = await this.galleryService.getAllImages();

		// TODO: Switch to proper lazy-loading solution
		for (let image of baseImages) {
			this.images.push({name: image, sidecar: await this.galleryService.getImageSidecar(image)});
		}
	}
}
