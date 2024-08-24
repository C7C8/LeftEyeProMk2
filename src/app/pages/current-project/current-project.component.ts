import { Component, OnInit } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { CarouselComponent, CarouselImage } from "../../common/components/carousel/carousel.component";
import { RuntimeConfigService } from "../../common/services/runtime-config/runtime-config.service";
import { CFG_CURRENT_PROJECT } from "../../common/services/runtime-config/defs";
import { MarkdownComponent } from "ngx-markdown";
import { MatDivider } from "@angular/material/divider";

/**
 * Represents data loaded in from current project config file
 */
export interface CurrentProjectData {
	carousel_images: string[];
	content: string;
	sponsors: string[];
	get_involved: { name: string; url: string }[];
}

@Component({
	selector: "app-current-project",
	standalone: true,
	imports: [MatCard, MatCardHeader, MatCardContent, MarkdownComponent, CarouselComponent, MatDivider, MatCardTitle],
	templateUrl: "./current-project.component.html",
	styleUrl: "./current-project.component.scss"
})
export class CurrentProjectComponent implements OnInit {
	protected project: CurrentProjectData = {
		carousel_images: [],
		content: "Loading...",
		get_involved: [],
		sponsors: []
	};

	constructor(private runtimeConfig: RuntimeConfigService) {}

	public async ngOnInit(): Promise<void> {
		this.project = await this.runtimeConfig.getConfig(CFG_CURRENT_PROJECT);
	}

	protected urlToCarouselImage(url: string): CarouselImage {
		return { image: url, alt: url.split("/").pop() || url };
	}
}
