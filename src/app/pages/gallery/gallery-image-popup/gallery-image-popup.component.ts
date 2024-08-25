import { Component, Input } from "@angular/core";
import { ImageSidecar } from "../../../common/services/gallery/defs";

@Component({
  selector: 'app-gallery-image-popup',
  standalone: true,
  imports: [],
  templateUrl: './gallery-image-popup.component.html',
  styleUrl: './gallery-image-popup.component.scss'
})
export class GalleryImagePopupComponent {
	@Input({required: true}) imageName!: string;
	@Input({required: true}) sidecar!: ImageSidecar;
}
