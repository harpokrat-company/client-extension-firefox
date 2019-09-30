import { Component, OnInit } from '@angular/core';
import { Password } from '../password'
import { sendWebExtMessage } from '../webext-messaging'

@Component({
  selector: 'app-password-collection',
  templateUrl: './password-collection.component.html',
  styleUrls: ['./password-collection.component.css']
})
export class PasswordCollectionComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    sendWebExtMessage("popup_current_url_accounts", {}, (res) => {
      if (res.success) {
        if (res.accounts.length != 0) {
          this.passwords = []
          for (let i of res.accounts) {
            this.passwords.push({
              "url": i.url,
              "username": i.username,
              "password": i.password
            })
          }
        }
      }
    })
    if (this.passwords.length == 0) {
      this.passwords = [
        {
          "url": "youtube.com",
          "username": "qwerty",
          "password": "azerty-Youtube"
        },
        {
          "url": "gmail.com",
          "username": "qwerty",
          "password": "azerty-gmail"
        },
        {
          "url": "twitter.com",
          "username": "qwerty",
          "password": "azerty-twitter"
        },
      ]
    }
  }

  // Data Mockup
  passwords: Password[] = []

  alphabeticalOrder: boolean = false;

  addPassword() {
    this.passwords.push({
      "url": "added.com",
      "username": "qwerty",
      "password": "azerty-Youtube"
    });
  }

  removePassword() {
    this.passwords.pop();
  }

  orderPassword() {
    this.passwords.sort((a: Password, b: Password) => {
      if (a.url > b.url) {
        return this.alphabeticalOrder ? -1 : 1;
      }
      return this.alphabeticalOrder ? 1 : -1;
    })
    this.alphabeticalOrder = !this.alphabeticalOrder;
    return 0;
  }
}
