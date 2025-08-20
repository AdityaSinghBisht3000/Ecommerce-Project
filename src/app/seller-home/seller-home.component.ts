import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addproduct } from '../data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{

  constructor(private prodserv : ProductService , private router:Router){

  }
  productMessage: string| undefined;
  deleteProductMessage: string| undefined;
  productList : undefined | addproduct[];
  icon = faTrash;
  iconEdit = faEdit;

  ngOnInit(): void{
    this.list()
  }
  deleteProduct(id:number, name:string)
  {
    this.prodserv.deleteProduct(id).subscribe((res)=>{
      console.log(res);
      this.deleteProductMessage=`Product ${name} deleted successfully`;
    })
    setTimeout(()=>{
      this.deleteProductMessage=undefined;
      // window.location.reload();
      this.list();
    },1000)
  }

  list():void{
      this.prodserv.getAllProducts().subscribe((res)=>{
      console.log(res);
      this.productList = res;
    })    
  }

}
