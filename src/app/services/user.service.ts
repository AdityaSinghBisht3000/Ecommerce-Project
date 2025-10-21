import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient , private router:Router) { }

  userSignUp(data:signup)
  {
    console.log(data)
    this.http.post("http://localhost:3000/users",data,{observe:'response'}).subscribe((res)=>{
      console.log(res);
      if(res)
      {
          localStorage.setItem('user',JSON.stringify(res.body));
          this.router.navigate(['home']);
      }

    })

  }

  userLogin(data:login)
  {
    this.http.get<signup[]>(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`, {observe:'response'}).subscribe((res)=>{
      console.log(res);
      if(res && res.body?.length)
      {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(res.body[0]));
          this.router.navigate(['home']);
      }
      else{
          this.invalidUserAuth.emit(true);
      }

    })
  }

}
