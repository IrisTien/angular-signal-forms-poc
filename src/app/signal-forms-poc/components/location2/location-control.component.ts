import { Component, OnInit, computed, effect, inject, input, model } from '@angular/core';
import { Field, FormValueControl, ValidationError, WithOptionalField, type FieldTree } from '@angular/forms/signals';

export type LocationValue = {
  city: string;
  country: string;
  postalCode: string;
};

@Component({
  selector: 'app-location-control',
  standalone: true,
  imports: [Field],
  templateUrl: './location-control.component.html',
  styleUrls: ['./location-control.component.scss'],
})
export class LocationControlComponent
  implements FormValueControl<LocationValue>, OnInit
{
  private readonly fieldDirective = inject(Field);

  readonly value = model<LocationValue>({ city: '', country: '', postalCode: '' });

  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly disabled = input(false);
  readonly pending = input(false);
  readonly required = input(false);
  readonly ['readonly'] = input(false);

  readonly readOnlyState = computed(() => this['readonly']());
  private readonly fieldState = computed(() => this.fieldDirective.state());
  private readonly aggregatedErrors = computed(() => this.fieldState().errorSummary());

  private readonly syncValue = effect(() => {
    const next = this.fieldState().value();
    if (this.value() !== next) {
      this.value.set(next as any);
    }
  });

  protected get locationField(): FieldTree<LocationValue> {
    return this.fieldDirective.field() as any;
  }

  protected get cityField() {
    return this.locationField.city;
  }

  protected get countryField() {
    return this.locationField.country;
  }

  protected get postalCodeField() {
    return this.locationField.postalCode;
  }

  readonly errorMessages = computed(() => {
    const aggregated = this.aggregatedErrors();
    const direct = this.errors() ?? [];
    const errs = aggregated.length ? aggregated : direct;
    if (!errs.length) {
      return [] as string[];
    }
    const seen = new Set<string>();
    const messages: string[] = [];
    for (const error of errs) {
      const message = this.describeError(error);
      if (!seen.has(message)) {
        seen.add(message);
        messages.push(message);
      }
    }
    return messages;
  });

  readonly showErrors = computed(() => {
    return this.errorMessages().length > 0 && this.fieldState().touched();
  });

  readonly isDisabled = computed(() => this.disabled() || this.readOnlyState());

  ngOnInit(): void {
    this.fieldDirective.ɵregister();
  }

  private describeError(error: ValidationError.WithOptionalField): string {
    const label = this.resolveFieldLabel(error.field);
    const base = this.defaultMessage(error);
    return label ? `${label}: ${base}` : base;
  }

  private resolveFieldLabel(field?: FieldTree<unknown>): string | null {
    if (!field) {
      return null;
    }
    const name = field().name();
    if (!name) {
      return null;
    }
    const key = name.split('.').pop() ?? '';
    switch (key) {
      case 'city':
        return 'City';
      case 'country':
        return 'Country';
      case 'postalCode':
        return 'Postal code';
      default:
        return key;
    }
  }

  private defaultMessage(error: ValidationError.WithOptionalField): string {
    switch (error.kind) {
      case 'required':
        return 'This field is required.';
      case 'pattern':
        return 'Value must match the expected format.';
      default:
        return error.message ?? 'Value is invalid.';
    }
  }
}
