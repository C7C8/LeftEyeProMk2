import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardTitle,
		MatCardContent
	],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss'
})
export class AboutComponent {

}
