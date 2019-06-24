import { Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {DataserviceService} from '../../services/dataservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from '../../auth.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn: any;
  name: any;
  currentUrl: string;
  splitUrl: any;
  mainUrl: string;
  showSign: boolean;
  logginError = false;

  signUpForm: FormGroup;
  logInForm: FormGroup;
  forgotPassword: FormGroup;
  submittedSign = false;
  submittedForgot = false;
  confirmationError = false;
  submittedLog = false;
  signupError = false;
  conflict = false;
  goodResponse = false;
  badResponse = false;

  constructor(private dataservic: DataserviceService, private spinner: NgxSpinnerService, private auth: AuthService,
    private formBuilder: FormBuilder) {
      // console.log(this.auth.isAuthenticated());
      this.loggedIn = this.auth.isAuthenticated();
      this.name = localStorage.getItem('user');

      this.currentUrl = window.location.href;
      this.splitUrl = this.currentUrl.split('/');
      this.currentUrl = this.splitUrl[3];
      // this.mainUrl = 'http://' + this.currentUrl;
      if (this.currentUrl === 'cheesecake') {
        this.showSign = false;
      } else {
        this.showSign = true;
      }
   }

  ngOnInit() {
    const el = document.getElementById('header');
    el.scrollIntoView();

    $('.returnMenu').click(function () {
      $('#sidebar-wrapper').toggleClass('sidebar-toggle');
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirm_password: ['', [Validators.minLength(8), Validators.required]],
      fullname: ['', [Validators.required]]
    });

    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });

    this.forgotPassword = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get fs() {
    return this.signUpForm.controls;
  }

  get fl() {
    return this.logInForm.controls;
  }

  get ff() {
    return this.forgotPassword.controls;
  }

  signupUser() {
    this.submittedSign = true;
    if (this.signUpForm.invalid) {
      return;
    }

    if (this.fs.password.value === this.fs.confirm_password.value) {
      this.spinner.show();
      const data = {
        email: this.fs.email.value,
        password: this.fs.password.value,
        name: this.fs.fullname.value
    };
      // console.log(data);
      this.dataservic.signupUser(data).subscribe((e) => {
        console.log(e);
        this.spinner.hide();
        if (e.status === true) {
          localStorage.setItem('token', e.token);
          localStorage.setItem('user', e.user.name);
          localStorage.setItem('email', e.user.email);
          location.reload();
        } else {
          console.log(e.message);
          this.conflict = true;
          this.spinner.hide();
        }
      }, (err) => {
        console.log(err);
        this.spinner.hide();
        this.signupError = true;
      });
    } else {
      this.confirmationError = true;
      return;
    }
  }


   loginUser() {
     this.submittedLog = true;
     if (this.logInForm.invalid) {
       return;
     }
      this.spinner.show();
      const data = {
        email: this.fl.email.value,
        password: this.fl.password.value
      };
      // console.log(data);
      this.dataservic.loginUser(data).subscribe(e => {
        console.log(e);
        this.spinner.hide();
        if (e.status === true) {
          localStorage.setItem('token', e.token);
          localStorage.setItem('user', e.user.name);
          localStorage.setItem('email', e.user.email);
          location.reload();
        }
      }, err => {
        this.spinner.hide();
        this.logginError = true;
      });
   }

   forgotPass() {
     document.getElementById('dismiss-first').click();
     document.getElementById('second-modal').click();
   }

   sendEmail() {
    this.submittedForgot = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.spinner.show();
    const obj = {
      email: this.ff.email.value
    };

    this.dataservic.forgotPassword(obj).subscribe(res => {
      localStorage.setItem('email', this.ff.email.value);
      this.spinner.hide();
      this.goodResponse = true;
      document.getElementById('dismiss-second').click();
      document.getElementById('third-modal').click();
    }, err => {
      this.spinner.hide();
      this.badResponse = true;
      document.getElementById('dismiss-second').click();
      document.getElementById('third-modal').click();
    });
   }

   refresh() {
     location.reload();
   }

   onFocus() {
     this.goodResponse = false;
     this.badResponse = false;
   }

   logout() {
     this.spinner.show();
     localStorage.clear();
     location.reload();
   }

}
