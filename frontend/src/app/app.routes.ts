import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { dashboardRoutes } from './features/dashboard/dashboad.routes';
import { AuthLayoutComponent } from './features/auth/layout/auth-layout.component';
import { DashboardLayoutComponent } from './features/dashboard/layout/dashboard-layout.component';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: authRoutes,
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/layout/dashboard-layout.component')
            .then(m => m.DashboardLayoutComponent),
        children: dashboardRoutes,
        canActivate: [authGuard],
    }

];
