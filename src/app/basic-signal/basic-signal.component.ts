import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleUser } from '../model/user';
import { Field, FieldTree, form, required, submit } from '@angular/forms/signals';
import { lastValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-basic-signal',
  standalone: true,
  imports: [
    CommonModule,
    Field,
    ReactiveFormsModule,
  ],
  templateUrl: './basic-signal.component.html',
  styleUrls: ['./basic-signal.component.scss'],
})
export class BasicSignalComponent {
  public user = signal<SimpleUser>({
    firstName: '',
  });
  public userForm = form<SimpleUser>(this.user, (path) => {
    required(path.firstName, { message: 'First Name is required' });
  });

  onSubmit() {
    submit(this.userForm, (form: FieldTree<SimpleUser, string | number>) => {
      console.log('Submitted form data:', form().value());
      return lastValueFrom(of(undefined));
    });
  }
}