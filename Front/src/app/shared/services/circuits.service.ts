import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Circuits } from './interfaces/circuits-interface';


@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(private httpClient: HttpClient) { }

  getCircuits(): Observable<Circuits[]>{
    console.log("preparando el get")
    const url = 'http://localhost:3000/api/circuits';
    console.log(this.httpClient.get<Circuits[]>(url))
    return this.httpClient.get<Circuits[]>(url);
  }
  deleteCircuit(id: string): Observable<Circuits>{
    console.log("preparando para eliminar");
    const url = 'http://localhost:3000/api/circuits/'+id;
    return this.httpClient.delete<Circuits>(url);
  }  
  updateCircuit(id:string,name:string, description:string, address:string, phone_number:number, circuit_distance:string, image:string): Observable<Circuits>{
    const url = 'http://localhost:3000/api/circuits/';
    return this.httpClient.put<Circuits>(url,
      {id:id,
      name:name,
      description:description,
      address:address,
      phone_number:phone_number,
      circuit_distance:circuit_distance,
      image:image
    });
  } 

  createCircuit(name:string, description:string, address:string, phone_number:number, circuit_distance:string, image:string): Observable<Circuits>{
    const url = 'http://localhost:3000/api/circuits/';
    return this.httpClient.post<Circuits>(url,
      {name:name,
      description:description,
      address:address,
      phone_number:phone_number,
      circuit_distance:circuit_distance,
      image:image
    });
  } 

}
