import { Component, OnInit } from '@angular/core';
import { SyncAsync } from '@angular/compiler/src/util';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUrl: string;
  splitUrl: any;
  mainUrl: string;

  constructor() {
    this.currentUrl = window.location.href;
    this.splitUrl = this.currentUrl.split('/');
    this.currentUrl = this.splitUrl[3];
    // this.mainUrl = 'http://' + this.currentUrl;
    // if (this.currentUrl === 'cheesecake') {
    //   console.log('admin');
    // } else {
    //   console.log('not admin');
    // }
  }

  ngOnInit() {
    $('.returnMenu').click(function () {
      $('#sidebar-wrapper').toggleClass('sidebar-toggle');
    });
  }

}
