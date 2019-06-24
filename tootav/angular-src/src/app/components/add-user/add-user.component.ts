import { FavoritesComponent } from './../favorites/favorites.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from './../../services/dataservice.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerUsers: FormGroup;
  submitted = false;
  spin = false;
  success = false;

  constructor(private formBuiler: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.registerUsers = this.formBuiler.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Getter to easily get the form values
  get f() {
    return this.registerUsers.controls;
  }

  reloadPage() {
    location.reload();
  }

  addUser() {
    this.submitted = true;
    this.spin = true;
    if (this.registerUsers.invalid) {
      return;
    }
    const obj = {
      name: this.f.lastname.value + ' ' + this.f.firstname.value,
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.dataService.addUsers(obj).subscribe(res => {
      console.log(res);
      this.success = true;
    }, err => console.log(err));
  }

}
