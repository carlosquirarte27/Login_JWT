import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Users } from './interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Users[]>{
    console.log("preparando el get")
    const url = 'http://localhost:3000/api/users';
    console.log(this.httpClient.get<Users[]>(url))
    return this.httpClient.get<Users[]>(url);
  }

  deleteUser(email: string): Observable<Users>{
    console.log("preparando para eliminar");
    const url = 'http://localhost:3000/api/users/'+email;
    return this.httpClient.delete<Users>(url);
  } 
  updateUser(id:string,username:string, email:string, password:string, number:number, image:string,level: string): Observable<Users>{
    console.log(username,email,password,number,image,level)
    const url = 'http://localhost:3000/api/users/';
    return this.httpClient.put<Users>(url,
      {_id:id,
      username:username,
      email:email,
      password: password,
      number:number,
      picture:image,
      level:level
    });
  } 
  createUser(username:string, email:string, password:string, number:number, image:string,level:string): Observable<Users>{
    const url = 'http://localhost:3000/api/users/';
    return this.httpClient.post<Users>(url,
      {username:username,
      email:email,
      password: password,
      number:number,
      picture:image,
      level:level
    });
  } 
}
