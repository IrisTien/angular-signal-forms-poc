import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Field, form, required, validate } from '@angular/forms/signals';
import { Location } from '../../../model/user';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, Field, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LocationComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: LocationComponent,
    },
  ],
})
export class LocationComponent implements ControlValueAccessor, Validator {
  locationInfo = signal<Location>({
    location: '',
  });
  locationForm = form<Location>(this.locationInfo, (path) => {
    required(path.location, { message: 'Location is required' });
    validate(path.location, (ctx) => {
      const location = ctx.valueOf(path.location);
      if (location === 'test') {
        return {
          kind: 'custom',
          message: 'Location must be a real location',
        };
      }
      return null;
    });
  });

  onRegisteredOnChanged: Function = () => {};
  onRegisteredOnTouched: Function = () => {};

  constructor() {
    effect(() => {
      const value = this.locationInfo();
      this.onRegisteredOnChanged(value);
    });
  }

  writeValue(value: Location) {
    // Handle the incoming value and update the signal
  }

  registerOnChange(fn: any): void {
    this.onRegisteredOnChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onRegisteredOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('Validation errors for', control);
    if (this.locationForm().valid()) {
      return null;
    }

    let errors: any = {};
    errors = this.addControlErrors(errors, 'location');
    return errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    console.log('registerOnValidatorChange called');
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.locationForm.location().errors();

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }
    return errors;
  }
}
