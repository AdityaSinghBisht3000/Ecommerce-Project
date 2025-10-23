import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addproduct, cart } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private prod: ProductService) {

  }

  removeCart = false;
  productData: undefined | addproduct
  productQuantity: number = 1;
  cartData: addproduct | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      let prodId = res.get("productID");
      if (prodId) {
        this.prod.getProduct(prodId).subscribe((res) => {
          // console.log("Product = ",res);
          this.productData = res;
          let cartData = localStorage.getItem('localCart');
          if (prodId && cartData) {
            let items = JSON.parse(cartData);
            let item = items.filter((item: addproduct) => prodId == item.id.toString());
            if (item.length) {
              this.removeCart = true;
            }
            else {
              this.removeCart = false;
            }
          }

          let user = localStorage.getItem('user');
          if (user) {
            let userId = user && JSON.parse(user).id;
            this.prod.getCartList(userId);

            this.prod.cartData.subscribe((result) => {
              let item = result.filter((item: addproduct) => prodId?.toString() === item.productID?.toString())
              if (item.length) {
                this.cartData = item[0];
                this.removeCart = true;
              }
            })
          }
        })
      }
    })
  }

  RemoveCart(prodId: number) {
    console.log(prodId);
    if (localStorage.getItem('user')) {

      this.prod.removeItemCart(prodId);
      this.productQuantity = 1;
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.prod.RemoveToCart(this.cartData.id).subscribe((res) => {
        if (res) {
          this.prod.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }

  handleQuantity(val: string) {
    if (val == "plus") {
      this.productQuantity++;
    }
    else if (this.productQuantity > 0) {
      this.productQuantity--;
    }
  }

  addToCart() {
    console.log("sdvxv", this.productData);
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.prod.localAddToCart(this.productData);
        this.removeCart = true;
        this.productQuantity = 1;
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.log("user: ", userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.prod.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.prod.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }

  }
}


