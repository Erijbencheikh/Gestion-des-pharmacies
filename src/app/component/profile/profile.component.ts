import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

import { switchMap, tap } from 'rxjs';
// import { User } from './user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { user } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    age: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    photoURL: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    address: new FormControl(''),
    displayName: new FormControl(''),
  });
  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
    console.log(this.user$);
  }
  
  uploadFile(event: any, { uid }: User) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value as User;
    this.usersService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe(() => {
        this.router.navigate(['home-page']);
      });
  }
}
