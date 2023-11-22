import { DestroyRef, Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, inject } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, tap } from 'rxjs';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Directive({
  selector: 'input[appInput]',
  standalone: true,
  exportAs: 'appInput',
  host: {
    '[class.input-element]': 'true',
    '[class.focused]': 'isFocused',
    '[class.invalid]': 'isInvalid',
    '[class.disabled]': '_disabled',
    '(focus)': 'focusChanged(true)',
    '(blur)': 'focusChanged(false)',
  },
})
export class InputDirective implements OnInit {
  isFocused = false;
  isInvalid = false;

  destroyRef = inject(DestroyRef);

  _disabled = false;
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }

  constructor(private ngControl: NgControl) {}

  ngOnInit(): void {
    this.ngControl.statusChanges?.pipe(
      tap(() => this.updateValidity()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private focusChanged(newValue: boolean) {
    if (newValue !== this.isFocused) {
      this.isFocused = newValue;
    }
  }

  private updateValidity() {
    this.isInvalid = Boolean(this.ngControl.invalid && this.ngControl.touched);
  }
}
