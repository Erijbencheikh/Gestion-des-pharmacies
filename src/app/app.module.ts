import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PharmaciesComponent } from './component/pharmacies/pharmacies.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DetailPharmacieComponent } from './component/detail-pharmacie/detail-pharmacie.component';
import { DetailMedicamentComponent } from './component/detail-medicament/detail-medicament.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { ProfileComponent } from './component/profile/profile.component';
// import { HotToastService } from '@ngneat/hot-toast';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatMenuModule } from '@angular/material/menu';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatButtonModule } from '@angular/material/button';
import { FisrtPageComponent } from './component/fisrt-page/fisrt-page.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { GoogleMapComponent } from './component/google-map/google-map.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    DetailMedicamentComponent,
    NavbarComponent,
    PharmaciesComponent,
    DetailPharmacieComponent,
    DetailMedicamentComponent,
    ProfileComponent,
    FisrtPageComponent,
    HomepageComponent,
    AboutUsComponent,
    GoogleMapComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MatMenuModule,
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    GoogleMapsModule,
    CommonModule,
    HttpClientJsonpModule,
    GooglePlaceModule,

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
