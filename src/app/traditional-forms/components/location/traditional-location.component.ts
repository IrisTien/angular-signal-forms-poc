import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-traditional-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'traditional-location.component.html',
  styleUrls: ['traditional-location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TraditionalLocationComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TraditionalLocationComponent,
    },
  ],
})
export class TraditionalLocationComponent
  implements ControlValueAccessor, Validator
{
  public locationForm: FormGroup;
  public isDisabled: boolean = false;
  private onChangeSubs: Subscription = new Subscription();

  private fb = inject(FormBuilder);
  private onRegisteredOnTouched: Function = () => {};
  private onValidatorChange: () => void = () => {};

  constructor() {
    this.locationForm = this.fb.group({
      location: [
        null,
        [
          Validators.required,
          (control: AbstractControl) => {
            const value = control.value;
            if (value === 'test') {
              return { mustBeRealLocation: true };
            }
            return null;
          },
        ],
      ],
    });
  }

  ngOnDestroy() {
    this.onChangeSubs?.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.locationForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    const sub = this.locationForm.valueChanges.subscribe(fn);
    this.onChangeSubs.add(sub);
  }

  registerOnTouched(fn: any): void {
    this.onRegisteredOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.locationForm.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, 'location');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.locationForm.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.locationForm.get(fieldName);
    console.log('hasFieldError', field, field?.invalid, field?.touched);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.locationForm.get(fieldName);
    console.log(field, field?.errors, field?.touched);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['mustBeRealLocation']) {
        return `${fieldName} must be a real location and cannot contain 'test'`;
      }
    }
    return '';
  }
}
