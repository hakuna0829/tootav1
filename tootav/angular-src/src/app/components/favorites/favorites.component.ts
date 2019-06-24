import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from './../../services/dataservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachussets', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
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
  jobs: any;
  mobile = false;
  state: any;
  searchQuery: any;
  min1 = -10;
  max1 = 50;
  step = 5;
  stepRange = [0, 40];
  filter = { state: '' };
  error: boolean;
  subscribe: FormGroup;
  submitted = false;
  spin = false;
  success = false;
  failed = false;
  allFavorites: any;
  favoritesLength: any;
  spinn = false;


  // tslint:disable-next-line:member-ordering
  searchItems: any;
  constructor(private dataservice: DataserviceService, public router: Router, private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
      this.spinn = true;
    this.searchItems = JSON.parse(localStorage.getItem('searchItems'));
    this.dataservice.getAllFavourites().subscribe(res => {
      // console.log(res.favorites);
      this.allFavorites = res.favorites;
      this.favoritesLength = this.allFavorites.length;
      this.spinn = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }

    this.subscribe = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  get f() {
    return this.subscribe.controls;
  }

  setradio(state) {
    console.log(state);
    this.filter.state = state;
    this.scrollDownOnClick();
  }

  scrollDownOnClick() {
    const el = document.getElementById('scrollHere');
    el.scrollIntoView();
  }

  clearSearch() {
    this.searchItems = [];
    localStorage.removeItem('searchItems');
  }

  moveToSearch() {

    if (this.searchQuery === undefined && this.state === undefined) {
      this.error = true;
      return;
    } else {
      const getSearchItems = JSON.parse(localStorage.getItem('searchItems'));

      if (getSearchItems === undefined || getSearchItems === null) {
        const newS = [this.searchQuery];
        localStorage.setItem('searchItems', JSON.stringify(newS));
      } else {
        // console.log(getSearchItems);
        const existingSearch: [any] = JSON.parse(localStorage.getItem('searchItems'));
        existingSearch.push(this.searchQuery);
        localStorage.setItem('searchItems', JSON.stringify(existingSearch));

      }
      this.router.navigate(['/search'], { queryParams: { searchQuery: this.searchQuery, state: this.state } });
    }

  }
  searchState(state) {
    this.router.navigate(['/search'], { queryParams: { state: state } });
  }
  searchCategory(category) {
    this.router.navigate(['/search'], { queryParams: { searchQuery: category } });
  }
  rangeChanged(e) {

  }
  scroll() {
    window.scroll(0, 0);
  }

  alertme() {
    this.submitted = true;
    this.spin = true;
    const obj = {
      title: this.f.title.value,
      location: this.f.location.value
    };
    if (this.subscribe.invalid) {
      this.spin = false;
      return;
    }
    this.dataservice.sendAlert(obj).subscribe(res => {
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
