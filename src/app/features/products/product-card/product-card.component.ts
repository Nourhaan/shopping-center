import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from "../../../core/models/products.model";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Store} from "@ngrx/store";
import {addToCart} from "../../../store/actions/cart.actions";
import {SharedService} from "../../../core/services/shared.service";
import {selectCartItems} from "../../../store/selectors/cart.selectors";
import {addFavorite, removeFavorite} from "../../../store/actions/favorites.actions";
import {selectAllFavorites} from "../../../store/selectors/favorites.selectors";


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input('product') product: Product | undefined;
  @Input('isProductList') isProductList = false;

  cartItems!: Product[];
  favItems: number[] = [];

  constructor(private router: Router, private location: Location, private store: Store, private sharedService: SharedService) {
    this.store.select(selectCartItems).subscribe(val => this.cartItems = val);
    this.store.select(selectAllFavorites).subscribe(val => this.favItems = val.map(v => v.id));
  }

  navigateToProductDetails(productId: string | undefined) {
    this.router.navigate(['products', productId]).then()
  }

  backToPreviousPage() {
    this.location.back();
  }

  onAddToCart() {
    /**
     * can be enhanced later to add counter for each product in cart
     * To avoid deleting one item clear cart
     * */
    const exists = this.cartItems.some(item => item.id === this.product?.id);
    if (exists)
      this.sharedService.showSnackBar('Already added!', 'start');
    else if (this.product) {
      this.store.dispatch(addToCart({product: this.product}))
      this.sharedService.showSnackBar('Product is Added to Cart!', 'start');
    }
  }

  removeFromFav(product: Product | undefined) {
    if (product)
      this.store.dispatch(removeFavorite({productId: product.id}));
  }

  addToFav(product: Product | undefined) {
    if (product)
      this.store.dispatch(addFavorite({product: product}));
  }
}
