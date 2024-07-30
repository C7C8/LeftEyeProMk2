import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { NgOptimizedImage } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { RuntimeConfigFile, RuntimeConfigService } from "./common/services/runtime-config.service";
import { MatDialog } from "@angular/material/dialog";
import { CreditsPopupComponent } from "./common/components/author-popup/credits-popup.component";
import { KonamiDirective } from "./common/directives/konami.directive";
import { ContactComponent } from "./pages/contact/contact.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, MatToolbar, NgOptimizedImage, MatIcon, RouterLink, MatButton, KonamiDirective],
	templateUrl: "./root.component.html",
	styleUrl: "./root.component.scss"
})
export class RootComponent implements OnInit {
	protected publicationImages: string[] = [];

	constructor(
		protected router: Router,
		protected runtimeConfig: RuntimeConfigService,
		protected dialog: MatDialog
	) {}

	async ngOnInit(): Promise<void> {
		this.publicationImages = (await this.runtimeConfig.getConfig(RuntimeConfigFile.PUBLICATIONS)) as string[];
	}

	protected openCredits() {
		this.dialog.open(CreditsPopupComponent, {
			width: "30vw"
		});
	}

	protected openContactForm() {
		this.dialog.open(ContactComponent, {
			width: "60vw"
		});
	}

	year(): number {
		return new Date().getFullYear();
	}
}
