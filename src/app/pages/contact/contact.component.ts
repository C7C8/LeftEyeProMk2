import { Component } from '@angular/core';
import { MatDialogTitle } from "@angular/material/dialog";
import {
	MatAccordion,
	MatExpansionPanel, MatExpansionPanelContent,
	MatExpansionPanelDescription,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { EmailValidator, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatStep, MatStepLabel, MatStepper, MatStepperNext } from "@angular/material/stepper";
import { MatError, MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

import { MatTooltip } from "@angular/material/tooltip";

enum ImageAccuracy {
	CLOSE = "CLOSE",
	VERY_CLOSE = "VERY_CLOSE",
	EXACTLY = "EXACTLY"
}

interface ContactFormImageRequest {
}

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
		MatDivider,
		MatStepper,
		MatStep,
		MatStepLabel,
		MatFormField,
		MatLabel,
		ReactiveFormsModule,
		MatInput,
		MatButton,
		MatError,
		MatPrefix,
		MatStepperNext,
		MatTooltip,
		MatExpansionPanelContent
	],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
	protected customContactForm = this.formBuilder.group({
		submitter: this.formBuilder.group({
			name: ["", Validators.required],
			company: [""],
			phone: ["", [Validators.required, Validators.pattern("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$")]],
			email: ["", [Validators.required, Validators.email]],
			requestsCount: [1, [Validators.min(1), Validators.max(100)]]
		}),
		requests: this.formBuilder.array([this.makeImageRequest()], Validators.minLength(1))
	})

	constructor(private formBuilder: FormBuilder) { }

	protected makeImageRequest(): FormGroup {
		return this.formBuilder.group({
			description: ["", [Validators.required, Validators.minLength(25), Validators.maxLength(500)]],
			accuracy: [ImageAccuracy.CLOSE, [Validators.required, Validators.pattern( /^(CLOSE|VERY_CLOSE|EXACT)$/)]],
			date_requirement: [new Date(), [Validators.min(Date.now() + 24 * 60 * 60 * 1000)]],
		})
	}

	protected debugLog(): void {
		console.log("Submitter value", this.customContactForm.value)
	}
}
