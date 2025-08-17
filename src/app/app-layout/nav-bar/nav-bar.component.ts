import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UnsubscribeDirective} from "../../core/directives/unsubscribe.directive";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {SharedService} from "../../core/services/shared.service";
import {Dropdown, Offcanvas} from 'bootstrap';
import {Store} from "@ngrx/store";
import {loadCategories} from "../../store/actions/categories.actions";
import {selectCategories} from "../../store/selectors/categories.selectors";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends UnsubscribeDirective implements OnInit, AfterViewInit {
  mainNavItems = ['products', 'cart', 'favorites'];
  categories!: Observable<string[]>;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('categoriesElem') categoriesElem!: ElementRef;
  menuDrawerCanvas: any;
  categoriesDropDownOpen = false;

  // Close dropdown if click outside
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.categoriesElem.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.categoriesDropDownOpen = false;
    }
  }

  constructor(
              public sharedService: SharedService,
              private el: ElementRef,
              public router: Router,
              private store: Store,
              public translate: TranslateService
  ) {
    super();
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.store.dispatch(loadCategories());
    this.categories = this.store.select(selectCategories);
  }

  /**
   * Drawer and drop down lists initialization
   * */
  ngAfterViewInit(): void {
    const menuDrawerEl = document.getElementById('menuDrawer');
    if (menuDrawerEl) {
      this.menuDrawerCanvas = new Offcanvas(menuDrawerEl, {
        backdrop: true,
        keyboard: true
      });
    }

    const dropdowns = this.el.nativeElement.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach((dd: HTMLElement) => new Dropdown(dd));
  }

  toggleDropdown() {
    this.categoriesDropDownOpen = !this.categoriesDropDownOpen;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['products/category/', category]).then();
    this.categoriesDropDownOpen = false;
    this.closeMenu();
  }

  closeMenu() {
    this.menuDrawerCanvas?.hide();
    this.sharedService.closeDrawer();
  }

  switchLang() {
    const lang = this.translate.currentLang == 'en' ? 'ar' : 'en';
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.dir = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
