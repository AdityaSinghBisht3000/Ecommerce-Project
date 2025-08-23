import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addproduct } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute, private prod:ProductService)
  {

  }

  productData:undefined|addproduct
  productQuantity:number=1;
  ngOnInit()
  {
     this.route.paramMap.subscribe((res)=>{
        let prodId = res.get("productID");
        // console.log("Prod = ",prodId);
        
        if(prodId) {
          this.prod.getProduct(prodId).subscribe((res)=>{
                // console.log("Product = ",res);
              this.productData=res;
          })
        }
    })
  }

  handleQuantity(val :string)
  {
      if(val=="plus")
      {
        this.productQuantity++;
      }
      else if(this.productQuantity>0)
      {
        this.productQuantity--;
      }
  }

}
