import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PasswordCollectionComponent } from './password-collection/password-collection.component';
import { TestsComponent } from './tests/tests.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'homepage', component: PasswordCollectionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
