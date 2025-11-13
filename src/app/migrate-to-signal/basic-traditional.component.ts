import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-traditional',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './basic-traditional.component.html',
  styleUrls: ['./basic-traditional.component.scss'],
})
export class BasicTraditionalComponent {
  public userForm: FormGroup;
  public isFormValid: boolean = false;

  private fb = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
    });

    this.userForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });
  }

  onSubmit() {
    console.log('Form Submitted', this.userForm.value);
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }
}