import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Observable, catchError, tap } from 'rxjs';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/produits';
  private apiUrl2 = 'http://localhost:8080/produits/';
  private apiUrl1 = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addProduct(product: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, product);
  }

  getCategoryDetailsByUrl(categoryHref: string): Observable<Categorie> {
    return this.http.get<Categorie>(categoryHref);
  }
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl1}/categories`);
  }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
}
getProduits() :Observable<Array<Produit>>
{
  return  this.http.get<Array<Produit>> (this.apiUrl2,{
    headers: {'Access-Control-Allow-Origin': '*','Accept':'application/json'}
 });
}
deleteProduit(idP: number|undefined)
{
  return this.http.get (this.apiUrl2+"delete/"+idP);
}
updateProduit(idP: number | undefined, nouveau: Produit) {
  return this.http.put(this.apiUrl2,nouveau);
}
}


 
 
