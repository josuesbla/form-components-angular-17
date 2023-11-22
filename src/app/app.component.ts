import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDirective } from './input/input.directive';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormErrorComponent } from './form-error/form-error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, InputDirective, FormFieldComponent, FormErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  textValue = null;
  numberValue = 10;

  formGroup = this.fb.group({
    text: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(2),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}
}
