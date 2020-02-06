import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordComponent } from './password/password.component';
import { SecretsComponent } from './secrets/secrets.component';
import { TestsComponent } from './tests/tests.component';
import { PasswordCollectionComponent } from './password-collection/password-collection.component';

// import {HarpokratModule} from '@harpokrat/lib/';
import {HarpokratModule} from '../harpokrat/src/lib/harpokrat.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    PasswordComponent,
    SecretsComponent,
    TestsComponent,
    PasswordCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HarpokratModule.forRoot('https://api.harpokrat.com/v1', {loginRouterPath: '/login'}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
