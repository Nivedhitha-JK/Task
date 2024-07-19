import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private apiUrl='http://localhost:3000/users';
  constructor(private http:HttpClient) { }

  addUser(data:any):Observable<any>{
    return this.http.post(this.apiUrl,data);
  }

  getUser():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  updateUser(id:number,data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }

  deleteUserApi(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }




}
