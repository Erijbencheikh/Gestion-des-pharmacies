import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { InterfacePharmacie } from '../../models/interface-pharmacie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MapGeocoderResponse } from '@angular/google-maps';
import { MapGeocoder } from '@angular/google-maps';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css'],
})
export class PharmaciesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @(ViewChild(MatSort, { static: true })!) sort: MatSort;
  phar: any;

  element: InterfacePharmacie = { lat: 0, lng: 0 };
  public displayedColumns: string[] = [
    'position',
    'name',
    'telephone',
    'localisation',
    'action',
  ];
  pharmacie: InterfacePharmacie[] = [];
  clickedRows = new Set<InterfacePharmacie>();
  // the source where we will get data
  dataSource = new MatTableDataSource<InterfacePharmacie>([]);

  constructor(
    public crudser: CrudService,
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore
  ) {
    this.dataSource = new MatTableDataSource(this.pharmacie);
    this.route.params.subscribe((params) => {
    this.phar = this.getObjectById(params['id']);
    });
  }

  ngOnInit(): void {
    this.getPharmacies();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getReverseGeocodingData(35.5047, 11.0622);
  }

  async getPharmacies() {
    this.dataSource.data =
      (await this.crudser.getAllPharmacies()) as InterfacePharmacie[]; //as .. bch tjibli il donne heka fard type men il interface eli eni 3tithelou
    console.log(this.dataSource);
  }

  getObjectById(id: any) {
    return this.angularFirestore.collection('pharmacies').doc(id).ref; //.dec().valueChanges({}) fiblaset il ref zeda temchi
  }


  getReverseGeocodingData(lat: number, lng: number) {
    // var results: google.maps.GeocoderResult ;
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location: latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
        }
      })
      .then((address) => {
        return address.results[0].formatted_address;

      });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
