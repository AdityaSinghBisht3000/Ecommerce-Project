import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addproduct, cart } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<addproduct[]|[]>();
  constructor(private http:HttpClient) { }

  addProduct(data:addproduct)
  {
    console.log("ADD Product!!!");
   return this.http.post("http://localhost:3000/products",data,{observe:'response'});
  }
  getAllProducts()
  {
    return this.http.get<addproduct[]>("http://localhost:3000/products");
  }
  deleteProduct(id:number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  updateProduct(prod:addproduct)
  {
    return this.http.put<addproduct>(`http://localhost:3000/products/${prod.id}`,prod);
  }
  showProduct()
  {
    return this.http.get<addproduct[]>("http://localhost:3000/products?_limit=6");
  }
  showPTrendyroduct()
  {
    return this.http.get<addproduct[]>("http://localhost:3000/products?_limit=12");
  }
    searchProduct(query: string) {
    return this.http.get<addproduct[]>(
      `http://localhost:3000/products`
    );
  }
  getProduct(id:string)
  {
    // console.log("ID = ",id)
    return this.http.get<addproduct>(`http://localhost:3000/products/${id}`);
  }
  addToCart(cartData: cart) {
    console.log(cartData," ")
    return this.http.post('http://localhost:3000/cart', cartData);
  }
 getCartList(userId: number) {
    return this.http
      .get<addproduct[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  localAddToCart(data: addproduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemCart(prodId:number)
  {
    let cartData = localStorage.getItem('localCart');
    if(cartData)
    {
      let items : addproduct[] = JSON.parse(cartData);
      items = items.filter((item:addproduct)=>prodId!=item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  RemoveToCart(cartId:number)
  {

    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }
  
 currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

}
