import { CommonModule } from '@angular/common';
import { Component, computed, input, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, Field, ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  preferencesForm = input.required<FieldTree<string[], string>>();

  preferences = computed(() => this.preferencesForm()().value);

  onTouched: Function = () => {};

  onChangeSubs: Function = () => {};

  addPreference() {
    this.preferences().set([
      ...this.preferences()(),
      ''
    ]);
  }

  removePreference(index: number) {
    const updatedPreferences = this.preferences()().filter(
      (_, i) => i !== index
    );
    this.preferences().set(updatedPreferences);
  }
}
