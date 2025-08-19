import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})  
export class SellerService {

  isSellerLogedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,
              private router:Router
  ) { }

  userSignUp( data:signup) 
  {
    this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((res)=>{
    this.isSellerLogedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(res.body));
    this.router.navigate(['seller-home']);
      // console.log(res);
   });

  }

  userLogIn(data :login):any
  {
    // console.log("Login!!")
    console.log("data = ",data);
      if (!data.email || !data.password) {
    this.isLoginError.emit(true);
    return;
  }
  
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>{
      if(res.body && res.body.length)
        {
          console.log("res ",res)
        // this.isSellerLogedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res));
        this.router.navigate(['seller-home']);
        
      }
      else{
        // console.warn("Login Failed!!")
        this.isLoginError.emit(true);
      }
    })
  }

  reloadSeller():void
  {
    if(localStorage.getItem('seller'))
    {
      this.isSellerLogedIn.next(true);
      this.router.navigate(['seller-home']);
    } 
  }
}
