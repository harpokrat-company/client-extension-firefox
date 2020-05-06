import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "@harpokrat/api";

import {sendWebExtMessage} from '../../webext-messaging';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) {

	}

  ngOnInit() {
	  this.authService.authenticatedObservable.subscribe((authenticated) => {
		  if (authenticated) {
			  sendWebExtMessage("is_account_pending", {}, (res) => {
				  if (res.success && res.account) {
					  this.router.navigate(['/webext_add_pass']).then();
					  //alert("background script completed")
				  }
			  })
		  }

	  })
  }

}
