import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../harpokrat/src/lib/services/auth.service";
import {Observable} from 'rxjs';


@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {

  readonly authenticatedObservable: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    this.authenticatedObservable = authService.authenticatedObservable;
  }


  ngOnInit() {
  }

  connexion(): void {
  }
}
