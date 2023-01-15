import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../model/product.model';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item.model';
import { BSProduct } from '../model/bs-product.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BSProductService {

  constructor(private http: HttpClient) {}

  private baseUrl = environment.BS_API_URL;
 

  private itemUrl = environment.PRODUCT_API_URL;

  getAllProdcts() {
    return this.http.get<BSProduct[]>(this.itemUrl+'api/bs-products').toPromise();
  }


  getProductById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  addProduct(product: any) {
    console.log('product', product);
    
    return this.http.post(this.itemUrl + 'api/bs-products', product);
  }

  updateProduct(product: any) {
    console.log('product ', product);
    
    return this.http.put(this.itemUrl + 'api/bs-products/', product);
  }

  deleteProduct(id: number) {    
    return this.http.delete(this.itemUrl + 'api/bs-products/' + id);
  }
}
