import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { addproduct } from '../data-type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

    constructor(private prod: ProductService , private route:ActivatedRoute , private http:HttpClient)
    {

    }

    searchResult: undefined|addproduct[];

    ngOnInit()
    {
        this.route.paramMap.subscribe(params => {
            let query = params.get('query');
            console.log(query)
            
            if (query) {
                this.http.get<addproduct[]>('http://localhost:3000/products')
                    .subscribe((res) => {
                        const filtered = res.filter(item =>
                            item.name.toLowerCase().includes(query.toLowerCase())
                        );
                        console.log(filtered);
                        this.searchResult = filtered;
                    });
            } else {
                console.warn('Query parameter is missing or null');
            }
        });
    }
}