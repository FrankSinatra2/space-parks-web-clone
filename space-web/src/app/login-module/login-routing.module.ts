import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './login.module';

const routes: Route[] = [
  {
    path: '',
    component: LoginComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LoginModule
  ],
  exports: [
    RouterModule,
    LoginModule
  ]
})
export class LoginRoutingModule {}
