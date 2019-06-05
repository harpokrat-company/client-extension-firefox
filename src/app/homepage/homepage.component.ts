import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // Data Mockup
  passwords: Object[] = [
    {
      "site": "youtube.com",
      "password": "azerty"
    },
    {
      "site": "gmail.com",
      "password": "azerty"
    },
    {
      "site": "twitter.com",
      "password": "azerty"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
