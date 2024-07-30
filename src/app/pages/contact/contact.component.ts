import { Component } from "@angular/core";
import { MatDialogClose, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelContent,
	MatExpansionPanelDescription,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
	MatStep,
	MatStepContent,
	MatStepLabel,
	MatStepper,
	MatStepperIcon,
	MatStepperNext
} from "@angular/material/stepper";
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import {
	MatDatepicker,
	MatDatepickerInput,
	MatDatepickerToggle,
	MatDateRangePicker
} from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import YAML from "yaml";
import { NgIf } from "@angular/common";

enum ImageAccuracy {
	CLOSE = "Close",
	VERY_CLOSE = "Very close",
	EXACTLY = "Exact"
}

@Component({
	selector: "app-contact",
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
		MatExpansionPanelContent,
		MatStepContent,
		MatDateRangePicker,
		MatDatepickerInput,
		MatDatepickerToggle,
		MatSuffix,
		MatDatepicker,
		MatSelect,
		MatOption,
		MatHint,
		MatStepperIcon,
		MatIconButton,
		MatDialogClose,
		NgIf
	],
	templateUrl: "./contact.component.html",
	styleUrl: "./contact.component.scss"
})
export class ContactComponent {
	protected readonly EMAIL = "steven@lefteyepro.com";
	protected readonly REQUEST_MIN_CHARS = 15;
	protected readonly REQUEST_MAX_CHARS = 1000;

	protected customContactForm = this.formBuilder.group({
		submitter: this.formBuilder.group({
			name: ["", Validators.required],
			company: [""],
			phone: ["", [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
			email: ["", [Validators.required, Validators.email]],
			requestsCount: [1, [Validators.min(1), Validators.max(100)]]
		}),
		requests: this.formBuilder.array([this.makeImageRequest()], Validators.minLength(1))
	});

	constructor(
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<ContactComponent>
	) {}

	protected makeImageRequest(): FormGroup {
		return this.formBuilder.group({
			description: [
				"",
				[Validators.required, Validators.minLength(this.REQUEST_MIN_CHARS), Validators.maxLength(1000)]
			],
			accuracy: [ImageAccuracy.CLOSE, [Validators.required, Validators.pattern(/^(Close|Very close|Exact)$/)]],
			date_requirement: [new Date(Date.now() + 2 * 1000 * 60 * 60 * 24)]
		});
	}

	protected datePickerFilter(date: Date | null): boolean {
		if (!date) {
			return false;
		}

		return date.getTime() - Date.now() > 1000 * 60 * 60 * 24;
	}

	protected onChangeRequests() {
		// Changing the requests count number does not change the amount of request *forms* in the FormArray. This function
		// computes the difference between what we have and what we need, and adjusts to compensate.

		const newRequests: number = this.customContactForm.value.submitter?.requestsCount || 1;

		// Too many forms
		while (newRequests < this.customContactForm.controls.requests.length) {
			this.customContactForm.controls.requests.removeAt(this.customContactForm.controls.requests.length - 1);
		}

		// Not enough forms
		while (newRequests > this.customContactForm.controls.requests.length) {
			this.customContactForm.controls.requests.push(this.makeImageRequest());
		}
	}

	protected onSubmit(): void {
		// TODO Improve formatting of sent email
		const formValue = this.customContactForm.value;
		console.debug("Submitting contact form", formValue);
		const message_body = encodeURIComponent(YAML.stringify(this.customContactForm.value));
		const subject_line = encodeURIComponent(
			`Contact form request from ${formValue.submitter?.name} for ${formValue.submitter?.requestsCount} images`
		);
		const uri = `mailto:${this.EMAIL}?subject=${subject_line}&body=${message_body}`;
		console.debug("Contact form URI", uri);
		window.open(uri);

		this.dialogRef.close();
	}

	protected readonly ImageAccuracy = ImageAccuracy;
	protected readonly Object = Object;
}
