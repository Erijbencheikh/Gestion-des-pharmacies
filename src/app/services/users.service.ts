import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concatMap, switchMap } from 'rxjs';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { filter, map, of } from 'rxjs';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private firestore: Firestore,
    private authService: AuthentificationService
  ) {}
  get currentUserProfile$(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'clients', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }

  addUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'clients', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'clients', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
