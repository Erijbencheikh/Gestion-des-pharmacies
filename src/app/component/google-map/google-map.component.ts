import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CrudService } from 'src/app/services/crud.service';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { InterfacePharmacie } from '../../models/interface-pharmacie';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  pharmacies: InterfacePharmacie[] = [];
  element: InterfacePharmacie = { lat: 0, lng: 0 };
  @Input() mapOptions = {};
  myid:any;
  markerOptions: google.maps.MarkerOptions = {};
  constructor(public crudser: CrudService,
    private angularFirestore: AngularFirestore,
    private geocodingService: GeocodingService,

    ) {

  }

  ngOnInit(): void {
    this.getPharmacies();
  }

  // getObjectById(id: any) {
  //   return this.angularFirestore.collection('pharmacies').doc(id).ref;
  // }

  async getPharmacies() {
    this.pharmacies =
      (await this.crudser.getAllPharmacies()) as InterfacePharmacie[];
      // console.log(this.pharmacies);
  }
  public openInfoWindow(marker: MapMarker, content: InterfacePharmacie) {
    this.element = content;
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }
}
