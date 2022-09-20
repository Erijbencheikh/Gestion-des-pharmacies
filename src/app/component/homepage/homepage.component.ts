import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { CrudService } from 'src/app/services/crud.service';
import { GeocodingService } from 'src/app/services/geocoding.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  formattedAddress = '';
  map:any;
  myLatLng = { lat: 35.5047, lng: 11.0622 }; // Map Options
  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 15,
  };
  constructor(
    private adr:GeocodingService
  ) {}
  ngOnInit(): void {
    // this.getLocation();
  
  }


  options: Options = new Options({
    types: ['address'],
    componentRestrictions: { country: 'TN' },
  });
  public handleAddressChange(address: any) {
  this.formattedAddress = address.formatted_address;
  this.mapOptions = {
    center : {lat : address.geometry.location.lat(),lng : address.geometry.location.lng() }, 
    zoom : 17,
  }
  console.log(address);
  }


  //hedhi just ta3ti lat/lng actuel bte3i marbouta bel crud service
  getLocation(){
    this.adr.getLocationService().then(res=>{
      console.log(res.lat);
      console.log(res.lng);
    })
  }

}
