import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { NgOptimizedImage } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
	imports: [RouterOutlet, MatToolbar, NgOptimizedImage, MatIcon, RouterLink, MatButton],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {

	constructor(protected router: Router) {

	}

	year(): number {
		return (new Date()).getFullYear();
	}
}
