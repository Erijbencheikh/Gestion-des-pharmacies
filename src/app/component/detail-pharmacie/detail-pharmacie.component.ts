import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InterfaceMedicament } from '../../models/interface-medicament';
import { ActivatedRoute } from '@angular/router';
import { InterfacePharmacie } from '../../models/interface-pharmacie';
import { Observable } from 'rxjs';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-detail-pharmacie',
  templateUrl: './detail-pharmacie.component.html',
  styleUrls: ['./detail-pharmacie.component.css'],
})
export class DetailPharmacieComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
  element: InterfacePharmacie = { lat: 0, lng: 0 };

  displayedColumns: string[] = [
    'position',
    'name',
    'forme',
    'disponibilite',
    'action',
  ];
  clickedRows = new Set<InterfaceMedicament>();
  medicament: any[] = [];
  myid: any;
  medi: any;

  id: any;
  drugCollection: AngularFirestoreCollection<InterfacePharmacie>;

  constructor(
    public crudser: CrudService,
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.medicament);
    this.route.params.subscribe((param) => (this.myid = param[`id`]));
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.getMedi();
    console.log(this.dataSource);

    this.getDetailPharma();
    this.getMedicaments();
  }
  getObjectById(id: any) {
    const med = this.angularFirestore
      .collection('medicaments')
      .doc(`/${id}`)
      .valueChanges();
  }
  getDetailPharma() {
    return this.crudser
      .getDetailPharma(this.myid)
      .subscribe((res) => (this.element = res));
  }
  getMedicaments() {
    return this.crudser
      .getPharmaciDetails(this.myid)
      .then((med) => {
        med.map((data: any) => {
          const medicament =
            data._delegate._document.data.value.mapValue.fields;
          this.medicament.push(medicament);
          this.dataSource.data = this.medicament;
          console.log(this.dataSource.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myLatLng = { lat: 35.5047, lng: 11.0622 };
  // myLatLng = { lat: this.element.lat, lng: this.element.lng }; // Map Options
  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 13,
  };
  markerOptions: google.maps.MarkerOptions = {};

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
