import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})  
export class SellerService {

  isSellerLogedIn = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient,
              private router:Router
  ) { }

  userSignUp( data:signup) :any
  {
    this.http.post('http://localhost:3000/Seller',data,{observe:'response'}).subscribe((res)=>{
    this.isSellerLogedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(res.body));
    this.router.navigate(['seller-home']);
      console.log(res);
   });

   return false;
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
