import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { InterfaceMedicament } from '../../models/interface-medicament';
@Component({
  selector: 'app-detail-medicament',
  templateUrl: './detail-medicament.component.html',
  styleUrls: ['./detail-medicament.component.css'],
})
export class DetailMedicamentComponent implements OnInit {
  element: InterfaceMedicament = {};
  myid: any = [1,2,3];
  constructor(
    public crudser: CrudService,
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute)
  {
    this.route.params.subscribe((param) => (this.myid = param[`id`]));
  }
  ngOnInit(): void {
    this.getDetailMedica();
  }
  getDetailMedica() {
    return this.crudser
      .getMedicaDetails(this.myid)
      .subscribe((res) => (this.element = res));
  }
  // getObjectById(id: any) {
  //   const med = this.angularFirestore
  //     .collection('medicaments')
  //     .doc(`/${id}`)
  //     .valueChanges();
  // }
}
