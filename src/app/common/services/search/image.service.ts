import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "./defs";

@Injectable({
	providedIn: "root"
})
export class ImageService {
	// private cachedCategories: Category[];

	constructor(private http: HttpClient) {}

	public getCategories(): Category[] {
		// TODO: Replace with code for fetching categories from JSON (or from cache if already loaded)
		return [
			{ name: "Polar Bears", description: "Photos of polar bears" },
			{ name: "Marine life", description: "Photos of marine life" },
			{ name: "Forest life", description: "Elk, deer, brown & black bears, and more" }
		];
	}
}
