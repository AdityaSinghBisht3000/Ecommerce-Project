import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addproduct, cart, login, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{

  constructor( private user:UserService, private prod:ProductService) { 

  }
  authError:string=""
  showLogin: boolean = false
  ngOnInit(): void {
    
  }

  signUp(value : signup)
  {
    console.log("value = ", value)
    this.user.userSignUp(value)
  }

  openLogin()
  {
    this.showLogin = true
    console.log("Open Login!!")
  }

  openSignUp()
  {
    this.showLogin = false
    console.log("Open signUp!!")
  }

  login(data:login)
  {
    console.log("data = ", data)
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((res)=>{
      if(res)
      {
        this.authError = "Invalid Credentials"
        setTimeout(()=>{
          this.authError = ""
        },3000)
      }
    })
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
      let cartDataList:addproduct[]= JSON.parse(data);
      
      cartDataList.forEach((product:addproduct, index)=>{
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.prod.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("data is stored in DB");
            }
          })
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    
    
  }
}