import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  allFeeds: any;
  p = 1;
  spinning_feed = true;
  edit = false;
  spin = false;

  // Edit values
  e_name: string;
  e_email: string;
  e_phone: string;
  e_company: string;
  e_website: string;
  e_feed_url: string;
  e_id: number;
  searchFeeds: any;
  approvalStatus: any;

  approvalForm: FormGroup;
  submitted = false;
  currentFeedback: any;
  currentId: any;
  showValidation = false;
  spinapprove = false;
  success = false;
  expiry: any;
  alreadySet = false;

  constructor(private dataService: DataserviceService, private formBuilder: FormBuilder) {
    this.dataService.getAllFeeds().subscribe(res => {
      // console.log(res);
      this.spinning_feed = false;
      this.allFeeds = res;
      this.allFeeds.forEach(element => {
        element.spin_delete = false;
        element.process = false;
      });
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.approvalForm =  this.formBuilder.group({
      feedback_url: ['', Validators.required],
      expiry: ['', Validators.required]
    });
  }

  get f() {
    return this.approvalForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  delete(id) {
    this.allFeeds.forEach(element => {
      if (element.id === id) {
        element.spin_delete = true;
      }
    });
    if (confirm('Are you sure you want to delete this feed entry?')) {
      // Delete It
      this.dataService.deleteFeed(id).subscribe(res => {
        alert('Successfully deleted job');
        location.reload();
      }, err => console.log(err));
    } else {
      // Do nothing!
      location.reload();
    }
  }

  reload() {
    location.reload();
  }

  approval(id) {
    this.allFeeds.forEach(element => {
      if (element.id === id) {
        this.currentId = id;
        element.process = true;
        this.approvalStatus = element.approved;
        this.currentFeedback = element.feed_url;
        if (this.currentFeedback === ' ') {
          this.showValidation = true;
        }
      }
    });
  }

  toggleApproval(id) {
    this.allFeeds.forEach(element => {
      if (element.id === id) {
        element.process = true;
        this.approvalStatus = element.approved;
      }
    });

    if (this.approvalStatus === 1) {
      if (confirm('Are you sure you want to disapprove this feed entry?')) {
        // Disapprove It
        this.dataService.disapproveFeed(id).subscribe(res => {
          alert('Successfully Dispproved Feed');
          location.reload();
        }, err => console.log(err));
      } else {
        // Do nothing!
        location.reload();
      }
    } else {
      // Approve It
      this.submitted = true;
      this.spinapprove = true;
      if (this.showValidation) {
        if (this.approvalForm.invalid) {
          return;
        }
        const obj = {
          feed_url: this.f.feedback_url.value,
          expiry: this.f.expiry.value
        };
        this.dataService.approveFeed(id, obj).subscribe(res => {
          this.spinapprove = false;
          if (res.status === true) {
            this.success = true;
          }
        }, err => {
          console.log(err);
          this.spinapprove = false;
        });
      } else {
        const obj = {
          feed_url: this.currentFeedback,
          expiry: this.expiry
        };
        console.log(this.expiry);
        this.dataService.approveFeed(id, obj).subscribe(res => {
          this.spinapprove = false;
          if (res.status === true) {
            this.success = true;
          }
        }, err => {
          console.log(err);
          this.spinapprove = false;
        });
      }
    }
  }

  editter(id) {
    this.edit = true;
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 'fast');
    this.allFeeds.forEach(element => {
      if (element.id === id) {
        this.e_name = element.name;
        this.e_email = element.email;
        this.e_company = element.company;
        this.e_phone = element.phone;
        this.e_website = element.website;
        this.e_feed_url = element.feed_url;
        this.e_id = element.id;
      }
    });
  }

  update() {
    this.spin = true;
    const id = this.e_id;
    const obj = {
      name: this.e_name,
      email: this.e_email,
      company: this.e_company,
      phone: this.e_phone,
      website: this.e_website,
      feed_url: this.e_feed_url
    };
    this.dataService.editFeed(id, obj).subscribe(res => {
      this.spin = false;
      alert('Successfully editted feed');
      location.reload();
    }, err => console.log(err));
  }

}
