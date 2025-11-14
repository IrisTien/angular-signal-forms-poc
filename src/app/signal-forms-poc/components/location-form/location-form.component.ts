import {
  Field,
  FieldTree,
  FormValueControl,
} from '@angular/forms/signals';
import { Component, inject, model } from '@angular/core';
import { Location } from '../../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, Field],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements FormValueControl<Location> {
  readonly value = model<Location>({ city: '', country: '' });

  protected get locationField(): FieldTree<Location> {
    return this.fieldDirective.field() as any;
  }

  protected get cityField() {
    return this.locationField.city;
  }

  protected get countryField() {
    return this.locationField.country;
  }

  private readonly fieldDirective = inject(Field);
}
