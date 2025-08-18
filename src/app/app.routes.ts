import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
       component: HomeComponent
    },
    {
        path:'seller-auth',
        component: SellerAuthComponent
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'seller-home',
        component: SellerHomeComponent,
        canActivate:[authGuard]
    }
    
];
