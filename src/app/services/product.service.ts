import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addproduct } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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



}
