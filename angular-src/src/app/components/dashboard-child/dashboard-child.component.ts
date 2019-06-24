import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './../../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-child',
  templateUrl: './dashboard-child.component.html',
  styleUrls: ['./dashboard-child.component.css']
})
export class DashboardChildComponent implements OnInit {

  status: string;
  locked: boolean;
  check: string;
  allUsers: any;
  usersAmount = 0;
  jobAmount = 0;
  searchUsers: any;
  p = 1;
  spinning_user = true;
  spinning_job = true;
  spinning_feed = true;
  allFeeds: any;

  constructor(private dataService: DataserviceService, private router: Router) {
    if (localStorage.getItem('count') !== '1') {
      setTimeout(() => {
        localStorage.setItem('count', '1');
        window.location.reload();
      }, 1000);
    }
    this.dataService.getAllUsers().subscribe(res => {
      this.allUsers = res;
      if (this.allUsers.length !== 0) {
        this.usersAmount = this.allUsers.length;
      }
      this.allUsers.forEach(element => {
        element.spinning = false;
        if (element.active === 1) {
          element.status = 'Unlocked';
          element.status_icon = 'assets/icons/unlock.png';
        } else {
          element.status = 'Locked';
          element.status_icon = 'assets/icons/lock.png';
        }
      });
      this.spinning_user = false;
      // console.log(this.allUsers);
    });
    this.dataService.getAllJobs().subscribe(res => {
      if (res.length !== 0) {
        this.jobAmount = res.length;
      }
      this.spinning_job = false;
    });
    this.dataService.getAllFeeds().subscribe(res => {
      // console.log(res);
      this.allFeeds = res.length;
      this.spinning_feed = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  changeStatus(id) {
    const obj = {
      id: String(id)
    };
    this.allUsers.forEach(element => {
      if (element.id === id) {
        element.spinning = true;
        if (element.status === 'Unlocked') {
          this.dataService.lockUser(obj).subscribe(res => {
            location.reload();
          }, err => console.log(err));
        } else {
          this.dataService.unlockUser(obj).subscribe(res => {
            location.reload();
          }, err => console.log(err));
        }
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/cheesecake/dashboard']);
  }

}
