import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
export class ConvertToSignalComponent {
  onSubmit(event: Event) {
    event.preventDefault();
  }
}