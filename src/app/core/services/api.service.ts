import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient, private cache: CacheService) {
  }

  getCategories() {
    return this.http.get<any>(`${this.baseUrl}products/categories`);
  }

  getProducts() {
    return this.http.get<any>(`${this.baseUrl}products`);
  }

  getProductsByCategory(category: string) {
    return this.http.get<any>(`${this.baseUrl}products/category/${category}`);
  }

  getProductDetail(id: number): Observable<any> {
    const cacheKey = `product-${id}`;
    const cachedData = this.cache.get<any>(cacheKey);

    if (cachedData) {
      return of(cachedData); // return cached data immediately
    }

    return this.http.get(`${this.baseUrl}products/${id}`).pipe(
      tap(data => this.cache.set(cacheKey, data, 300000)) // cache for 5 min
    );
  }
}
