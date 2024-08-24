import { Component, OnInit } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { GalleryService } from "../../common/services/gallery/gallery.service";
import { GalleryImageComponent } from "./gallery-image/gallery-image.component";
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
		GalleryImageComponent,
		AsyncPipe
	],
	templateUrl: "./gallery.component.html",
	styleUrl: "./gallery.component.scss"
})
export class GalleryComponent implements OnInit {
	tags: Map<string, string> = new Map<string, string>();
	images: string[] = [];
	sidecars: Map<string, ImageSidecar> = new Map<string, ImageSidecar>();

	constructor(private galleryService: GalleryService) { }

	async ngOnInit(): Promise<void> {
		this.tags = await this.galleryService.getAllTags();
		this.images = await this.galleryService.getAllImages();

		// TODO: Switch to proper lazy-loading solution
		for (let image of this.images) {
			this.sidecars.set(image, await this.galleryService.getImageSidecar(image));
		}
	}
}
