import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataserviceService} from '../../services/dataservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from '../../auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  next: any;
  prev: any;
  state: any;
  searchQuery: any;
  jobs: any;
  jobsLength: any;
  dj = [1, 2, 3, 4, 5];
  email: any;
  allJobs: any;
  email1: any;
  password1: any;
  searchResultLocation = [];
  searchItems: any;
  // tslint:disable-next-line:max-line-length
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachussets', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  slic = 3;
  slic2 = 3;
  categories = [
    'Accounting/Finance',
    'Admin',
    'Arts',
    'Customer Service',
    'Domestic /Handyman',
    'Education',
    'Engineering/Technical',
    'Government',
    'Healthcare',
    'Human Resources',
    'Hospitality',
    'Tech/ IT',
    'Legal',
    'Manufacturing/ Maintenance',
    'PR/ Advertising/Marketing',
    'Non Profit / Charity',
    'Pharma/Research',
    'Real Estate',
    'Sales',
    'Retail',
    'Telecoms',
    'Transportation',
    'Others'
  ];
  less = false;
  less2 = false;
  stated = '';
  queried = '';
  error = false;
  subscribe: FormGroup;
  submitted = false;
  spin = false;
  success = false;
  failed = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, private dataservic: DataserviceService,
    private router: Router, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {


    this.state =  this.route.snapshot.queryParamMap.get('state');
    this.stated =  this.route.snapshot.queryParamMap.get('state');
    this.spinner.show();
    this.searchQuery =  this.route.snapshot.queryParamMap.get('searchQuery');
    this.queried =  this.route.snapshot.queryParamMap.get('searchQuery');
    this.email = localStorage.getItem('email');
    
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    if (this.state !== null && this.searchQuery === null) {
      // Just state
      this.searchState();
      // console.log('state');
    } else if (this.state === null && this.searchQuery !== null) {
      // Category
      this.searchCategory();
      // console.log('category');

    } else if (this.state !== null && this.searchQuery !== null ) {
      // Search normally
      this.searchQueryAndState();
      // console.log('both');

    }

    this.searchItems = JSON.parse(localStorage.getItem('searchItems'));
  }
  searchQueryAndState() {
    this.dataservic.searchJon(this.searchQuery, this.state).subscribe((jobs) => {
      console.log(jobs);
      this.jobs = jobs;
      this.spinner.hide();
      this.jobsLength = jobs.length;
      // this.scrollDownOnClick()

    });
  }
  searchState() {
    this.dataservic.searchState(this.state).subscribe((jobs) => {
      console.log(jobs);
      this.jobs = jobs;
      this.spinner.hide();
      this.jobsLength = jobs.length;
      // this.scrollDownOnClick()
      // console.log('state');
    });
  }
  searchCategory() {
    this.dataservic.searchCategory(this.searchQuery).subscribe((jobs) => {
      console.log(jobs);
      this.jobs = jobs;
      this.spinner.hide();
      this.jobsLength = jobs.length;
      // this.scrollDownOnClick()

    });
  }
  ngOnInit() {
    this.subscribe = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  get f() {
    return this.subscribe.controls;
  }

  showmore() {
    if (this.less === true) {
      this.slic = 3;
      this.less = false;
    } else if (this.less === false) {
      this.slic = 30;
      this.less = true;
    }
  }
  showmoreCat() {
    if (this.less2 === true) {
      this.slic2 = 3;
      this.less2 = false;
    } else if (this.less === false) {
      this.slic2 = 30;
      this.less2 = true;
    }
  }

  scroll() {
    window.scroll(0, 0);
  }

  scrollDownOnClick() {
    const el = document.getElementById('scrollHere');
    el.scrollIntoView();
  }

  favourite(id) {
    const obj =  {
      id: String(id)
    };
    if (this.auth.isAuthenticated()) {
      this.spinner.show();
      this.dataservic.addToFavourite(obj).subscribe((d) => {
        // console.log(d);
        this.spinner.hide();
        alert('Added to favorites');
      });
    } else {
      $('#signupModal').modal('show');
    }
  }

  moveToSearch() {
    // if (this.searchQuery === undefined || this.state === undefined) {
    //   alert('Both fields are required');
    // } else {
    //   this.spinner.show();
    // this.dataservic.searchJon(this.searchQuery, this.state).subscribe((jobs) => {
    //   // console.log(jobs);
    //   this.spinner.hide();
    //   this.jobs = jobs;
    //   this.spinner.hide();
    //   this.jobsLength = jobs.length;
    //   if (jobs.length !== 0) {
    //     // this.scrollDownOnClick()
    //   }
    // });
    // }
    if (this.searchQuery === undefined && this.state === undefined) {
      this.error = true;
      return;
    } else {
      // const getSearchItems = JSON.parse(localStorage.getItem('searchItems'));

      // if (getSearchItems === undefined || getSearchItems === null) {
      //   const newS = [this.searchQuery];
      //   localStorage.setItem('searchItems', JSON.stringify(newS));
      // } else {
      //   // console.log(getSearchItems);
      //   const existingSearch: [any] = JSON.parse(localStorage.getItem('searchItems'));
      //   existingSearch.push(this.searchQuery);
      //   localStorage.setItem('searchItems', JSON.stringify(existingSearch));

      // }
      //alert(this.state);
      this.router.navigate(['/search'], { queryParams: { searchQuery: this.searchQuery, state: this.state } });
     // this.router.navigate(['/search'], { queryParams: { searchQuery: this.searchQuery, state: this.state } });
      //window.location.reload();
    }
  }

  searchByLocation(search) {
    this.spinner.show();
    this.state = search;

    this.moveToSearch();
  }

  searchByCategory(search) {
    this.spinner.show();
    this.searchQuery = search;

    this.moveToSearch();
  }

  alertme() {
    this.submitted = true;
    this.spin = true;
    if (this.subscribe.invalid) {
      this.spin = false;
      return;
    }
    const obj = {
      title: this.f.title.value,
      location: this.f.location.value
    };
    this.dataservic.sendAlert(obj).subscribe(res => {
      if (res.status === true) {
        this.spin = false;
        this.success = true;
        setTimeout(() => {
          location.reload();
        }, 6000);
      } else {
        this.failed = true;
        setTimeout(() => {
          location.reload();
        }, 6000);
      }
    }, err => {
      this.failed = true;
      setTimeout(() => {
        location.reload();
      }, 6000);
    });
  }

}
