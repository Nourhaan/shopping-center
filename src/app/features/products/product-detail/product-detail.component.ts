import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../core/services/products.service";
import {takeUntil} from "rxjs";
import {UnsubscribeDirective} from 'src/app/core/directives/unsubscribe.directive';
import {Product} from "../../../core/models/products.model";
import {addToCart} from "../../../store/actions/cart.actions";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends UnsubscribeDirective implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    super();
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    this.productsService.getProductDetail(this.route.snapshot.params['id']).pipe(takeUntil(this.destroy$)).subscribe(
      (product: Product) => {
        this.product = product;
      }
    );
  }

}
