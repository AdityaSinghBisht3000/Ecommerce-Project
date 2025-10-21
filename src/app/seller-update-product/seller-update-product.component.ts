import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addproduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

    constructor(private prodserv:ProductService , private http:HttpClient, private route:ActivatedRoute) { }

    update_res: addproduct | undefined;

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        console.log("id =",id);
        this.http.get<addproduct>(`http://localhost:3000/products/${id}`).subscribe((res)=>{
          this.update_res = res;
          console.log("update_res = ", this.update_res.name);
          if(this.update_res)
          {
            this.Name=this.update_res.name;
            this.color=this.update_res.color;
            this.catagory=this.update_res.category;
            this.price=this.update_res.price;
            this.description=this.update_res.description;
            this.img=this.update_res.image;
            this.id=this.update_res.id; 
          }
        })
    } 
    productMessage:string|undefined;
    Name:string="";
    color:string="";
    description:string=""
    catagory:string=""
    price:number=0
    img:string=""
    id:number=0
    
    UpdateProductMessage(data :addproduct):void{
      if(data)
      {
        data.id=this.id;
      }
      this.prodserv.updateProduct(data).subscribe((res)=>{
        console.log("Product updated successfully ",res);
        if(res)
        {
          this.productMessage="Product has been updated";
        }
      })
      setTimeout(()=>(this.productMessage=undefined),1000)
    }

}
