import { Component, OnInit, ViewChild } from "@angular/core";
import { RuntimeConfigFile, RuntimeConfigService } from "../../common/services/runtime-config.service";
import { AdventureCardComponent, AdventureCardData } from "./adventure-card/adventure-card.component";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

import { MatPaginator } from "@angular/material/paginator";
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from "@angular/material/card";
import _ from "lodash";

@Component({
	selector: "app-latest-adventures",
	standalone: true,
	imports: [
		MatGridList,
		MatGridTile,
		AdventureCardComponent,
		MatPaginator,
		MatCard,
		MatCardContent,
		MatCardFooter,
		MatCardHeader
	],
	templateUrl: "./latest-adventures.component.html",
	styleUrl: "./latest-adventures.component.scss"
})
export class LatestAdventuresComponent implements OnInit {
	@ViewChild("paginator") paginator!: MatPaginator;
	protected adventures: AdventureCardData[] = [];
	protected page: AdventureCardData[] = [];

	constructor(private runtimeConfig: RuntimeConfigService) {}

	public async ngOnInit(): Promise<void> {
		// Load in saved adventures
		this.adventures = (await this.runtimeConfig.getConfig(RuntimeConfigFile.ADVENTURES)) as AdventureCardData[];
		this.setPage(this.paginator.pageIndex, this.paginator.pageSize);
	}

	protected setPage(pageIndex: number, pageSize: number): void {
		const start = pageIndex * pageSize;
		this.page = _.slice(this.adventures, start, start + pageSize);
	}
}
