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
}
