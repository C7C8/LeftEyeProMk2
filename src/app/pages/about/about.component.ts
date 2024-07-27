import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";

@Component({
  selector: 'app-about',
  standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardContent
	],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
