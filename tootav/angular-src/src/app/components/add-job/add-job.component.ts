import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from './../../services/dataservice.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  success = false;
  jobRegister: FormGroup;
  submitted = false;
  allStates: any;
  spin = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) {
    this.dataService.getJSON().subscribe(res => {
      this.allStates = res;
      // console.log(this.allStates);
    });
  }

  ngOnInit() {
    this.jobRegister = this.formBuilder.group({
      job_title: ['', [Validators.required]],
      url: ['', Validators.required],
      company: ['', [Validators.required]],
      state: ['', [Validators.required]],
      county: ['', [Validators.required]],
      description: ['', Validators.required]
    });
  }

  // Getter to easily get the form fields
  get f() {
    return this.jobRegister.controls;
  }

  addJob() {
    this.spin = true;
    this.submitted = true;
    if (this.jobRegister.invalid) {
      return;
    }
    const obj = {
      title: this.f.job_title.value,
      url: this.f.url.value,
      company: this.f.company.value,
      state: this.f.state.value,
      county: this.f.county.value,
      description: this.f.description.value
    };
    this.dataService.createJob(obj).subscribe(res => {
      this.success = true;
      this.spin = false;
    }, err => {
      console.log(err);
      this.spin = false;
    });
  }

  reloadPage() {
    location.reload();
  }

}
