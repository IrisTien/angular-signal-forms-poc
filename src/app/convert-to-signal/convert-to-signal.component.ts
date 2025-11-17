import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleUser } from '../model/user';
import { form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-convert-to-signal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './convert-to-signal.component.html',
  styleUrls: ['./convert-to-signal.component.scss'],
})
export class ConvertToSingalComponent {
  onSubmit() {
  }
}