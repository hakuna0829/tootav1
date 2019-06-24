import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './../../services/dataservice.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  allJobs: any;
  p = 1;
  spinning_jobs = true;
  edit = false;
  spin = false;

  // Edit values
  e_title: string;
  e_url: string;
  e_company: string;
  e_state: string;
  e_county: string;
  e_description: string;
  e_id: number;
  searchJobs: any;

  constructor(private dataService: DataserviceService) {
    this.dataService.getAllJobs().subscribe(res => {
      this.spinning_jobs = false;
      this.allJobs = res;
      this.allJobs.forEach(element => {
        element.spin_delete = false;
      });
      // console.log(this.allJobs);
    });
  }

  ngOnInit() {
  }

  delete(id) {
    this.allJobs.forEach(element => {
      if (element.id === id) {
        element.spin_delete = true;
      }
    });
    // alert('Are you sure?');
    if (confirm('Are you sure you want to delete this job entry?')) {
      // Delete It
      this.dataService.deleteJob(id).subscribe(res => {
        alert('Successfully deleted job');
        location.reload();
      }, err => console.log(err));
    } else {
      // Do nothing!
      location.reload();
    }
  }

  editter(id) {
    this.edit = true;
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 'fast');
    this.allJobs.forEach(element => {
      if (element.id === id) {
        this.e_title = element.title;
        this.e_url = element.url;
        this.e_company = element.company;
        this.e_county = element.county;
        this.e_state = element.state;
        this.e_description = element.description;
        this.e_id = element.id;
      }
    });
  }

  update() {
    this.spin = true;
    const id = this.e_id;
    const obj = {
      title: this.e_title,
      url: this.e_url,
      company: this.e_company,
      county: this.e_county,
      state: this.e_state,
      description: this.e_description
    };
    this.dataService.editJob(id, obj).subscribe(res => {
      this.spin = false;
      alert('Successfully editted job');
      location.reload();
    }, err => console.log(err));
  }

}
