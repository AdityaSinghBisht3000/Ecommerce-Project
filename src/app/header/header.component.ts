import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { addproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router, private product : ProductService){

  }

  menuType : string ='default';
  sellerName: string ='';
  searchResult:undefined|addproduct[];

  ngOnInit():void{
    this.router.events.subscribe((val:any)=>{
      // console.log("huhuhuhu",val);
      if(val.url && val.url.includes('seller') && localStorage.getItem('seller'))
      {
        console.log('in seller area');
        this.menuType='seller'
        if(localStorage.getItem('seller'))
        {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.body[0].name;
        }
      }
      else{
        console.log("outside seller")
        this.menuType='default'
      }
    })
  }
  logOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
  }
  submitSearch(val:string)
  { 
    this.router.navigate([`search/${val}`]);

  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value)
      this.product.searchProduct(element.value).subscribe((result)=>{
       console.log(result)
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }

}
