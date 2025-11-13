import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/signal-forms',
        pathMatch: 'full'
    },
    {
        path: 'basic-signal',
        loadComponent: () => import('./basic-signal/basic-signal.component').then(c => c.BasicSignalComponent)
    },
    {
        path: 'basic-traditional',
        loadComponent: () => import('./migrate-to-signal/basic-traditional.component').then(c => c.BasicTraditionalComponent)
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
