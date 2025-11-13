import { Component, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  apply,
  applyEach,
  applyWhen,
  disabled,
  email,
  Field,
  form,
  min,
  minLength,
  required,
  Schema,
  schema,
  submit,
  validate,
  validateAsync,
  validateTree,
} from '@angular/forms/signals';
import { catchError, delay, lastValueFrom, map, of } from 'rxjs';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { User } from './user';
import { LocationComponent } from './components/location/location.component';

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'This field is required' });
  minLength(path, 2, { message: 'Name must be at least 2 characters' });
});

const emailNotifiedSchema: Schema<User> = schema<User>((path) => {
  apply(path.email, nameSchema);
  email(path.email, { message: 'Please enter a valid email' });
});

const commonSchema: Schema<User> = schema<User>((path) => {
  apply(path.firstName, nameSchema);
  apply(path.lastName, nameSchema);
  applyWhen(
    path,
    (ctx) => ctx.valueOf(path.notified) === true,
    emailNotifiedSchema
  );
  disabled(path.email, (ctx) =>
    ctx.valueOf(path.notified) === false
      ? 'Email is not required when notified is disabled!'
      : false
  );
  min(path.age, 18, { message: 'Age must be at least 18' });
  applyEach(path.preferences, (path) => {
    apply(path, nameSchema);
  }),
    validate(path.preferences, (ctx) => {
      const preferences = ctx.valueOf(path.preferences);
      if (!preferences || preferences?.length === 0) {
        return {
          kind: 'custom',
          message: 'At least one preference is required',
        };
      }
      return null;
    }),
    validateTree(path, (ctx) => {
      const invalidName =
        ctx.valueOf(path.firstName) === ctx.valueOf(path.lastName) &&
        ctx.valueOf(path.firstName) !== '';
      if (!invalidName) {
        return null;
      }
      return {
        kind: 'custom',
        field: ctx.field.lastName,
        message: 'First name and last name cannot be the same',
      };
    });
  validateAsync(path.email, {
    params: (ctx) => ({
      value: ctx.value(),
    }),
    factory: (params) => {
      return rxResource({
        params,
        stream: (p) => {
          return validateEmailNotInUse(p.params.value);
        },
      });
    },
    onError: (result, ctx) => {
      if (!result) {
        return null;
      }
      return {
        kind: 'custom',
        field: ctx.field,
        message: 'Email is already in use',
      };
    },
    onSuccess: (result, ctx) => {
      return null;
    },
  });
});

function validateEmailNotInUse(email: string) {
  return of(email).pipe(
    delay(200),
    map((email) => {
      if (email.endsWith('@test.com')) {
        throw new Error('Email is already in use');
      }
      return undefined;
    })
  );
}

@Component({
  selector: 'app-signal-forms-poc',
  standalone: true,
  imports: [
    CommonModule,
    Field,
    LocationComponent,
    PreferencesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signal-forms-poc.component.html',
  styleUrls: ['./signal-forms-poc.component.scss'],
})
export class SignalFormsPocComponent {
  user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    notified: false,
    age: 0,
    preferences: [],
    locationInfo: {
      location: '',
    },
  });

  newUserForm = form(this.user, commonSchema);

  onSubmit() {
    submit(this.newUserForm, (form) => {
      this.newUserForm().reset();
      return lastValueFrom(
        of(this.newUserForm().value()).pipe(
          delay(300),
          map((data: User) => {
            if (data.email.includes('abc')) {
              throw new Error('cannot process with this email right now');
            }
            return undefined;
          }),
          catchError(() => {
            return [
              {
                kind: 'server',
                field: form.email,
                message: 'cannot process with this email right now',
              },
            ];
          })
        )
      );
    });
  }

  resetForm() {
    this.newUserForm().reset();
    this.user.set({
      firstName: '',
      lastName: '',
      email: '',
      notified: false,
      age: 0,
      preferences: [],
      locationInfo: {
        location: '',
      },
    });
  }
}
