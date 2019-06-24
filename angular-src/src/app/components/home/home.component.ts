import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {


  // tslint:disable-next-line:max-line-length
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachussets', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  categories = [
    'Accounting/ Finance',
    'Admin',
    'Arts',
    'Customer Service',
    'Domestic /Handyman',
    'Education',
    'Engineering/ Technical',
    'Government',
    'Healthcare',
    'Human Resources',
    'Hospitality',
    'Tech/ IT',
    'Legal',
    'Manufacturing/ Maintenance',
    'PR/ Advertising/ Marketing',
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
  innerWidth: any;
  bigScreen = false;
  smallScreen = false;
  less = false;
  less2 = false;
  slic = 3;
  slic2 = 3;
  resetPass: FormGroup;
  submittedF = false;
  notSame = false;
  goodResponse = false;
  badResponse = false;
  token: string;


  // tslint:disable-next-line:member-ordering
  searchItems: any;
  currentUrl: string;
  constructor(private dataservice: DataserviceService, public router: Router, private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.searchItems = JSON.parse(localStorage.getItem('searchItems'));

    this.innerWidth = window.innerWidth;

    this.currentUrl = window.location.href;
    if (this.currentUrl.includes('/passreset')) {
      this.token = this.route.snapshot.paramMap.get('token');
    }
  }

  ngOnInit() {
    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }

    this.subscribe = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.resetPass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    });

    if (this.innerWidth <= 554) {
      this.smallScreen = true;
      this.bigScreen = false;
    } else {
      this.smallScreen = false;
      this.bigScreen = true;
    }
  }

  ngAfterViewInit() {
    if (this.currentUrl.includes('/passreset')) {
      document.getElementById('resetButton').click();
    }
  }

  showmore() {
    if (this.less === true) {
      this.slic = 3;
      this.less = false;
    } else if (this.less === false) {
      this.slic = 50;
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

  get f() {
    return this.subscribe.controls;
  }

  get ff() {
    return this.resetPass.controls;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 554) {
      this.smallScreen = true;
      this.bigScreen = false;
    } else {
      this.smallScreen = false;
      this.bigScreen = true;
    }
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

  onFocus() {
    if (this.submittedF === true) {
      this.notSame = false;
      document.getElementById('closeAlert').click();
    }
  }

  refresh() {
    this.router.navigate(['/home']);
    location.reload();
  }

  resetPassword() {
    this.submittedF = true;
    if (this.resetPass.invalid) {
      return;
    }
    if (this.ff.password.value === this.ff.confirm_password.value) {
      this.spinner.show();
      const obj = {
        email: localStorage.getItem('email'),
        password: this.ff.password.value,
        token: this.token
      };
      this.dataservice.resetPassword(obj).subscribe(res => {
        console.log(res);
        this.spinner.hide();
        document.getElementById('dismiss-firsts').click();
        document.getElementById('second-modals').click();
        this.goodResponse = true;
      }, err => {
        console.log(err);
        this.spinner.hide();
        document.getElementById('dismiss-firsts').click();
        document.getElementById('second-modals').click();
        this.badResponse = true;
      });
    } else {
      this.notSame = true;
    }
  }

}
