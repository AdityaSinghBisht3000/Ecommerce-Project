export interface signup{
    name:string,
    password:string,
    email:string,
    
}

export interface login{
    email:string,
    password:string,
}

export interface addproduct{
    name:string,
    quantity:undefined|number,
    price:number,
    description:string,
    image:string,
    category:string,
    color:string,
    id:number,
    productID:undefined|number,
}

export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}
