import { Routes, RouterModule } from '@angular/router';
import { contentAreaComponent } from './components/contentArea/app.contentAreaComponent';
import { LoginComponent } from './components/login/app.loginComponent';
import { RegisterComponent } from './components/register/app.registerComponent';
import { AuthGuard } from './guards/app.authGuard';

const appRoutes: Routes = [
    { path: '', component: contentAreaComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);