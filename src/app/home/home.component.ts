import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { addproduct } from '../data-type';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    images: undefined|addproduct[];
    trendyProducts: undefined|addproduct[];

    constructor(private prodServ: ProductService)
    {

    }
    ngOnInit()
    {
      this.prodServ.showProduct().subscribe((res)=>{
        console.log(res);
        this.images = res;
      });
      this.prodServ.showPTrendyroduct().subscribe((res)=>{
        console.log(res);
        this.trendyProducts = res;
      });

    }
  	
}
