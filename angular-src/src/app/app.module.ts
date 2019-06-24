import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from 'angular2-image-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RangeSliderModule  } from 'ngx-rangeslider-component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NavComponent } from './components/nav/nav.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FavoritesComponent } from './components/favorites/favorites.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardChildComponent } from './components/dashboard-child/dashboard-child.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { SettingsComponent } from './components/settings/settings.component';
import { JobsComponent } from './components/jobs/jobs.component'; // <-- import the module
import { AboutComponent } from './components/about/about.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';

import { DataserviceService } from './services/dataservice.service';
import { AddJobsComponent } from './components/add-jobs/add-jobs.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { AddFeedsComponent } from './components/add-feeds/add-feeds.component';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavComponent,
    FavoritesComponent,
    AdminLoginComponent,
    DashboardComponent,
    SideNavComponent,
    DashboardChildComponent,
    AddUserComponent,
    AddJobComponent,
    SettingsComponent,
    JobsComponent,
    AboutComponent,
    TermsComponent,
    ContactComponent,
    AddJobsComponent,
    FeedsComponent,
    AddFeedsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpModule,
    FormsModule,
    RangeSliderModule,
    FilterPipeModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [ DataserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
