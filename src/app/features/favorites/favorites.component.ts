import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/products.model";
import {Store} from "@ngrx/store";
import {removeFavorite} from "../../store/actions/favorites.actions";
import {selectAllFavorites} from "../../store/selectors/favorites.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  products$!: Observable<any[]>;
  productsValue: Product[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.getFavProducts();
  }


  getFavProducts() {
    this.products$ = this.store.select(selectAllFavorites);
    this.products$.subscribe(val => this.productsValue = val);
  }

  onRemoveProduct(product: Product) {
    this.store.dispatch(removeFavorite({productId: product.id}));
  }
}
