import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { PharmaciesComponent } from './component/pharmacies/pharmacies.component';
import { DetailPharmacieComponent } from './component/detail-pharmacie/detail-pharmacie.component';
import { DetailMedicamentComponent } from './component/detail-medicament/detail-medicament.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FisrtPageComponent } from './component/fisrt-page/fisrt-page.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { GoogleMapComponent } from './component/google-map/google-map.component';
import { HomepageComponent } from './component/homepage/homepage.component';
const routes: Routes = [
  { path: '', redirectTo: 'first-page', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'detailPharmacie/:id',
    component: DetailPharmacieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacie',
    component: PharmaciesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detailMedicament/:id',
    component: DetailMedicamentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'first-page', component: FisrtPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  {
    path: 'google-map',
    component: GoogleMapComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home-page', component: HomepageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
