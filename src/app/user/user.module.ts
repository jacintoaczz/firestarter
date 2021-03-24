import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { SharedModule } from '@app/shared/shared.module';

const components = [LoginPageComponent, GoogleSigninDirective];
const modules = [UserRoutingModule, SharedModule];
@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class UserModule {}
