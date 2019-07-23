import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
const apiRoot = "http://localhost:3000";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    getToken(){
        return localStorage.getItem('token');
    }
    
    authenticate(user):Observable<any>{
        const url = `${apiRoot}/token`;
        return this.http.post(url, user, httpOptions).pipe(
            tap(val=>{
                console.log(`Token: ${val.token}`);
                localStorage.setItem('token', val.token);
            })
        );
    }


}