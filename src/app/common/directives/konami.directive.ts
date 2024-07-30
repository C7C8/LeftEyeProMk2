import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

/**
 * Detects when the Konami code has been entered.
 *
 * Adapted from https://dev.to/rfornal/angular-konami-code-3fk
 */
@Directive({
	selector: "[konami]",
	standalone: true
})
export class KonamiDirective {
	@Output() private konami: EventEmitter<void> = new EventEmitter<void>();
	private sequence: string[] = [];
	private konamiCode: string[] = [
		"arrowup",
		"arrowup",
		"arrowdown",
		"arrowdown",
		"arrowleft",
		"arrowright",
		"arrowleft",
		"arrowright",
		"b",
		"a"
	];

	@HostListener("window:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.key) {
			this.sequence.push(event.key.toLowerCase());

			if (this.sequence.length > this.konamiCode.length) {
				this.sequence.shift();
			}

			if (this.isKonamiCode()) {
				this.konami.emit();
			}
		}
	}

	isKonamiCode(): boolean {
		return this.konamiCode.every((code: string, index: number) => code === this.sequence[index]);
	}
}
