import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, lastValueFrom } from "rxjs";
import YAML from "yaml";
import { ImageSidecar } from "./defs";

@Injectable({
	providedIn: "root"
})
export class GalleryService {
	// private cachedCategories: Category[];

	public static readonly GALLERY_BASE = "/assets/images/gallery";
	private static readonly IMAGE_INDEX = `${GalleryService.GALLERY_BASE}/images.index.yaml`;
	private static readonly TAG_INDEX = `${GalleryService.GALLERY_BASE}/tags.index.yaml`;

	private imageIndex: string[] | null = null;
	private tagIndex: Map<string, string> | null = null;
	private selectedTags: Set<string> = new Set<string>();

	constructor(private http: HttpClient) {}

	public async getAllImages(): Promise<string[]> {
		// Check cache to see if we need to fetch the image index or not
		if (this.imageIndex == null) {
			// Fetch & parse YAML file
			try {
				this.imageIndex = YAML.parse(await firstValueFrom(this.http.get(GalleryService.IMAGE_INDEX, { responseType: "text" })));
			} catch (e) {
				console.error(`Obtained error requesting & parsing file ${GalleryService.IMAGE_INDEX}`, e);
				throw e;
			}
		}

		return this.imageIndex!!;
	}

	public async getAllTags(): Promise<Map<string, string>> {
		// Check cache to see if we need to fetch the tag index or not
		if (this.tagIndex == null) {
			// Fetch & parse YAML file
			try {
				this.tagIndex = new Map(Object.entries(YAML.parse(await firstValueFrom(this.http.get(GalleryService.TAG_INDEX, { responseType: "text" })))));
			} catch (e) {
				console.error(`Obtained error requesting & parsing file ${GalleryService.TAG_INDEX}`, e);
				throw e;
			}
		}

		return this.tagIndex!!;
	}

	public async getImageSidecar(imageName: string): Promise<ImageSidecar> {
		return YAML.parse(await lastValueFrom(
			this.http.get(`${GalleryService.GALLERY_BASE}/${imageName}/${imageName}.sidecar.yaml`, { responseType: "text" })
		));
	}

	public selectTag(tag: string) {
		this.selectedTags.add(tag);
	}

	public deselectTag(tag: string) {
		this.selectedTags.delete(tag);
	}

	public isTagSelected(tag: string) {
		return this.selectedTags.has(tag);
	}

	public getSelectedTags(): Set<string> {
		return this.selectedTags;
	}

	public static getTilePath(imageName: string, tileName: string) {
		return `${GalleryService.GALLERY_BASE}/${imageName}/${tileName}`;
	}
}
