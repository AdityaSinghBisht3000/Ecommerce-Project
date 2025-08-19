import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  constructor(
    private seller:SellerService,
    private router:Router
  )
  {}

  showLogin:boolean=false;
  authError:String='';

  ngOnInit(){
    this.seller.reloadSeller();
  }

  signUp(data :signup) :void
  {
    this.seller.userSignUp(data);
  }
  openLogin()
  {
    this.showLogin=true;
  }
  openSignUp()
  {
    this.showLogin=false;
  }
   login(data: login): void {
     this.authError="";
    this.seller.userLogIn(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
        console.log(this.authError)
      }
    })
  }

}
