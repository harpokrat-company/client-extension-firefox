import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Resource, SecretService} from "@harpokrat/api";
import {Observable} from "rxjs";
import {Secret} from "@harpokrat/hcl";

import {sendWebExtMessage} from '../../../../../../webext-messaging';

@Component({
  selector: 'app-password-show',
  templateUrl: './password-show.component.html',
  styleUrls: ['./password-show.component.scss']
})
export class PasswordShowComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private secretService: SecretService) {
  }

  public secret: Observable<Resource<Secret>>;

  public getPassword(passwordId) {
    this.secret = this.secretService.getReadableSecret(passwordId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPassword(params.get('id'));
    });
  }

  public extComplete(domain, login, pass) {
	    sendWebExtMessage("complete", {domain: domain, login: login, pass: pass}, (res) => {
		    if (res.success) {
			    //alert("background script completed")
		    }
	    })
  }
}
