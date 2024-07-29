import { Component } from '@angular/core';
import { MatDialogTitle } from "@angular/material/dialog";
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelDescription,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-contact',
  standalone: true,
	imports: [
		MatDialogTitle,
		MatAccordion,
		MatExpansionPanel,
		MatExpansionPanelHeader,
		MatExpansionPanelTitle,
		MatExpansionPanelDescription,
		MatIcon,
		MatCard,
		MatCardContent,
		MatDivider
	],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
