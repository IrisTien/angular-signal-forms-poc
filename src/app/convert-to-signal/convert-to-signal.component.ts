import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleUser } from '../model/user';
import { Field, form, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-convert-to-signal',
  standalone: true,
  imports: [
    CommonModule,
    Field,
    ReactiveFormsModule,
  ],
  templateUrl: './convert-to-signal.component.html',
  styleUrls: ['./convert-to-signal.component.scss'],
})
export class ConvertToSignalComponent {
  public user = signal<SimpleUser>({
    firstName: '',
  });

  public userForm = form(this.user, (path) => {
    required(path.firstName, { message: 'First Name is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.userForm, (form) => {
      console.log('Form Submitted:', form().value());
      return Promise.resolve([
        {
          kind: 'server',
          field: form.firstName,
          message: 'Server-side error on First Name',
        }
      ]);
    });
  }
}