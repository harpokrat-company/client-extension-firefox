import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '@harpokrat/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }


  ngOnInit() {
  }

  email: String = "";
  password: String = "";
  failure: boolean = false;
  token: String = "";

  connexion(): void {
    if (this.email.length > 0 && this.password.length > 0) {
      this.tokenService.login(this.email.toString(), this.password.toString()).subscribe(
        success => {
          console.log('success');
          console.log(success);
          this.token = success.attributes.token;
          this.failure = false;
          //this.router.navigate(['/homepage']);
        },
        error => {
          this.failure = true;
          this.token = "";
          console.log(error)
        }
      );  
    }
  }
}
