import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardChildComponent } from './components/dashboard-child/dashboard-child.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddJobsComponent } from './components/add-jobs/add-jobs.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { AddFeedsComponent } from './components/add-feeds/add-feeds.component';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent , runGuardsAndResolvers: 'always'},
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'favourites', component: FavoritesComponent, canActivate: [AuthGuard] },
  // { path: 'add-jobs', component: AddJobsComponent },
  { path: 'passreset/:token', component: HomeComponent },
  { path: 'cheesecake/login', component: AdminLoginComponent },
  { path: 'cheesecake/dashboard', component: DashboardComponent,
    children: [
      { path: '', component: DashboardChildComponent, canActivate: [AdminGuard] },
      { path: 'add-user', component: AddUserComponent, canActivate: [AdminGuard] },
      { path: 'jobs', component: JobsComponent, canActivate: [AdminGuard] },
      { path: 'feeds', component: FeedsComponent, canActivate: [AdminGuard] },
      { path: 'add-feed', component: AddFeedsComponent, canActivate: [AdminGuard] },
      { path: 'add-job', component: AddJobComponent, canActivate: [AdminGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AdminGuard] }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
