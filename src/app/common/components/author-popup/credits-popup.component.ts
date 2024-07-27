import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-author-popup',
  standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatButton,
		MatDialogClose
	],
  templateUrl: './credits-popup.component.html',
  styleUrl: './credits-popup.component.scss'
})
export class CreditsPopupComponent {

}
