import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Http, Headers, Response, Request } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataserviceService {

  user: any;
  apiUrl: any;

  constructor(public http: Http) {
    this.user = localStorage.getItem('token');
    // this.apiUrl = 'https://mcjobinsight.herokuapp.com/api/v1';
    this.apiUrl = 'https://tootavapi.herokuapp.com/api/v1';
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/states.json').pipe(map(data => data.json()));
  }

  getEvents() {
    return this.http.get(this.apiUrl + '/jobs/recent').pipe(map(data => data.json()));
  }
  signupUser(obj) {
    // console.log(obj);
    return this.http.post(this.apiUrl + '/user/register', obj).pipe(map(data => data.json()));
  }
  loginUser(obj) {
    return this.http.post(this.apiUrl + '/user/login', obj).pipe(map(data => data.json()));
  }
  searchJon(searchQuery, state) {
    return this.http.get('http://localhost:3001/searchJon'  + '?title=' + searchQuery + '&state=' + state).pipe(map(data => data.json()));
    //return this.http.get(this.apiUrl + '/jobs/search?title=' + searchQuery + '&state=' + state).pipe(map(data => data.json()));
  }
  searchState(state) {
    return this.http.get('http://localhost:3001/state' + '?state=' + state).pipe(map(data => data.json()));
  }
  searchCategory(category) {
    return this.http.get('http://localhost:3001/category'  + '?title=' + category ).pipe(map(data => data.json()));
    // return this.http.get(this.apiUrl + '/title/' + category).pipe(map(data => data.json()));
  }

  addToFavourite(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/user/favorite/add', id, {headers}).pipe(map(data => data.json()));
  }

  getAllFavourites() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.get(this.apiUrl + '/user/favorite', {headers}).pipe(map(data => data.json()));
  }

  getAllUsers() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.get(this.apiUrl + '/user/all', {headers}).pipe(map(data => data.json()));
  }

  getAllJobs() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.get(this.apiUrl + '/jobs/all', {headers}).pipe(map(data => data.json()));
  }

  lockUser(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/user/lock', obj, {headers}).pipe(map(data => data.json()));
  }

  unlockUser(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/user/unlock', obj, {headers}).pipe(map(data => data.json()));
  }

  createJob(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/jobs', obj, {headers}).pipe(map(data => data.json()));
  }

  editJob(id, obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.put(this.apiUrl + '/jobs/' + id, obj, {headers}).pipe(map(data => data.json()));
  }

  deleteJob(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.delete(this.apiUrl + '/jobs/' + id, {headers}).pipe(map(data => data.json()));
  }

  addUsers(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/user/create', obj, {headers}).pipe(map(data => data.json()));
  }

  changePassword(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/user/changepass', obj, { headers }).pipe(map(data => data.json()));
  }

  sendAlert(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/alert', obj, { headers }).pipe(map(data => data.json()));
  }

  sendContactUs(obj) {
    return this.http.post(this.apiUrl + '/contact', obj).pipe(map(data => data.json()));
  }

  forgotPassword(obj) {
    return this.http.post(this.apiUrl + '/password/forgot', obj).pipe(map(data => data.json()));
  }

  resetPassword(obj) {
    return this.http.post(this.apiUrl + '/password/reset', obj).pipe(map(data => data.json()));
  }

  sendFeed(obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/feed/request', obj, { headers }).pipe(map(data => data.json()));
  }

  getAllFeeds() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.get(this.apiUrl + '/feed/all', { headers }).pipe(map(data => data.json()));
  }

  editFeed(id, obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.put(this.apiUrl + '/feed/update/' + id, obj, { headers }).pipe(map(data => data.json()));
  }

  deleteFeed(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.delete(this.apiUrl + '/feed/delete/' + id, { headers }).pipe(map(data => data.json()));
  }

  approveFeed(id, obj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/feed/approve/' + id, obj, { headers }).pipe(map(data => data.json()));
  }

  disapproveFeed(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.user);
    return this.http.post(this.apiUrl + '/feed/disapprove/' + id, null, {headers}).pipe(map(data => data.json()));
  }
}
