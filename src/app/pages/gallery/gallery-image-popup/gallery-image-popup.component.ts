import { Component, Inject } from "@angular/core";
import { ImageSidecar } from "../../../common/services/gallery/defs";
import {
	MAT_DIALOG_DATA, MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { ProtectedImageComponent } from "../../../common/components/protected-image/protected-image.component";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { NgxFilesizeModule } from "ngx-filesize";
import { MatChip, MatChipOption, MatChipSelectionChange, MatChipSet } from "@angular/material/chips";
import { GalleryService } from "../../../common/services/gallery/gallery.service";

export interface GalleryImagePopupParams {
	imageName: string;
	sidecar: ImageSidecar;
}

@Component({
  selector: 'app-gallery-image-popup',
  standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogClose,
		MatDialogContent,
		MatIcon,
		MatIconButton,
		MatTooltip,
		MatDialogActions,
		ProtectedImageComponent,
		MatCard,
		MatCardHeader,
		MatCardTitle,
		MatCardContent,
		NgxFilesizeModule,
		MatChipSet,
		MatChip,
		MatButton,
		MatChipOption
	],
  templateUrl: './gallery-image-popup.component.html',
  styleUrl: './gallery-image-popup.component.scss'
})
export class GalleryImagePopupComponent {
	protected readonly imageName: string;
	protected readonly sidecar: ImageSidecar;

	constructor(
		protected dialogRef: MatDialogRef<GalleryImagePopupComponent>,
		protected galleryService: GalleryService,
		@Inject(MAT_DIALOG_DATA) params: GalleryImagePopupParams,
	) {
		this.imageName = params.imageName;
		this.sidecar = params.sidecar;

		console.log("active tags", galleryService.getSelectedTags());
	}

	public handleTagSelection(event: MatChipSelectionChange, tag: string) {
		if (event.selected) {
			this.galleryService.selectTag(tag)
		} else {
			this.galleryService.deselectTag(tag);
		}
	}
}
