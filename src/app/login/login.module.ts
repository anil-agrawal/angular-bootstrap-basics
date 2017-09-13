import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { UserService } from './../services/user/user.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [LoginComponent],
  providers: [UserService],
})
export class LoginModule {
}
