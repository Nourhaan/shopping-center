import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {debounceTime, Observable, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {Product} from "../../../core/models/products.model";
import {UnsubscribeDirective} from "../../../core/directives/unsubscribe.directive";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../core/services/shared.service";
import {FormControl} from "@angular/forms";
import {Store} from "@ngrx/store";
import {loadProducts, loadProductsByCategory} from "../../../store/actions/products.actions";
import {selectAllProducts, selectProductsByCategory} from "../../../store/selectors/products.selectors";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush /** Apply OnPush change detection*/

})
export class ProductsListComponent extends UnsubscribeDirective implements OnInit, AfterViewInit {
  allProducts: Product[] = [];
  products: Product[] = [];
  filterOffCanvas: any;
  activeCategory: string | undefined;
  searchField = new FormControl();
  productsListSubs: Subscription | undefined;
  productsModelChanged: Subject<string> = new Subject<string>();
  debounceTime = 300;
  numberOfPages = 0;
  currentPage = 1;
  pageSize = 6;
  products$!: Observable<any[]>;
  productsByCategory$!: Observable<any[]>;


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef, /** Force change detection*/
    public sharedService: SharedService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.filterOffCanvasInit();
  }


  ngOnInit(): void {
    this.listenToProductsChanges();
    this.listenToRouteChanges();
    this.listenToSearchChanges();
  }

  listenToProductsChanges() {
    this.products$ = this.store.select(selectAllProducts);
    this.products$.subscribe(this.storeProducts())
    this.productsByCategory$ = this.store.select(selectProductsByCategory);
    this.productsByCategory$.subscribe(this.storeProducts())
  }

  listenToSearchChanges() {
    this.searchField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.products = []; // to show skeleton until updating product list
        this.productsModelChanged.next(value);
      }
    })

    this.productsListSubs = this.productsModelChanged
      .pipe(
        debounceTime(this.debounceTime),
        // switchMap(() => /** call Search API**/ )   //use in case search is applied through BE side, to cancel previous request
      ).subscribe({
        next: () => {
          this.applyTextFilter();
        }
      });
  }

  applyTextFilter() {
    this.products = this.searchField.value ? this.allProducts.filter((product: Product) => product.title.toLowerCase().includes(this.searchField.value.toLowerCase())) : this.allProducts;
    this.cdRef.markForCheck();  /** Force change detection*/
  }

  listenToRouteChanges() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params) => {
        this.activeCategory = params['categoryName'];
        this.activeCategory ? this.store.dispatch(loadProductsByCategory({categoryId: this.activeCategory})) : this.store.dispatch(loadProducts());
      }
    })
  }

  storeProducts() {
    return {
      next: (allProducts: Product[]) => {
        this.allProducts = allProducts;
        this.products = this.allProducts.slice(0, 6);
        /** to simulate pagination */
        this.numberOfPages = Math.ceil(this.allProducts.length / this.pageSize);
        this.cdRef.markForCheck();  /** Force change detection*/
      }
    }
  }

  filterOffCanvasInit() {
    this.filterOffCanvas = document.getElementById('filterDrawer');
    this.filterOffCanvas.addEventListener('hidden.bs.offcanvas', () => {
      document.getElementsByTagName('body')[0].removeAttribute("style"); // enable scroll
    });
  }

  openFilterDrawer() {
    // @ts-ignore
    const bsOffcanvas = new bootstrap.Offcanvas(this.filterOffCanvas);
    bsOffcanvas.show();
  }

  filterProducts(value: any) {
    this.products = value.categories?.length ? this.allProducts.filter(prod => value.categories?.includes(prod.category)) : this.allProducts; // filter by category
    if (value.sortBy)
      this.onSortByClick(value.sortBy, value.sortType);
  }

  onSortByClick(sortBy: 'PRICE' | 'TITLE', sortType: 'ASC' | 'DESC' | null = null) {
    sortBy == 'PRICE' ?
      sortType == 'ASC' || !sortType ?
        this.products.sort((a, b) => (a?.price > b?.price) ? 1 : ((b.price > a.price) ? -1 : 0)) :
        this.products.sort((a, b) => (a?.price < b?.price) ? 1 : ((b.price < a.price) ? -1 : 0)) :
      sortType == 'ASC' || !sortType ?
        this.products.sort((a, b) => (a?.title > b?.title) ? 1 : ((b.title > a.title) ? -1 : 0)) :
        this.products.sort((a, b) => (a?.title < b?.title) ? 1 : ((b.title < a.title) ? -1 : 0));
    this.cdRef.markForCheck();  /** Force change detection*/
  }

  onScroll() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage += 1;
      const endIndex = (this.products.length + this.pageSize) > this.allProducts?.length ? this.allProducts?.length : this.products.length + this.pageSize
      this.products = [...this.allProducts.slice(0, endIndex)];
      this.cdRef.markForCheck();  /** Force change detection*/
    }
  }

  trackById(product: any): any {
    return product.id;
  }

}
