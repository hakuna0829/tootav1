import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './../../services/dataservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  submitted_user = false;
  submitted_admin = false;
  spin_user = false;
  success = false;
  failed = false;
  spin_admin = false;
  changeUser: FormGroup;
  changeAdmin: FormGroup;

  constructor(private dataService: DataserviceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changeAdmin = this.formBuilder.group({
      new_password_a: ['', [Validators.required, Validators.minLength(6)]],
      old_password_a: ['', [Validators.required, Validators.minLength(6)]],
      confirm_new_password_a: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.changeAdmin.controls;
  }

  reloadPage() {
    location.reload();
  }

  change_admin() {
    this.submitted_admin = true;
    this.spin_admin = true;
    if (this.changeAdmin.invalid) {
      return;
    }
    const obj = {
      old_password: this.f.old_password_a.value,
      new_password: this.f.new_password_a.value
    };
    console.log(obj);
    if (this.f.new_password_a.value === this.f.confirm_new_password_a.value) {
      this.dataService.changePassword(obj).subscribe(res => {
        console.log(res);
        this.spin_admin = false;
        this.success = true;
        setTimeout(() => {
          location.reload();
        }, 6000);
      }, err => {
        console.log(err);
        this.failed = true;
        this.spin_admin = false;
        setTimeout(() => {
          location.reload();
        }, 6000);
      });
    } else {
      return;
    }
  }

}
