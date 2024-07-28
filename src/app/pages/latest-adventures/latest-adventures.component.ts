import { Component, OnInit } from '@angular/core';
import { RuntimeConfigFile, RuntimeConfigService } from "../../common/services/runtime-config.service";
import { AdventureCardComponent, AdventureCardData } from "./adventure-card/adventure-card.component";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-latest-adventures',
  standalone: true,
	imports: [
		MatGridList,
		MatGridTile,
		AdventureCardComponent,
		NgForOf
	],
  templateUrl: './latest-adventures.component.html',
  styleUrl: './latest-adventures.component.scss'
})
export class LatestAdventuresComponent implements OnInit {

	protected adventures: AdventureCardData[] = [];

	constructor(private runtimeConfig: RuntimeConfigService) { }

	public async ngOnInit(): Promise<void> {
		// Load in saved adventures
		this.adventures = await this.runtimeConfig.getConfig(RuntimeConfigFile.ADVENTURES);
	}
}
