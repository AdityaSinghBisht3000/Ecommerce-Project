import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addproduct, cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  currentData : addproduct[]|undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
   this.loadDetails()

  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.RemoveToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }
  
  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log("res= ",this.cartData)
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
       if(this.cartData)
      {
        this.currentData = this.cartData.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          description: item.description,
          image: item.image,
          category: item.category,
          color: item.color,
          id: item.id || 0,
          productID: item.productId
        }))
        setTimeout(()=>{
          this.currentData && this.product.cartData.emit(this.currentData)
        },100)
        // this.product.cartData.emit(this.currentData)
      }
    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

}