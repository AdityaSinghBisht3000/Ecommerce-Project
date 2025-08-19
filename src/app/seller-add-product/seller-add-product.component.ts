import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addproduct } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {


  AddProduct(data: addproduct):void
  {
    alert("product added successfully");
    
  }

}
