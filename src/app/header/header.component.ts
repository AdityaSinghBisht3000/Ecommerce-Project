import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router){

  }

  menuType : string ='default';
  sellerName: string ='';

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

}
