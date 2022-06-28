import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'game',
    loadChildren: () => import('./game-module/game-routing.module').then(M => M.GameRoutingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-module/login-routing.module').then(M => M.LoginRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
