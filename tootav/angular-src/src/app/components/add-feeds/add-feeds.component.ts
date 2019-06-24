import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-feeds',
  templateUrl: './add-feeds.component.html',
  styleUrls: ['./add-feeds.component.css']
})
export class AddFeedsComponent implements OnInit {

  addJob: FormGroup;
  submitted = false;
  spinning = false;
  form_error = false;
  form_success = false;
  submittedSuccess = false;

  constructor(private dataService: DataserviceService, private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.addJob = this.fromBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      company: ['', Validators.required],
      website: ['', Validators.required],
      feed_url: ['', Validators.required]
    });
  }


  get f() {
    return this.addJob.controls;
  }

  removeAlert() {
    this.form_error = false;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addJobs() {
    this.submitted = true;
    this.spinning  = true;
    if (this.addJob.invalid) {
      return;
    }
    this.submittedSuccess = true;
    const obj = {
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      company: this.f.company.value,
      website: this.f.website.value,
      feed_url: this.f.feed_url.value
    };

    this.dataService.sendFeed(obj).subscribe(res => {
      console.log(res);
      this.submitted = false;
      this.submittedSuccess = false;
      this.spinning = false;
      this.form_success = true;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, err => {
      console.log(err);
      this.form_error = true;
      this.submitted = false;
      this.spinning = false;
      this.submittedSuccess = false;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }

}
