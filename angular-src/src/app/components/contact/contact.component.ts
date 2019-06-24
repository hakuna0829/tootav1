import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from './../../services/dataservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
  contact: FormGroup;
  submitted = false;
  spin = false;
  success = false;
  failed = false;
  spinContact = false;
  feed = false;
  noFeed = false;
  uploadImage = false;
  image: any;
  addJob: FormGroup;

  // tslint:disable-next-line:member-ordering
  searchItems: any;
  successful: boolean;
  submittedContact: boolean;
  contactError = false;
  contactSuccess = false;

  form_error = false;
  form_success = false;
  submittedSuccess = false;
  user: any;

  constructor(private dataservice: DataserviceService, public router: Router, private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
    this.searchItems = JSON.parse(localStorage.getItem('searchItems'));
    this.user = localStorage.getItem('token');
  }

  ngOnInit() {
    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }

    this.subscribe = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.contact = this.formBuilder.group({
      purpose: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.email, Validators.required]],
    });

    this.addJob = this.formBuilder.group({
      // purpose: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      company: ['', Validators.required],
      website: ['', Validators.required],
    });
  }

  radio() {
    console.log(this.fc.purpose.value);
  }

  get f() {
    return this.subscribe.controls;
  }

  get fc() {
    return this.contact.controls;
  }

  get fa() {
    return this.addJob.controls;
  }

  upload() {
    this.uploadImage = false;
  }

  onUploadFinished($event) {
    this.image = $event.serverResponse.response.body.data.link;
  }

  setradio(state) {
    console.log(state);
    this.filter.state = state;
    this.scrollDownOnClick();
  }

  removeAlert() {
    this.form_error = false;
  }

  scrollDownOnClick() {
    const el = document.getElementById('scrollHere');
    el.scrollIntoView();
  }

  clearSearch() {
    this.searchItems = [];
    localStorage.removeItem('searchItems');
  }

  showFeed() {
    if (this.user === null) {
      this.noFeed = true;
    } else {
      this.feed = true;
    }
  }

  notShow() {
    this.feed = false;
    this.noFeed = false;
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

  reload() {
    this.successful = true;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  sendContactUs() {
    this.submittedContact = true;
    if (this.contact.invalid) {
      return;
    }
    if (this.image === undefined && this.feed === true) {
      this.uploadImage = true;
      return;
    }
    // console.log(this.fc.purpose.value);
    this.spinContact = true;
    const obj = {
      purpose: this.fc.purpose.value,
      message: this.fc.message.value,
      email: this.fc.email.value
    };
    console.log('contact form');
    console.log(obj);

    this.dataservice.sendContactUs(obj).subscribe(res => {
      // console.log(res);
      this.spinContact = false;
      this.contactSuccess = true;
      setTimeout(() => {
        location.reload();
      }, 3000);
    }, err => {
      this.spinContact = false;
      this.contactError = true;
    });
  }


  addJobs() {
    this.submitted = true;

    if (this.addJob.invalid) {
      return;
    }

    // if (this.image === undefined) {
    //   this.uploadImage = true;
    //   return;
    // }

    this.submittedSuccess = true;
    const obj = {
      name: this.fa.name.value,
      email: this.fa.email.value,
      phone: this.fa.phone.value,
      company: this.fa.company.value,
      website: this.fa.website.value,
      image_url: this.image
    };

    console.log('add job form');
    console.log(obj);

    this.dataservice.sendFeed(obj).subscribe(res => {
      console.log(res);
      this.submitted = false;
      this.submittedSuccess = false;
      this.form_success = true;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, err => {
      console.log(err);
      this.form_error = true;
      this.submitted = false;
      this.submittedSuccess = false;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }

}
