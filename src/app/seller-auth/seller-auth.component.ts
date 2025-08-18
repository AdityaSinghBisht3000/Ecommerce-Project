import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  constructor(
    private seller:SellerService,
    private router:Router
  )
  {}

  ngOnInit(){
    this.seller.reloadSeller();
  }

  signUp(data :signup) :void
  {
    this.seller.userSignUp(data);
  }

}
