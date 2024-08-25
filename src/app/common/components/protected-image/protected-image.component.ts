import { Component, Input } from "@angular/core";
import { ImageSidecar } from "../../services/gallery/defs";
import { MatCard, MatCardHeader } from "@angular/material/card";
import { GalleryService } from "../../services/gallery/gallery.service";
import { NgOptimizedImage } from "@angular/common";
import { MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { MatGridList } from "@angular/material/grid-list";

@Component({
  selector: 'app-protected-image',
  standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		NgOptimizedImage,
		MatDialogTitle,
		MatDialogContent,
		MatIconButton,
		MatDialogClose,
		MatIcon,
		MatTooltip,
		MatGridList
	],
  templateUrl: './protected-image.component.html',
  styleUrl: './protected-image.component.scss'
})
export class ProtectedImageComponent {
	@Input({required: true}) sidecar!: ImageSidecar;
	@Input({required: true}) imageName!: string;
	protected gridStyle: string;

	constructor() {
		this.gridStyle = `
			grid-te
		`
	}

	protected getTilePath(tileName: string): string {
		return GalleryService.getTilePath(this.imageName, tileName);
	}
}
