import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {

}
