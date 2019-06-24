import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminRegister: FormGroup;
  submitted = false;
  spinner = false;
  auth = false;

  constructor(private dataService: DataserviceService, private formBuilder: FormBuilder, private router: Router) {
    localStorage.clear();
  }

  ngOnInit() {
    this.adminRegister = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  focussing() {
    this.spinner = false;
  }

  // Getter to return all form fields
  get f() {
    return this.adminRegister.controls;
  }

  login() {
    this.submitted = true;
    this.spinner = true;
    if (this.adminRegister.invalid) {
      this.spinner = false;
      return;
    }

    const obj = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.dataService.loginUser(obj).subscribe(res => {
      if (res.status === true) {
        this.spinner = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('admin', res.user.admin);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('id', res.user.id);
        this.router.navigate(['cheesecake/dashboard']);
      } else {
        this.auth = true;
        this.spinner = false;
      }
    }, err => {
      this.auth = true;
      this.spinner = false;
    });
  }

}
