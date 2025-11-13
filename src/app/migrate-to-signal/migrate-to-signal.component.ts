import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-migrate-to-signal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './migrate-to-signal.component.html',
  styleUrls: ['./migrate-to-signal.component.scss'],
})
export class MigrateToSignalComponent {
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