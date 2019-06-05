import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  email: String = "";
  password: String = "";
  connexion(): void {
    console.log("aaaa");
    this.password = "OK";
    this.email = "OK";
  }
}
