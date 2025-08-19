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
    price:number,
    description:string,
    image:string,
    category:string,
}