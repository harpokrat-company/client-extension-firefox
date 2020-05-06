import {Component} from '@angular/core';
import {User, UserService} from '@harpokrat/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  register() {
    this.router.navigateByUrl('/login').then();
  }
}
