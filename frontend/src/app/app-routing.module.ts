import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home-rnf/components/login/login.component';
import { LogoutComponent } from './home-rnf/components/logout/logout.component';
import { NavHomeComponent } from './home-rnf/components/nav-home/nav-home.component';
import { LazyDialogLoader } from './home-rnf/services/lazy-dialog-loader.service';
import { LogoutLinkService } from './home-rnf/services/logout-link.service';

const routes: Routes = [
  {
    path: '',
    component: NavHomeComponent,
    children: [
      {
        path: 'logout',
        // Ici seulement pour angular, mais toujour redirigé dans le canActivate
        component: LogoutComponent,
        canActivate: [ LogoutLinkService ]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [ LazyDialogLoader ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
