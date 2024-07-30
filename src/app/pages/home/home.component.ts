import { Component, OnInit } from '@angular/core';
import { CarouselComponent, CarouselImage } from "../../common/components/carousel/carousel.component";
import { RuntimeConfigFile, RuntimeConfigService } from "../../common/services/runtime-config.service";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		CarouselComponent
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnInit{

	protected carouselImages: CarouselImage[] = []

	constructor(private runtimeConfig: RuntimeConfigService) { }

	public async ngOnInit(): Promise<void> {
		this.carouselImages = await this.runtimeConfig.getConfig(RuntimeConfigFile.HERO_IMAGES) as CarouselImage[];
	}
}
