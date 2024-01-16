// statistics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8080/dashbord'; // Update the URL to match your Spring Boot application

  constructor(private http: HttpClient) {}

  getMostSoldProductsGlobally(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/produitsLesPlusVendusGlobalement`);
  }

  getMostSoldProductsByYear(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/produitsLesPlusVendusParAn?year=${year}`);
  }

  getProductsInStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listeProduitsEnStock`);
  }

  getProductsOutOfStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listeProduitsHorsStock`);
  }

  getSoldProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listeProduitsVendue`);
  }

  getMostFavoredProductsGlobally(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/produitsLesPlusFavorisGlobalement`);
  }

  getMostFavoredProductsByYear(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/produitsLesPlusFavorisParAn?year=${year}`);
  }
}
