import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { addproduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router, private product : ProductService , private http:HttpClient){

  }

  menuType : string ='default';
  sellerName: string ='';
  searchResult:undefined|addproduct[];
  userName:string='';
  cartItems=0;
    ngOnInit():void{
    this.router.events.subscribe((val:any)=>{
      // console.log("huhuhuhu",val);
      if(val.url )
      {
        if(localStorage.getItem('seller') && val.url.includes('seller') )
        {
              console.log('in seller area');
              this.menuType='seller'
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore);
              this.sellerName = sellerData && sellerData.body[0].name;
            
          }
          else if(localStorage.getItem('user'))
          {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData?.body && userData.body.length > 0 ? userData.body[0].name : ''; 
            this.menuType='user'
            this.product.getCartList(userData.id)
          }
      }
      else{
        console.log("outside seller")
        this.menuType='default'
      }
    })
    
    this.cartItems=localStorage.getItem('localCart')?JSON.parse(localStorage.getItem('localCart')!).length:0; 
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }

  // ngOnInit():void{
  //   this.router.events.subscribe((val:any)=>{
  //     // console.log("huhuhuhu",val);
  //     if(val.url && val.url.includes('seller') && localStorage.getItem('seller'))
  //     {
  //       console.log('in seller area');
  //       this.menuType='seller'
  //       if(localStorage.getItem('seller'))
  //       {
  //         let sellerStore = localStorage.getItem('seller');
  //         let sellerData = sellerStore && JSON.parse(sellerStore);
  //         this.sellerName = sellerData.body[0].name;
  //       }
  //     }
  //     else{
  //       console.log("outside seller")
  //       this.menuType='default'
  //     }
  //   })
  // }
  logOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  submitSearch(val:string)
  { 
    this.router.navigate([`search/${val}`]);

  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.log("ele " ,element.value)
      this.product.searchProduct(element.value).subscribe((res)=>{
           const filtered = res.filter(item =>
                            item.name.toLowerCase().includes(element.value.toLowerCase())
                        );
                        console.log(filtered);
                        this.searchResult = filtered;
      })

    }
  }
  hideSearch(){
    this.searchResult=undefined
  }

  redirectToDetails(id:number)
  {
    this.router.navigate([`/details/${id}`])
  }

}
