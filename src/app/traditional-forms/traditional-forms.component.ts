import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TraditionalLocationComponent } from './components/location/traditional-location.component';

@Component({
  selector: 'app-traditional-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TraditionalLocationComponent],
  templateUrl: './traditional-forms.component.html',
  styleUrls: ['./traditional-forms.component.scss']
})
export class TraditionalFormsComponent {
  // Traditional properties (no signals)
  isFormValid = false;
  isSubmitting = false;
  formData: any = null;

  // Create a reactive form
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
    preferences: new FormArray([
      new FormControl('Angular'),
      new FormControl('TypeScript')
    ]),
    location: new FormControl('', [Validators.required])
  });

  constructor() {
    // Subscribe to form status changes and update property
    this.userForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });

    // Subscribe to form value changes and update property
    this.userForm.valueChanges.subscribe(value => {
      this.formData = value;
    });
  }

  get preferences() {
    return this.userForm.get('preferences') as FormArray;
  }

  addPreference() {
    this.preferences.push(new FormControl(''));
  }

  removePreference(index: number) {
    this.preferences.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.userForm.value);
        this.isSubmitting = false;
        // Reset form after successful submission
        this.userForm.reset();
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.userForm.reset();
    this.isSubmitting = false;
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
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email';
      }
      if (field.errors['min']) {
        return `${fieldName} must be at least ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${fieldName} must be at most ${field.errors['max'].max}`;
      }
    }
    return '';
  }
}