import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordComponent } from './password/password.component';
import { TestsComponent } from './tests/tests.component';
import { PasswordCollectionComponent } from './password-collection/password-collection.component';
import { HarpokratModule } from '@harpokrat/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    PasswordComponent,
    TestsComponent,
    PasswordCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HarpokratModule.forRoot(
      'https://api.harpokrat.com:443/v1',
      {
        loginRouterPath: '/login'
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
