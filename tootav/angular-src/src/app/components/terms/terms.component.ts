import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  currentUrl: string;
  // splitUrl: any;
  // mainUrl: string;
  privacy = false;
  terms = false;

  constructor() {
    this.currentUrl = window.location.href;
    // console.log(this.currentUrl.includes('/terms'));
    // this.splitUrl = this.currentUrl.split('/');
    // this.currentUrl = this.splitUrl[2];
    // console.log(this.currentUrl);
    // this.mainUrl = 'http://' + this.currentUrl;
    if (this.currentUrl.includes('/terms')) {
      this.terms = true;
      this.privacy = false;
    } else {
      this.terms = false;
      this.privacy = true;
    }
  }

  ngOnInit() {
  }

  reload() {
    window.location.reload();
  }

}
