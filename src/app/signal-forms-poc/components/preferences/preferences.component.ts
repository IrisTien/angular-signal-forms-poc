import { CommonModule } from '@angular/common';
import { Component, input, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Field, FieldTree } from '@angular/forms/signals';
import { User } from '../../../model/user';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, Field, ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  preferencesForm = input.required<FieldTree<string[], string>>();
  user = input.required<WritableSignal<User>>();

  onTouched: Function = () => {};

  onChangeSubs: Function = () => {};

  addPreference() {
    this.user().set({
      ...this.user()(),
      preferences: [...this.user()().preferences, ''],
    });
  }

  removePreference(index: number) {
    const updatedPreferences = this.user()().preferences.filter(
      (_, i) => i !== index
    );
    this.user().set({
      ...this.user()(),
      preferences: updatedPreferences,
    });
  }
}
