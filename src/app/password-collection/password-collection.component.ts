import { Component, OnInit } from '@angular/core';
import { Password } from '../password'
import { sendWebExtMessage } from '../webext-messaging'

@Component({
  selector: 'app-password-collection',
  templateUrl: './password-collection.component.html',
  styleUrls: ['./password-collection.component.css']
})
export class PasswordCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sendWebExtMessage("aled", {}, (res) => {
      if (res.success) {
        alert("successfully talked with background script")
      }
    })
  }

  // Data Mockup
  passwords: Password[] = [
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
