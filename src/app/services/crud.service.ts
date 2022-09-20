import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InterfacePharmacie } from '../models/interface-pharmacie';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { InterfaceMedicament } from '../models/interface-medicament';
import { resolveForwardRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  id: any;
  med: any;
  medicament: AngularFirestoreCollection<InterfaceMedicament>;
  pharmaCollection: AngularFirestoreCollection<InterfacePharmacie>;
  mediCollection: AngularFirestoreCollection<InterfaceMedicament>;
  phar: Observable<InterfacePharmacie[]>;
  medi: Observable<InterfaceMedicament[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.pharmaCollection = this.angularFirestore.collection('pharmacies');
    this.phar = this.pharmaCollection.valueChanges();
    this.mediCollection = this.angularFirestore.collection('drugs');
    // this.medi = this.angularFirestore.valueChanges();
  }
  getClientDoc(id: any) {
    return this.angularFirestore.collection('clients').doc(id).valueChanges();
  }
  createClient(user: User) {
    return new Promise<any>((resolve, Reject) => {
      this.angularFirestore
        .collection('clients')
        .add(user)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => Reject(error)
        );
    });
  }

  getPharmaciDetails(id: string) {
    return new Promise<any>((resolve) => {
      this.angularFirestore
        .collection('pharmacies')
        .doc(id)
        .collection('medicaments')
        .get()
        .subscribe((doc: any) => {
          resolve (doc.docs)
        });
    });
  }

  getDetailPharma(id: string): Observable<InterfacePharmacie> {
    const productsDocuments = this.angularFirestore.doc<InterfacePharmacie>(
      'pharmacies/' + id
    );
    return productsDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data() as InterfacePharmacie;
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }

  getAllPharmacies() {
    return new Promise<any>((resolve) => {
      this.angularFirestore
        .collection('pharmacies')
        .valueChanges({ idField: 'id' })
        .subscribe((pharmacies) => resolve(pharmacies));
    });
  }

  getMedicaDetails(id: number): Observable<InterfaceMedicament> {
    const productsDocuments = this.angularFirestore.doc<InterfaceMedicament>(
      `medicaments/${id}`
    );
    return productsDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data() as InterfaceMedicament;
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }
}
