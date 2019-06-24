import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {

  addJob: FormGroup;
  submitted = false;
  spinning = false;
  form_error = false;
  form_success = false;
  submittedSuccess = false;
  uploadImage = false;
  image: any;

  constructor(private dataService: DataserviceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addJob = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      company: ['', Validators.required],
      website: ['', Validators.required],
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

  upload() {
    this.uploadImage = false;
  }

  onUploadFinished($event) {
    this.image = $event.serverResponse.response.body.data.link;
  }

  addJobs() {
    this.submitted = true;

    if (this.addJob.invalid) {
      return;
    }

    if (this.image === undefined) {
      this.uploadImage = true;
      return;
    }

    this.submittedSuccess = true;
    const obj = {
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      company: this.f.company.value,
      website: this.f.website.value,
      image_url: this.image
    };

    this.dataService.sendFeed(obj).subscribe(res => {
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
