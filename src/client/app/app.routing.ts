import { Routes, RouterModule } from '@angular/router';
import { ContentAreaComponent } from './contentArea/app.contentAreaComponent';
import { LoginComponent } from './login/app.loginComponent';
import { RegisterComponent } from './register/app.registerComponent';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component'
import { AuthGuard } from './guards/app.authGuard';

const appRoutes: Routes = [
    { path: '', component: ContentAreaComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
