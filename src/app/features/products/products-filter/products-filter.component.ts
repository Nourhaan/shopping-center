import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectCategories} from "../../../store/selectors/categories.selectors";

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent {
  @Output('onFilterChange') onFilterChange: EventEmitter<any> = new EventEmitter();
  filterForm = new FormGroup({
    sortBy: new FormControl(),
    sortType: new FormControl('ASC'),
  })
  categories: any[] = [];

  constructor(
    private store: Store) {
    this.listenToCategories();
  }

  listenToCategories() {
    this.store.select(selectCategories).subscribe(
      val => this.categories = val.map(category => {
        return {isSelected: false, title: category};
      }));
  }

  onCategoryChange($event: any, index: number) {
    this.categories[index].isSelected = $event;
  }

  clearFilter() {
    this.categories = this.categories.map(category => {
      return {...category, isSelected: false};
    });
    this.filterForm.controls.sortBy.setValue(null);
    this.filterForm.controls.sortType.setValue('ASC');
    this.applyFilter();
  }

  applyFilter() {
    this.onFilterChange.emit({
      categories: this.categories.filter(cat => cat.isSelected).map(cat => cat.title),
      ...this.filterForm.value
    })
  }
}

