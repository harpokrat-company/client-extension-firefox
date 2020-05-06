import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {flatMap} from "rxjs/operators";

import {HclwService, Secret} from "@harpokrat/hcl";
import {AuthService, SecretService, Relationship, Resource} from "@harpokrat/api";

import {sendWebExtMessage} from '../webext-messaging';

@Component({
  selector: 'web-ext-add-pass',
  templateUrl: './web-ext-add-pass.component.html',
  styleUrls: ['./web-ext-add-pass.component.scss']
})
export class WebExtAddPassComponent implements OnInit {

	account = {
		name: "",
		domain: "",
		login: "",
		pass: ""
	}

        constructor(private router: Router,
		    private $secretService: SecretService,
		    private $authService: AuthService,
		    private $hclwService: HclwService) {
		sendWebExtMessage("is_account_pending", {}, (res) => {
			if (res.success) {
				this.account = res.account
				this.account.login = res.account.user
			}
		})
        }

	ngOnInit() {
	}

	abort(account) {
		sendWebExtMessage("delete_pending_account", account, (res) => {})
		this.router.navigate(['/']).then();
	}

	addAccount(account) {
		this.$hclwService.createSecret().subscribe((s) => {
			s.name = account.name
			s.login = account.login
			s.password = account.pass
			s.domain = account.domain
			let obs = this.$secretService.create({
				content: s.getContent(this.$authService.key),
			}, {'owner': Relationship.of(this.$authService.currentUser)});
			obs.pipe(
				flatMap((resource) => this.$hclwService.createSecret(this.$authService.key, resource.attributes.content)),
			).subscribe(
				(resource) => {
					console.log(resource);
					sendWebExtMessage("delete_pending_account", account, (res) => {})
					this.router.navigate(['/']).then();
				},
				() => {
					//this.error = 'An error occurred';
					sendWebExtMessage("delete_pending_account", account, (res) => {})
					this.router.navigate(['/']).then();
				},
				);
		});
	}
}

