import { Component, OnInit } from "@angular/core";
import { CarouselComponent, CarouselImage } from "../../common/components/carousel/carousel.component";
import { RuntimeConfigService } from "../../common/services/runtime-config/runtime-config.service";
import { CFG_HERO_IMAGES } from "../../common/services/runtime-config/defs";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CarouselComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
	protected carouselImages: CarouselImage[] = [];

	constructor(private runtimeConfig: RuntimeConfigService) {}

	public async ngOnInit(): Promise<void> {
		this.carouselImages = await this.runtimeConfig.getConfig(CFG_HERO_IMAGES);
	}
}
