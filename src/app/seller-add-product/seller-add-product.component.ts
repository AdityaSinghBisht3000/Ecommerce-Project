import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addproduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  constructor(private addprod : ProductService, private router:Router) 
  {}
  addProductMessage: string|undefined;

  AddProduct(data: addproduct) :any
  {
    this.addprod.addProduct(data).subscribe((res)=>{
      // console.log(res);
      if(res)
      {
        this.addProductMessage="Product added successfully";
        // this.router.navigate(['seller-home'])
      }
      setTimeout(()=>
        {
          this.addProductMessage=undefined;
          window.location.reload();
        }
      ,1000)
    });
  } 

}
