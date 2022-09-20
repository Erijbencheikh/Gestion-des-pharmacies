import { InterfaceMedicament } from './interface-medicament';

export interface InterfacePharmacie {
  id?: string;
  // localisation?: google.maps.LatLngLiteral;
  loc?: string;
  num_pharmacie?: number;
  nom_pharmacie?: string;
  proprietaire_pharmacie?: string;
  medicaments?: InterfaceMedicament[];
  lat: number;
  lng: number;
}


