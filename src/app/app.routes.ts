import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/signal-forms',
        pathMatch: 'full'
    },
    {
        path: 'migrate-to-signal',
        loadComponent: () => import('./migrate-to-signal/migrate-to-signal.component').then(c => c.MigrateToSignalComponent)
    },
    {
        path: 'signal-forms',
        loadComponent: () => import('./signal-forms-poc/signal-forms-poc.component').then(c => c.SignalFormsPocComponent)
    },
    {
        path: 'traditional-forms',
        loadComponent: () => import('./traditional-forms/traditional-forms.component').then(c => c.TraditionalFormsComponent)
    }
];
