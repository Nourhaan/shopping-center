import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCartItems} from "../../store/selectors/cart.selectors";
import {Observable} from "rxjs";
import {removeFromCart} from "../../store/actions/cart.actions";
import {Product} from "../../core/models/products.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products$!: Observable<any[]>;
  productsValue: Product[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.products$ = this.store.select(selectCartItems);
    this.products$.subscribe(val => this.productsValue = val);
  }

  onRemoveProduct(product: Product) {
    this.store.dispatch(removeFromCart({productId: product.id}));
  }

}
