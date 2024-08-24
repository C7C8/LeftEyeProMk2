import { Component, OnInit, ViewChild } from "@angular/core";
import { RuntimeConfigService } from "../../common/services/runtime-config/runtime-config.service";
import { AdventureCardComponent, AdventureData } from "./adventure-card/adventure-card.component";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

import { MatPaginator } from "@angular/material/paginator";
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from "@angular/material/card";
import _ from "lodash";
import { CFG_ADVENTURES } from "../../common/services/runtime-config/defs";

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
		MatCardHeader,
		MatCardTitle
	],
	templateUrl: "./latest-adventures.component.html",
	styleUrl: "./latest-adventures.component.scss"
})
export class LatestAdventuresComponent implements OnInit {
	@ViewChild("paginator") paginator!: MatPaginator;
	protected adventures: AdventureData[] = [];
	protected page: AdventureData[] = [];

	constructor(private runtimeConfig: RuntimeConfigService) {}

	public async ngOnInit(): Promise<void> {
		// Load in saved adventures
		this.adventures = await this.runtimeConfig.getConfig(CFG_ADVENTURES);
		this.setPage(this.paginator.pageIndex, this.paginator.pageSize);
	}

	protected setPage(pageIndex: number, pageSize: number): void {
		const start = pageIndex * pageSize;
		this.page = _.slice(this.adventures, start, start + pageSize);
	}
}
