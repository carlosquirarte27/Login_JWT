import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Login } from './interfaces/login'; 


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  /*LOG(email: string, password: string) : Promise<any>{
      return new Promise((res,err) =>{
        const url = 'http://localhost:3000/api/Login/';
        console.log(this.httpClient.post<any>(url,{email: email, password: password}))
        res( {return : this.httpClient.post<any>(url,{email: email, password: password})
      }); 
  })
}
  */

  
  DBLogIn(email: string, password: string): Observable<any>{
    const url = 'http://localhost:3000/api/Login/';
    return this.httpClient.post<any>(url,{email: email, password: password});
  }

  validateGoogleLogIn(token:string){
    const url = 'http://localhost:3000/api/Login/';
    return this.httpClient.put<any>(url,{idToken: token});  
  }

  //signIn(email: string)

}
